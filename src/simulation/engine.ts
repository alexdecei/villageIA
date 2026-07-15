import { Rng } from './rng';
import { updateMovement } from './systems/movement';
import { decideNext } from './systems/behavior';
import { updateConversations, exchange } from './systems/conversation';
import { updateCultures, updateSharing } from './systems/culture';
import { ScenarioRunner } from './systems/scenario';
import type {
  ActiveDirective,
  ScenarioAction,
  SimEvent,
  SpeechBubble,
  VillageContent,
  Villager,
  VisualDirective,
  WorldState,
} from '../domain/types';

const TICK = 0.25; // pas de simulation fixe (s) — garantit le déterminisme
const MAX_EVENTS = 120;
const MAX_BUBBLE_S = 5.5;

/**
 * Moteur de simulation. Déterministe : (contenu, seed) ⇒ même déroulement.
 * N'importe ni Phaser ni React. Émet un WorldState sérialisable.
 *
 * Point d'intégration LLM : remplacer/compléter `decideNext`, `exchange` et le
 * ScenarioRunner par un orchestrateur produisant les mêmes structures
 * (activités, répliques, ScenarioAction, VisualDirective).
 */
export class VillageSim {
  readonly world: WorldState;
  private rng: Rng;
  private runner: ScenarioRunner;
  private accumulator = 0;
  private directiveSeq = 0;
  private content: VillageContent;

  constructor(content: VillageContent, seed: number) {
    this.content = content;
    this.rng = new Rng(seed);
    this.runner = new ScenarioRunner(content.scenario);

    const cultureDefs = Object.fromEntries(content.cultures.map((c) => [c.id, c]));
    const cultures = Object.fromEntries(
      content.cultures.map((c) => [c.id, { id: c.id, adherents: [], exposure: 0, stage: 0 }]),
    );

    this.world = {
      seed,
      timeS: 0,
      dayLengthS: 300,
      buildings: content.buildings,
      spots: content.spots,
      cultureDefs,
      cultures,
      events: [],
      bubbles: [],
      directives: [],
      sharing: {},
      villagers: content.villagers.map((v) => {
        const home = content.buildings.find((b) => b.id === v.homeId)!;
        return {
          ...v,
          pos: { x: home.door.x + this.rng.range(-30, 30), y: home.door.y + this.rng.range(10, 40) },
          target: null,
          activity: 'idle' as const,
          activityUntil: this.rng.range(1, 6),
          chatPartnerId: null,
          speakCooldown: 0,
          asleep: false,
        };
      }),
    };
    this.pushEvent({ t: 0, kind: 'info', text: `Le village de ${content.name} s'éveille.`, subjectIds: [], importance: 2 });
  }

  /** Avance la simulation de dt secondes (déjà multiplié par la vitesse de jeu). */
  step(dt: number): void {
    this.accumulator += Math.min(dt, 2);
    while (this.accumulator >= TICK) {
      this.accumulator -= TICK;
      this.tick(TICK);
    }
  }

