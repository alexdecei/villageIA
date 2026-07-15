import Phaser from 'phaser';
import { sim, store, actions } from '../../app/runtime';
import { applyGuardrails, GUARDRAILS } from '../directives';
import { PAL } from '../palette';
import { Rng } from '../../simulation/rng';
import { RIVER, PATHS } from '../../content/map';
import {
  WORLD_W, WORLD_H, drawGround, drawField, drawWell, drawTree, drawRock,
  drawFlowers, drawBuilding, drawDock, drawLavoir, drawBench, type BuildingView,
} from './drawMap';
import { VillagerView } from './VillagerView';
import type { ActiveDirective, DirectiveTarget, SpeechBubble, Vec2 } from '../../domain/types';

interface BubbleView {
  container: Phaser.GameObjects.Container;
  text: string;
  villagerId: string;
}

interface AppliedDirective {
  destroy: () => void;
}

const BUBBLE_RADIUS_POV = 170;

export class VillageScene extends Phaser.Scene {
  private views = new Map<string, VillagerView>();
  private buildingViews = new Map<string, BuildingView>();
  private bubbles = new Map<string, BubbleView>();
  private applied = new Map<string, AppliedDirective>();
  private ambientOverlay!: Phaser.GameObjects.Rectangle;
  private dragStart: { x: number; y: number; sx: number; sy: number } | null = null;
  private dragMoved = false;

  constructor() {
    super('village');
  }

  create(): void {
    const decorRng = new Rng(sim.world.seed ^ 0x5eed);
    drawGround(this, decorRng);
    drawField(this, 400, 860);

    for (const b of sim.world.buildings) {
      this.buildingViews.set(b.id, drawBuilding(this, b));
    }
    for (const s of sim.world.spots) {
      if (s.id === 'puits') drawWell(this, s.pos.x, s.pos.y - 30);
      if (s.id === 'ponton') drawDock(this, s);
      if (s.id === 'lavoir') drawLavoir(this, s);
      if (s.id === 'chene') drawBench(this, s);
    }
    this.scatterDecor(decorRng);

    for (const v of sim.world.villagers) {
      const view = new VillagerView(this, v);
      view.container.on('pointerdown', () => {
        this.dragMoved = false;
      });
      view.container.on('pointerup', () => {
        if (!this.dragMoved) actions.select(v.id);
      });
      this.views.set(v.id, view);
    }

    // caméra
    const cam = this.cameras.main;
    cam.setBounds(-120, -120, WORLD_W + 240, WORLD_H + 240);
    cam.setZoom(0.85);
    cam.centerOn(680, 560);
    cam.setBackgroundColor(PAL.grassDark);

    this.setupInput();

    // voile d'ambiance (directives « ambient »)
    this.ambientOverlay = this.add
      .rectangle(0, 0, 10, 10, 0xffffff, 0)
      .setOrigin(0)
      .setScrollFactor(0)
      .setDepth(5000);
    this.scale.on('resize', () => this.resizeOverlay());
    this.resizeOverlay();
  }

  private resizeOverlay(): void {
    this.ambientOverlay.setSize(this.scale.width + 4, this.scale.height + 4);
  }

