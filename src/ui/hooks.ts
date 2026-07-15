import { useSyncExternalStore } from 'react';
import { store, sim, type UIState } from '../app/runtime';
import type { WorldState } from '../domain/types';

/** État d'interface (rafraîchi ~5 Hz pendant que la simulation tourne). */
export function useUI(): UIState {
  return useSyncExternalStore(store.subscribe, store.getState);
}

/** Accès en lecture au monde simulé. */
export function useWorld(): WorldState {
  useUI(); // s'abonne au rythme de rafraîchissement
  return sim.world;
}