  private tick(dt: number): void {
    const w = this.world;
    w.timeS += dt;

    // Scénario (contenu scripté)
    for (const beat of this.runner.poll(w)) {
      for (const action of beat.actions) this.applyAction(action);
    }

    // Comportement individuel
    for (const v of w.villagers) {
      if (v.asleep) {
        if (w.timeS >= v.activityUntil) {
          v.asleep = false;
          v.activity = 'idle';
        }
        continue;
      }
      updateMovement(v, dt);
      if (v.activity !== 'chat' && v.activity !== 'gather' && !v.target && w.timeS >= v.activityUntil) {
        decideNext(v, w, this.rng);
      }
      // Arrivé chez lui pour se reposer : peut réellement se retirer (invisible).
      if (v.activity === 'rest' && !v.target && this.rng.chance(0.01)) this.refreshPresence(v);
      if (v.activity === 'gather' && w.timeS >= v.activityUntil) {
        v.activity = 'idle';
        v.activityUntil = w.timeS;
      }
      // Un partageur convaincu s'exprime périodiquement
      if (v.activity === 'share' && !v.target && this.rng.chance(0.06)) {
        const cultureId = w.sharing[v.id];
        const def = cultureId ? w.cultureDefs[cultureId] : null;
        if (def) {
          const line = def.lines[def.lines.length - 1];
          this.pushBubble(v.id, line.text, 2);
        }
      }
    }

    // Conversations
    const outputs = updateConversations(w, this.rng, this.content.ambientChatter);
    // Relance d'un échange au milieu des conversations longues
    for (const v of w.villagers) {
      if (v.activity === 'chat' && v.chatPartnerId && this.rng.chance(0.02)) {
        const partner = w.villagers.find((o) => o.id === v.chatPartnerId);
        if (partner) outputs.push(...exchange(v, partner, w, this.rng, this.content.ambientChatter));
      }
    }
    for (const o of outputs) {
      if (o.bubble) this.pushBubble(o.bubble.villagerId, o.bubble.text, o.bubble.importance);
      if (o.event) this.pushEvent({ t: w.timeS, kind: o.event.kind, text: o.event.text, subjectIds: o.event.subjects, importance: o.event.importance });
    }

    // Cultures (générique)
    updateSharing(w, dt);
    for (const change of updateCultures(w)) {
      const def = w.cultureDefs[change.cultureId];
      for (const v of change.newAdherents) {
        this.pushEvent({
          t: w.timeS,
          kind: 'culture',
          text: `${v.name} adhère à ${def.name}. ${def.symbol}`,
          subjectIds: [v.id],
          importance: 2,
        });
        // Mécanique générique : un adepte arbore le symbole de sa culture.
        this.issueDirective({ type: 'accessory', target: { kind: 'villager', id: v.id }, slot: 'hand', glyph: def.symbol }, null);
        v.mood = 'inspiré·e';
      }
    }

    // Pensées et humeurs ambiantes
    if (this.rng.chance(0.03)) {
      const v = this.rng.pick(w.villagers);
      if (!Object.values(w.cultureDefs).some((d) => (v.affinities[d.id] ?? 0) > 0.3)) {
        v.thought = this.rng.pick(this.content.ambientThoughts);
      }
      if (this.rng.chance(0.4)) v.mood = this.rng.pick(this.content.moods);
    }

    // Nettoyage bulles / directives expirées
    w.bubbles = w.bubbles.filter((b) => b.until > w.timeS);
    w.directives = w.directives.filter((d) => d.expiresAt === null || d.expiresAt > w.timeS);
  }

  private refreshPresence(v: Villager): void {
    // Petite respiration : certains se retirent réellement (invisibles à l'intérieur).
    v.asleep = true;
    v.target = null;
    v.activityUntil = this.world.timeS + this.rng.range(10, 20);
  }

  private applyAction(a: ScenarioAction): void {
    const w = this.world;
    switch (a.do) {
      case 'event':
        this.pushEvent({ t: w.timeS, kind: a.kind, text: a.text, subjectIds: a.subjects ?? [], importance: a.importance ?? 2 });
        break;
      case 'thought': {
        const v = w.villagers.find((v) => v.id === a.villagerId);
        if (v) v.thought = a.text;
        break;
      }
      case 'mood': {
        const v = w.villagers.find((v) => v.id === a.villagerId);
        if (v) v.mood = a.mood;
        break;
      }
      case 'boost-affinity': {
        const v = w.villagers.find((v) => v.id === a.villagerId);
        if (v) v.affinities[a.cultureId] = Math.min(1, (v.affinities[a.cultureId] ?? 0) + a.amount);
        break;
      }
      case 'set-sharing':
        if (a.on) w.sharing[a.villagerId] = a.cultureId;
        else delete w.sharing[a.villagerId];
        break;
      case 'directive':
        this.issueDirective(a.directive, a.ttlS ?? null);
        break;
      case 'bubble':
        this.pushBubble(a.villagerId, a.text, 2);
        break;
      case 'gathering': {
        const spot = w.spots.find((s) => s.id === a.spotId);
        if (!spot) break;
        for (const id of a.villagerIds) {
          const v = w.villagers.find((v) => v.id === id);
          if (!v || v.asleep) continue;
          v.activity = 'gather';
          v.chatPartnerId = null;
          v.target = {
            x: spot.pos.x + this.rng.range(-spot.radius, spot.radius) * 0.8,
            y: spot.pos.y + this.rng.range(-spot.radius, spot.radius) * 0.8,
          };
          v.activityUntil = w.timeS + a.durationS;
        }
        break;
      }
    }
  }

  issueDirective(directive: VisualDirective, ttlS: number | null): ActiveDirective {
    const d: ActiveDirective = {
      id: `dir-${this.directiveSeq++}`,
      directive,
      issuedAt: this.world.timeS,
      expiresAt: ttlS === null ? null : this.world.timeS + ttlS,
    };
    this.world.directives.push(d);
    return d;
  }

  private pushEvent(e: SimEvent): void {
    this.world.events.push(e);
    if (this.world.events.length > MAX_EVENTS) this.world.events.shift();
  }

  private pushBubble(villagerId: string, text: string, importance: 1 | 2): void {
    // une seule bulle par habitant à la fois
    this.world.bubbles = this.world.bubbles.filter((b) => b.villagerId !== villagerId);
    this.world.bubbles.push({ villagerId, text, until: this.world.timeS + MAX_BUBBLE_S, importance });
  }
}
