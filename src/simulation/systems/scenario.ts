import type { Scenario, ScenarioBeat, WorldState } from '../../domain/types';

/**
 * Exécuteur de scénario générique. Les beats sont du contenu (data) ;
 * l'exécuteur ne connaît aucune culture particulière.
 */
export class ScenarioRunner {
  private done = new Set<string>();

  constructor(private scenario: Scenario) {}

  /** Retourne les beats déclenchés à cet instant. */
  poll(world: WorldState): ScenarioBeat[] {
    const fired: ScenarioBeat[] = [];
    for (const beat of this.scenario.beats) {
      if (this.done.has(beat.id)) continue;
      const w = beat.when;
      let ok = false;
      if (w.atS !== undefined && world.timeS >= w.atS) ok = true;
      if (w.adherents) {
        const st = world.cultures[w.adherents.cultureId];
        if (st && st.adherents.length >= w.adherents.count) ok = true;
      }
      if (ok) {
        this.done.add(beat.id);
        fired.push(beat);
      }
    }
    return fired;
  }
}
