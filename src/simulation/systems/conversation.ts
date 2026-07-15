import type { Rng } from '../rng';
import type { Villager, WorldState, CultureDef } from '../../domain/types';

const CHAT_RADIUS = 42;
const CHAT_DURATION: [number, number] = [7, 12];

function dist(a: Villager, b: Villager): number {
  return Math.hypot(a.pos.x - b.pos.x, a.pos.y - b.pos.y);
}

function cultureLine(defs: Record<string, CultureDef>, v: Villager): { text: string; cultureId: string } | null {
  for (const def of Object.values(defs)) {
    const a = v.affinities[def.id] ?? 0;
    if (a <= 0.35) continue;
    const eligible = def.lines.filter((l) => a >= l.min);
    if (eligible.length === 0) continue;
    return { text: eligible[eligible.length - 1].text, cultureId: def.id };
  }
  return null;
}

export interface ChatOutput {
  bubble?: { villagerId: string; text: string; importance: 1 | 2 };
  event?: { kind: 'social' | 'culture'; text: string; subjects: string[]; importance: 1 | 2 };
}

/** Apparie les habitants inactifs proches, fait vivre les conversations en cours. */
export function updateConversations(world: WorldState, rng: Rng, ambient: string[]): ChatOutput[] {
  const out: ChatOutput[] = [];
  const vs = world.villagers;

  // 1. Terminer les conversations échues
  for (const v of vs) {
    if (v.activity === 'chat' && world.timeS >= v.activityUntil) {
      v.activity = 'idle';
      v.chatPartnerId = null;
      v.activityUntil = world.timeS; // redécide immédiatement
      v.speakCooldown = world.timeS + rng.range(6, 14);
    }
  }

  // 2. Apparier
  for (let i = 0; i < vs.length; i++) {
    const a = vs[i];
    if (a.activity !== 'idle' || a.target || a.asleep || world.timeS < a.speakCooldown) continue;
    for (let j = i + 1; j < vs.length; j++) {
      const b = vs[j];
      if (b.activity !== 'idle' || b.target || b.asleep || world.timeS < b.speakCooldown) continue;
      if (dist(a, b) > CHAT_RADIUS) continue;
      if (!rng.chance(0.6)) continue;
      const until = world.timeS + rng.range(...CHAT_DURATION);
      a.activity = b.activity = 'chat';
      a.chatPartnerId = b.id;
      b.chatPartnerId = a.id;
      a.activityUntil = b.activityUntil = until;

      out.push(...exchange(a, b, world, rng, ambient));
      break;
    }
  }
  return out;
}

/** Une conversation : le parleur choisit une réplique, l'auditeur est exposé aux cultures. */
export function exchange(a: Villager, b: Villager, world: WorldState, rng: Rng, ambient: string[]): ChatOutput[] {
  const out: ChatOutput[] = [];
  const [speaker, listener] = rng.chance(0.5) ? [a, b] : [b, a];
  const cl = cultureLine(world.cultureDefs, speaker);

  if (cl && rng.chance(0.55)) {
    // Réplique culturelle → propagation générique
    out.push({
      bubble: { villagerId: speaker.id, text: cl.text, importance: 2 },
    });
    const gain = 0.09 * (0.5 + speaker.influence) * (0.4 + listener.receptivity);
    listener.affinities[cl.cultureId] = Math.min(1, (listener.affinities[cl.cultureId] ?? 0) + gain);
    const def = world.cultureDefs[cl.cultureId];
    if (listener.receptivity < 0.35 && rng.chance(0.5)) {
      out.push({
        bubble: { villagerId: listener.id, text: rng.pick(def.skepticLines), importance: 2 },
      });
    }
    if (rng.chance(0.35)) {
      out.push({
        event: {
          kind: 'culture',
          text: `${speaker.name} parle de « ${def.name} » à ${listener.name}.`,
          subjects: [speaker.id, listener.id],
          importance: 1,
        },
      });
    }
  } else {
    out.push({
      bubble: { villagerId: speaker.id, text: rng.pick(ambient), importance: 1 },
    });
  }
  return out;
}