  private setupInput(): void {
    const cam = this.cameras.main;
    this.input.on('pointerdown', (p: Phaser.Input.Pointer) => {
      this.dragStart = { x: p.x, y: p.y, sx: cam.scrollX, sy: cam.scrollY };
      this.dragMoved = false;
    });
    this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
      if (!p.isDown || !this.dragStart) return;
      const dx = p.x - this.dragStart.x;
      const dy = p.y - this.dragStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) this.dragMoved = true;
      if (this.dragMoved) {
        if (store.getState().mode !== 'global') actions.exitToGlobal();
        cam.scrollX = this.dragStart.sx - dx / cam.zoom;
        cam.scrollY = this.dragStart.sy - dy / cam.zoom;
      }
    });
    this.input.on('pointerup', (p: Phaser.Input.Pointer) => {
      if (!this.dragMoved && this.dragStart) {
        // clic sur le vide : désélection (les clics sur habitants sont gérés avant)
        const hits = this.input.hitTestPointer(p);
        if (hits.length === 0) actions.select(null);
      }
      this.dragStart = null;
    });
    this.input.on(
      'wheel',
      (p: Phaser.Input.Pointer, _o: unknown, _dx: number, dy: number) => {
        const prev = cam.zoom;
        const next = Phaser.Math.Clamp(prev * (dy > 0 ? 0.88 : 1.14), 0.55, 2.3);
        if (next === prev) return;
        const worldPoint = cam.getWorldPoint(p.x, p.y);
        cam.setZoom(next);
        // zoom vers le curseur
        const after = cam.getWorldPoint(p.x, p.y);
        cam.scrollX += worldPoint.x - after.x;
        cam.scrollY += worldPoint.y - after.y;
      },
    );
  }

  /** Végétation déterministe, en évitant bâtiments, chemins, rivière et lieux. */
  private scatterDecor(rng: Rng): void {
    const blocked: { p: Vec2; r: number }[] = [];
    for (const b of sim.world.buildings) blocked.push({ p: b.pos, r: 95 });
    for (const s of sim.world.spots) blocked.push({ p: s.pos, r: s.radius + 42 });
    const sample = (line: Vec2[], r: number) => {
      for (let i = 0; i < line.length - 1; i++) {
        for (let t = 0; t <= 1; t += 0.2) {
          blocked.push({ p: { x: line[i].x + (line[i + 1].x - line[i].x) * t, y: line[i].y + (line[i + 1].y - line[i].y) * t }, r });
        }
      }
    };
    sample(RIVER, 85);
    for (const p of PATHS) sample(p, 42);

    const free = (x: number, y: number) => blocked.every((b) => Math.hypot(x - b.p.x, y - b.p.y) > b.r);

    // ceinture forestière dense en bordure + bosquets intérieurs
    let placed = 0;
    for (let i = 0; i < 900 && placed < 150; i++) {
      const edge = rng.chance(0.62);
      let x: number, y: number;
      if (edge) {
        const side = rng.int(0, 3);
        x = side === 1 ? rng.range(0, 140) : side === 3 ? rng.range(WORLD_W - 150, WORLD_W) : rng.range(0, WORLD_W);
        y = side === 0 ? rng.range(0, 130) : side === 2 ? rng.range(WORLD_H - 140, WORLD_H) : rng.range(0, WORLD_H);
      } else {
        x = rng.range(60, WORLD_W - 60);
        y = rng.range(60, WORLD_H - 60);
      }
      if (!free(x, y)) continue;
      drawTree(this, x, y, rng.chance(0.45) ? 'pine' : 'round', rng.range(0.75, 1.35));
      blocked.push({ p: { x, y }, r: 30 });
      placed++;
    }
    for (let i = 0; i < 160; i++) {
      const x = rng.range(40, WORLD_W - 40);
      const y = rng.range(40, WORLD_H - 40);
      if (!free(x, y)) continue;
      if (rng.chance(0.3)) drawRock(this, x, y, rng.range(0.5, 1));
      else drawFlowers(this, x, y, rng);
    }
  }

  // ------------------------------------------------------------------ update

  update(time: number, deltaMs: number): void {
    const ui = store.getState();
    if (!ui.paused) sim.step((deltaMs / 1000) * ui.speed);
    store.tickNotify(time);

    const followed = ui.selectedId ? sim.world.villagers.find((v) => v.id === ui.selectedId) : null;

    for (const view of this.views.values()) {
      const isSel = view.villager.id === ui.selectedId;
      view.update(deltaMs, isSel, isSel || this.cameras.main.zoom > 1.5);
    }

    this.syncBubbles(ui.mode, followed?.pos ?? null, ui.selectedId);
    this.syncDirectives();
    this.updateCamera(ui.mode, followed?.pos ?? null);
  }

  private updateCamera(mode: string, target: Vec2 | null): void {
    if (!target || mode === 'global') return;
    const cam = this.cameras.main;
    const zTarget = mode === 'pov' ? 1.8 : 1.45;
    cam.setZoom(Phaser.Math.Linear(cam.zoom, zTarget, 0.06));
    const cx = target.x - cam.width / 2 / cam.zoom;
    const cy = target.y - 30 - cam.height / 2 / cam.zoom;
    cam.scrollX = Phaser.Math.Linear(cam.scrollX, cx, 0.09);
    cam.scrollY = Phaser.Math.Linear(cam.scrollY, cy, 0.09);
  }

  // ----------------------------------------------------------------- bulles

  private bubbleVisible(b: SpeechBubble, mode: string, followedPos: Vec2 | null, selectedId: string | null): boolean {
    const v = sim.world.villagers.find((x) => x.id === b.villagerId);
    if (!v || v.asleep) return false;
    if (mode === 'pov') {
      if (!followedPos) return false;
      if (b.villagerId === selectedId) return true;
      return Math.hypot(v.pos.x - followedPos.x, v.pos.y - followedPos.y) <= BUBBLE_RADIUS_POV;
    }
    if (b.villagerId === selectedId) return true;
    if (mode === 'follow' && followedPos) {
      if (Math.hypot(v.pos.x - followedPos.x, v.pos.y - followedPos.y) <= BUBBLE_RADIUS_POV) return true;
    }
    return b.importance >= 2;
  }

  private syncBubbles(mode: string, followedPos: Vec2 | null, selectedId: string | null): void {
    const active = new Set<string>();
    for (const b of sim.world.bubbles) {
      if (!this.bubbleVisible(b, mode, followedPos, selectedId)) continue;
      active.add(b.villagerId);
      const existing = this.bubbles.get(b.villagerId);
      if (!existing || existing.text !== b.text) {
        existing?.container.destroy();
        this.bubbles.set(b.villagerId, this.makeBubble(b));
      }
    }
    for (const [id, view] of this.bubbles) {
      if (!active.has(id)) {
        view.container.destroy();
        this.bubbles.delete(id);
        continue;
      }
      const v = sim.world.villagers.find((x) => x.id === id);
      if (v) {
        view.container.setPosition(v.pos.x, v.pos.y - 44);
        view.container.setDepth(v.pos.y + 2000);
      }
    }
  }

  private makeBubble(b: SpeechBubble): BubbleView {
    const container = this.add.container(0, 0);
    const text = this.add
      .text(0, 0, b.text, {
        fontFamily: 'Georgia, serif',
        fontSize: '11px',
        color: '#4a3826',
        wordWrap: { width: 130 },
        align: 'center',
      })
      .setOrigin(0.5)
      .setResolution(2);
    const w = Math.max(text.width + 16, 30);
    const h = text.height + 12;
    const g = this.add.graphics();
    g.fillStyle(0xfdf6e3, 0.96);
    g.lineStyle(1.5, 0xcbb890, 1);
    g.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
    g.strokeRoundedRect(-w / 2, -h / 2, w, h, 8);
    g.fillTriangle(-5, h / 2 - 1, 5, h / 2 - 1, 0, h / 2 + 7);
    container.add([g, text]);
    container.setAlpha(0);
    this.tweens.add({ targets: container, alpha: 1, duration: 180 });
    return { container, text: b.text, villagerId: b.villagerId };
  }

  // -------------------------------------------------------------- directives

  private syncDirectives(): void {
    const { accepted } = applyGuardrails(sim.world.directives);
    const ids = new Set(accepted.map((d) => d.id));
    for (const [id, applied] of this.applied) {
      if (!ids.has(id)) {
        applied.destroy();
        this.applied.delete(id);
      }
    }
    for (const ad of accepted) {
      if (!this.applied.has(ad.id)) this.applied.set(ad.id, this.applyDirective(ad));
    }
  }

  private resolveTarget(target: DirectiveTarget): Vec2 | null {
    switch (target.kind) {
      case 'building':
        return sim.world.buildings.find((b) => b.id === target.id)?.pos ?? null;
      case 'spot':
        return sim.world.spots.find((s) => s.id === target.id)?.pos ?? null;
      case 'villager':
        return sim.world.villagers.find((v) => v.id === target.id)?.pos ?? null;
      case 'point':
        return target.pos;
    }
  }

  private applyDirective(ad: ActiveDirective): AppliedDirective {
    const d = ad.directive;
    const none = { destroy: () => undefined };
    switch (d.type) {
      case 'sign': {
        if (d.target.kind !== 'building') return none;
        const bv = this.buildingViews.get(d.target.id);
        if (!bv) return none;
        const c = this.add.container(bv.building.pos.x, bv.building.pos.y);
        c.setDepth(bv.container.depth + 1);
        const g = this.add.graphics();
        const y = bv.eaveY + 12;
        g.fillStyle(PAL.beam, 1);
        g.fillRoundedRect(-15, y - 11, 30, 22, 5);
        g.lineStyle(1.5, 0x5f4128, 1);
        g.strokeRoundedRect(-15, y - 11, 30, 22, 5);
        const glyph = this.add.text(0, y, d.glyph, { fontSize: '14px' }).setOrigin(0.5).setResolution(2);
        c.add([g, glyph]);
        if (d.slogan) {
          const s = this.add
            .text(0, y + 20, d.slogan, {
              fontFamily: 'Georgia, serif', fontSize: '9px', fontStyle: 'italic',
              color: '#fdf6e3', stroke: '#5b4632', strokeThickness: 3,
            })
            .setOrigin(0.5)
            .setResolution(2);
          c.add(s);
        }
        c.setScale(0);
        this.tweens.add({ targets: c, scale: 1, duration: 400, ease: 'Back.Out' });
        return { destroy: () => c.destroy() };
      }
      case 'symbol': {
        const pos = this.resolveTarget(d.target);
        if (!pos) return none;
        const size = GUARDRAILS.symbolSizes[d.size ?? 'medium'];
        const c = this.add.container(pos.x + 26, pos.y - 20).setDepth(pos.y + 60);
        const g = this.add.graphics();
        g.fillStyle(0xfdf6e3, 0.92);
        g.lineStyle(1.5, 0xcbb890, 1);
        g.fillCircle(0, 0, size * 0.75);
        g.strokeCircle(0, 0, size * 0.75);
        const t = this.add.text(0, 0, d.glyph, { fontSize: `${size - 4}px` }).setOrigin(0.5).setResolution(2);
        c.add([g, t]);
        c.setScale(0);
        this.tweens.add({ targets: c, scale: 1, duration: 350, ease: 'Back.Out' });
        return { destroy: () => c.destroy() };
      }
      case 'banner': {
        const pos = this.resolveTarget(d.target);
        if (!pos) return none;
        const color = Phaser.Display.Color.HexStringToColor(d.color).color;
        const c = this.add.container(pos.x - 46, pos.y - 8).setDepth(pos.y + 20);
        const g = this.add.graphics();
        g.fillStyle(PAL.beam, 1);
        g.fillRect(-2, -52, 4, 54);
        g.fillStyle(color, 1);
        g.fillTriangle(2, -52, 2, -30, 30, -41);
        g.lineStyle(1, 0x8a6242, 0.8);
        g.strokeTriangle(2, -52, 2, -30, 30, -41);
        c.add(g);
        if (d.glyph) {
          const t = this.add.text(13, -41, d.glyph, { fontSize: '9px' }).setOrigin(0.5).setResolution(2);
          c.add(t);
        }
        c.setAlpha(0);
        this.tweens.add({ targets: c, alpha: 1, duration: 500 });
        return { destroy: () => c.destroy() };
      }
      case 'accessory': {
        if (d.target.kind !== 'villager') return none;
        const view = this.views.get(d.target.id);
        if (!view) return none;
        view.setAccessory(this, d.glyph);
        return { destroy: () => view.setAccessory(this, null) };
      }
      case 'emoji-reaction': {
        const pos = this.resolveTarget(d.target);
        if (!pos) return none;
        const t = this.add.text(pos.x, pos.y - 40, d.glyph, { fontSize: '16px' }).setOrigin(0.5).setDepth(pos.y + 100).setResolution(2);
        this.tweens.add({ targets: t, y: pos.y - 62, alpha: 0, duration: d.durationS * 1000, ease: 'Sine.Out' });
        return { destroy: () => t.destroy() };
      }
      case 'ambient': {
        const color = Phaser.Display.Color.HexStringToColor(d.tint).color;
        this.ambientOverlay.setFillStyle(color, d.intensity);
        return { destroy: () => this.ambientOverlay.setFillStyle(0xffffff, 0) };
      }
      case 'palette-shift': {
        const pos = this.resolveTarget(d.target);
        if (!pos) return none;
        const color = Phaser.Display.Color.HexStringToColor(d.color).color;
        const r = this.add
          .rectangle(pos.x, pos.y, 100, 90, color, Math.min(d.intensity, 0.25))
          .setDepth(pos.y + 47);
        return { destroy: () => r.destroy() };
      }
      default:
        return none;
    }
  }
}
