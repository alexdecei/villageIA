import Phaser from 'phaser';
import { PAL, ROOF_COLORS } from '../palette';
import { RIVER, PATHS } from '../../content/map';
import { Rng } from '../../simulation/rng';
import type { Building, Spot } from '../../domain/types';

export const WORLD_W = 1500;
export const WORLD_H = 1100;

export interface BuildingView {
  building: Building;
  container: Phaser.GameObjects.Container;
  width: number;
  eaveY: number; // y relatif du bas du toit (accroche des enseignes)
}

function smooth(points: { x: number; y: number }[]): Phaser.Curves.Spline {
  return new Phaser.Curves.Spline(points.map((p) => new Phaser.Math.Vector2(p.x, p.y)));
}

function strokeCurve(g: Phaser.GameObjects.Graphics, curve: Phaser.Curves.Spline, width: number, color: number, alpha = 1) {
  const pts = curve.getPoints(64);
  g.lineStyle(width, color, alpha);
  g.beginPath();
  g.moveTo(pts[0].x, pts[0].y);
  for (const p of pts) g.lineTo(p.x, p.y);
  g.strokePath();
  // extrémités arrondies
  g.fillStyle(color, alpha);
  g.fillCircle(pts[0].x, pts[0].y, width / 2);
  g.fillCircle(pts[pts.length - 1].x, pts[pts.length - 1].y, width / 2);
}

/** Sol : herbe, taches, rivière, berges, chemins. Dessiné une fois. */
export function drawGround(scene: Phaser.Scene, rng: Rng): void {
  const g = scene.add.graphics().setDepth(-100);

  g.fillStyle(PAL.grass, 1);
  g.fillRect(-200, -200, WORLD_W + 400, WORLD_H + 400);

  // Variations d'herbe (taches douces)
  for (let i = 0; i < 90; i++) {
    const c = rng.chance(0.5) ? PAL.grassLight : PAL.grassDark;
    g.fillStyle(c, 0.35);
    g.fillEllipse(rng.range(0, WORLD_W), rng.range(0, WORLD_H), rng.range(60, 180), rng.range(40, 110));
  }

  // Rivière : berge sable, eau, reflets
  const river = smooth(RIVER);
  strokeCurve(g, river, 92, PAL.bank, 1);
  strokeCurve(g, river, 72, PAL.waterDeep, 1);
  strokeCurve(g, river, 58, PAL.water, 1);
  // filets clairs
  const pts = river.getPoints(80);
  g.lineStyle(4, PAL.waterLight, 0.7);
  for (let i = 6; i < pts.length - 6; i += 9) {
    g.beginPath();
    g.moveTo(pts[i].x - 8, pts[i].y);
    g.lineTo(pts[i + 2].x + 8, pts[i + 2].y);
    g.strokePath();
  }
  // pierres de gué près du lavoir
  g.fillStyle(PAL.rock, 1);
  for (const [sx, sy] of [[1092, 636], [1114, 648], [1136, 660]] as const) {
    g.fillEllipse(sx, sy, 20, 14);
  }

  // Chemins
  for (const path of PATHS) {
    const c = smooth(path);
    strokeCurve(g, c, 30, PAL.pathEdge, 0.9);
  }
  for (const path of PATHS) {
    const c = smooth(path);
    strokeCurve(g, c, 22, PAL.path, 1);
  }
}

/** Champ cultivé avec clôture. */
export function drawField(scene: Phaser.Scene, cx: number, cy: number): void {
  const g = scene.add.graphics().setDepth(-50);
  const w = 150, h = 100;
  g.fillStyle(PAL.soil, 1);
  g.fillRoundedRect(cx - w / 2, cy - h / 2, w, h, 10);
  for (let r = 0; r < 4; r++) {
    const y = cy - h / 2 + 16 + r * 22;
    g.fillStyle(PAL.soilDark, 1);
    g.fillRoundedRect(cx - w / 2 + 8, y, w - 16, 7, 3);
    for (let i = 0; i < 8; i++) {
      g.fillStyle(PAL.sprout, 1);
      g.fillCircle(cx - w / 2 + 16 + i * 16, y + 2, 4);
    }
  }
  // clôture
  const fg = scene.add.graphics().setDepth(cy + h / 2);
  fg.lineStyle(4, PAL.fence, 1);
  fg.strokeRoundedRect(cx - w / 2 - 12, cy - h / 2 - 12, w + 24, h + 24, 6);
  for (const [px, py] of [
    [cx - w / 2 - 12, cy - h / 2 - 12], [cx + w / 2 + 12, cy - h / 2 - 12],
    [cx - w / 2 - 12, cy + h / 2 + 12], [cx + w / 2 + 12, cy + h / 2 + 12],
  ] as const) {
    fg.fillStyle(PAL.fence, 1);
    fg.fillRect(px - 3, py - 8, 6, 14);
  }
}

