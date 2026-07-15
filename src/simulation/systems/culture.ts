import type { WorldState, Villager } from '../../domain/types';

export interface CultureChange {
  newAdherents: Villager[];
  cultureId: string;
}

/**
 * Met à jour l'état des cultures (adhésion, exposition, pensées).
 * Mécanique 100 % générique : aucune règle liée à une culture particulière.
 */
export function updateCultures(world: WorldState): CultureChange[] {
  const changes: CultureChange[] = [];
  for (const def of Object.values(world.cultureDefs)) {
    const st = world.cultures[def.id];
    const newAdherents: Villager[] = [];
    let exposure = 0;
    for (const v of world.villagers) {
      const a = v.affinities[def.id] ?? 0;
      exposure += a;
      if (a >= def.adherenceThreshold && !st.adherents.includes(v.id)) {
        st.adherents.push(v.id);
        newAdherents.push(v);
      }
      // Pensée liée au palier atteint (le contenu fournit le texte)
      const t = def.thoughts.filter((th) => a >= th.min).pop();
      if (t && a > 0.25) v.thought = t.text;
    }
    st.exposure = exposure;
    if (newAdherents.length > 0) changes.push({ newAdherents, cultureId: def.id });
  }
  return changes;
}

/** Rayonnement passif d'un habitant en activité « share » sur les auditeurs proches. */
export function updateSharing(world: WorldState, dt: number): void {
  const SHARE_RADIUS = 90;
  for (const v of world.villagers) {
    if (v.activity !== 'share') continue;
    const cultureId = world.sharing[v.id];
    if (!cultureId) continue;
    for (const o of world.villagers) {
      if (o.id === v.id || o.asleep) continue;
      const d = Math.hypot(o.pos.x - v.pos.x, o.pos.y - v.pos.y);
      if (d > SHARE_RADIUS) continue;
      const gain = 0.012 * dt * (0.5 + v.influence) * (0.4 + o.receptivity);
      o.affinities[cultureId] = Math.min(1, (o.affinities[cultureId] ?? 0) + gain);
    }
  }
}