/** Puits de la place centrale. */
export function drawWell(scene: Phaser.Scene, x: number, y: number): void {
  const c = scene.add.container(x, y).setDepth(y + 8);
  const g = scene.add.graphics();
  g.fillStyle(PAL.shadow, 0.16);
  g.fillEllipse(0, 12, 44, 16);
  g.fillStyle(PAL.rockDark, 1);
  g.fillEllipse(0, 4, 38, 22);
  g.fillStyle(PAL.rock, 1);
  g.fillEllipse(0, 0, 38, 22);
  g.fillStyle(0x2f4652, 1);
  g.fillEllipse(0, 0, 24, 13);
  g.fillStyle(PAL.beam, 1);
  g.fillRect(-16, -26, 4, 26);
  g.fillRect(12, -26, 4, 26);
  g.fillStyle(PAL.roofRed, 1);
  g.fillTriangle(-24, -24, 24, -24, 0, -40);
  c.add(g);
}

/** Arbre (rond ou sapin) — conteneur trié par profondeur. */
export function drawTree(scene: Phaser.Scene, x: number, y: number, kind: 'round' | 'pine', s: number): void {
  const c = scene.add.container(x, y).setDepth(y);
  const g = scene.add.graphics();
  g.fillStyle(PAL.shadow, 0.15);
  g.fillEllipse(0, 2, 34 * s, 12 * s);
  g.fillStyle(PAL.trunk, 1);
  g.fillRect(-3 * s, -10 * s, 6 * s, 12 * s);
  if (kind === 'pine') {
    g.fillStyle(PAL.pine, 1);
    g.fillTriangle(-20 * s, -8 * s, 20 * s, -8 * s, 0, -34 * s);
    g.fillTriangle(-16 * s, -22 * s, 16 * s, -22 * s, 0, -46 * s);
    g.fillStyle(PAL.pineLight, 1);
    g.fillTriangle(-11 * s, -36 * s, 11 * s, -36 * s, 0, -56 * s);
  } else {
    g.fillStyle(PAL.treeDark, 1);
    g.fillCircle(-10 * s, -20 * s, 14 * s);
    g.fillCircle(10 * s, -20 * s, 14 * s);
    g.fillStyle(PAL.tree, 1);
    g.fillCircle(0, -30 * s, 16 * s);
    g.fillStyle(PAL.treeLight, 1);
    g.fillCircle(-4 * s, -34 * s, 9 * s);
  }
  c.add(g);
}

export function drawRock(scene: Phaser.Scene, x: number, y: number, s: number): void {
  const g = scene.add.graphics().setDepth(y);
  g.fillStyle(PAL.shadow, 0.13);
  g.fillEllipse(x, y + 3, 26 * s, 9 * s);
  g.fillStyle(PAL.rockDark, 1);
  g.fillEllipse(x, y - 2, 24 * s, 16 * s);
  g.fillStyle(PAL.rock, 1);
  g.fillEllipse(x - 2 * s, y - 5 * s, 18 * s, 11 * s);
}

export function drawFlowers(scene: Phaser.Scene, x: number, y: number, rng: Rng): void {
  const g = scene.add.graphics().setDepth(-40);
  for (let i = 0; i < 5; i++) {
    const fx = x + rng.range(-14, 14);
    const fy = y + rng.range(-8, 8);
    g.fillStyle(rng.pick([PAL.flower1, PAL.flower2, PAL.flower3]), 1);
    g.fillCircle(fx, fy, 2.4);
  }
}

/** Bâtiment façon référence : mur crème, colombages, grand toit débordant. */
export function drawBuilding(scene: Phaser.Scene, b: Building): BuildingView {
  const wide = !!b.style.wide;
  const tall = !!b.style.tall;
  const W = wide ? 128 : 94;
  const wallH = tall ? 60 : 42;
  const roofH = tall ? 50 : 44;
  const bottom = 46; // ligne de sol relative au centre
  const [roofC, roofD] = ROOF_COLORS[b.style.roof];

  const c = scene.add.container(b.pos.x, b.pos.y);
  c.setDepth(b.pos.y + bottom);
  const g = scene.add.graphics();

  // ombre portée
  g.fillStyle(PAL.shadow, 0.18);
  g.fillEllipse(2, bottom + 2, W * 0.95, 22);

  // mur
  const wallW = W * 0.74;
  g.fillStyle(PAL.wallShade, 1);
  g.fillRoundedRect(-wallW / 2, bottom - wallH, wallW, wallH, 4);
  g.fillStyle(PAL.wall, 1);
  g.fillRoundedRect(-wallW / 2, bottom - wallH, wallW, wallH - 5, 4);
  // colombages
  g.lineStyle(3, PAL.beam, 0.55);
  g.strokeRoundedRect(-wallW / 2 + 2, bottom - wallH + 2, wallW - 4, wallH - 7, 3);

  // porte
  g.fillStyle(PAL.door, 1);
  g.fillRoundedRect(-9, bottom - 24, 18, 24, { tl: 8, tr: 8, bl: 0, br: 0 });
  g.fillStyle(0xd9a852, 1);
  g.fillCircle(5, bottom - 12, 1.8);

  // fenêtres
  const wy = bottom - wallH + 12;
  for (const wx of wide ? [-wallW / 2 + 18, wallW / 2 - 18] : [-wallW / 2 + 15, wallW / 2 - 15]) {
    g.fillStyle(PAL.beam, 1);
    g.fillRoundedRect(wx - 7, wy - 7, 14, 14, 3);
    g.fillStyle(PAL.window, 1);
    g.fillRoundedRect(wx - 5, wy - 5, 10, 10, 2);
    g.lineStyle(1.5, PAL.beam, 0.8);
    g.lineBetween(wx, wy - 5, wx, wy + 5);
  }

  // toit (trapèze débordant + faîte)
  const eaveY = bottom - wallH + 2;
  const ridgeY = eaveY - roofH;
  g.fillStyle(roofD, 1);
  g.fillRoundedRect(-W / 2, eaveY - 4, W, 9, 4);
  const path = new Phaser.Geom.Polygon([
    -W / 2, eaveY,
    -W * 0.26, ridgeY,
    W * 0.26, ridgeY,
    W / 2, eaveY,
  ]);
  g.fillStyle(roofC, 1);
  g.fillPoints(path.points, true);
  g.fillStyle(roofD, 0.5);
  g.fillRoundedRect(-W * 0.27, ridgeY - 3, W * 0.54, 6, 3);
  // reflet doux
  g.fillStyle(0xffffff, 0.12);
  g.fillTriangle(-W * 0.36, eaveY - 6, -W * 0.16, ridgeY + 4, -W * 0.3, eaveY - 6);

  // cheminée
  if (b.style.chimney) {
    g.fillStyle(PAL.rockDark, 1);
    g.fillRect(W * 0.22, ridgeY + 4, 10, 16);
    g.fillStyle(PAL.rock, 1);
    g.fillRect(W * 0.22 - 2, ridgeY + 1, 14, 5);
  }

  // auvent rayé (échoppes)
  if (b.style.awning) {
    const aw = 34;
    for (let i = 0; i < 4; i++) {
      g.fillStyle(i % 2 === 0 ? 0xffffff : roofC, 0.95);
      g.fillRoundedRect(-aw / 2 + i * (aw / 4), bottom - wallH + 20, aw / 4, 10, 2);
    }
  }

  c.add(g);
  return { building: b, container: c, width: W, eaveY };
}

/** Ponton en bois au bord de la rivière. */
export function drawDock(scene: Phaser.Scene, spot: Spot): void {
  const g = scene.add.graphics().setDepth(spot.pos.y - 20);
  const { x, y } = spot.pos;
  g.fillStyle(PAL.shadow, 0.15);
  g.fillEllipse(x + 30, y + 4, 70, 16);
  g.fillStyle(PAL.beam, 1);
  g.fillRoundedRect(x - 20, y - 12, 96, 26, 5);
  g.lineStyle(2, 0x6e4b30, 0.6);
  for (let i = 1; i < 6; i++) g.lineBetween(x - 20 + i * 16, y - 12, x - 20 + i * 16, y + 14);
}

/** Petit lavoir : bassin + toit ouvert. */
export function drawLavoir(scene: Phaser.Scene, spot: Spot): void {
  const { x, y } = spot.pos;
  const g = scene.add.graphics().setDepth(y + 10);
  g.fillStyle(PAL.rock, 1);
  g.fillRoundedRect(x - 26, y - 14, 52, 28, 8);
  g.fillStyle(PAL.water, 1);
  g.fillRoundedRect(x - 20, y - 9, 40, 18, 6);
  g.fillStyle(PAL.waterLight, 0.6);
  g.fillEllipse(x - 6, y - 2, 14, 5);
}

/** Banc sous le chêne. */
export function drawBench(scene: Phaser.Scene, spot: Spot): void {
  const { x, y } = spot.pos;
  drawTree(scene, x - 26, y - 18, 'round', 1.4);
  const g = scene.add.graphics().setDepth(y + 6);
  g.fillStyle(PAL.beam, 1);
  g.fillRoundedRect(x - 2, y - 2, 30, 7, 3);
  g.fillRect(x + 2, y + 4, 4, 7);
  g.fillRect(x + 20, y + 4, 4, 7);
}
