import { VillageSim } from '../simulation/engine';
import { CONTENT, DEFAULT_SEED } from '../content';

/**
 * Runtime partagé : instance de simulation + état d'interface.
 * Ni React (pas de règles de jeu ici), ni Phaser (pas de rendu ici).
 * La seed peut être passée en query string : ?seed=1234
 */

const params = new URLSearchParams(typeof location !== 'undefined' ? location.search : '');
export const SEED = Number(params.get('seed')) || DEFAULT_SEED;

export const sim = new VillageSim(CONTENT, SEED);

export type ViewMode = 'global' | 'follow' | 'pov';

export interface UIState {
  paused: boolean;
  speed: 1 | 3;
  selectedId: string | null;
  mode: ViewMode;
  journalOpen: boolean;
}

let state: UIState = {
  paused: false,
  speed: 1,
  selectedId: null,
  mode: 'global',
  journalOpen: false,
};

const listeners = new Set<() => void>();
let lastNotify = 0;

export const store = {
  getState: (): UIState => state,
  subscribe(fn: () => void): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  set(partial: Partial<UIState>): void {
    state = { ...state, ...partial };
    listeners.forEach((fn) => fn());
  },
  /** Notification throttlée pour rafraîchir React pendant que la sim tourne. */
  tickNotify(nowMs: number): void {
    if (nowMs - lastNotify > 180) {
      lastNotify = nowMs;
      state = { ...state }; // nouvelle identité => useSyncExternalStore re-render
      listeners.forEach((fn) => fn());
    }
  },
};

export const actions: {
  togglePause: () => void;
  setSpeed: (speed: 1 | 3) => void;
  select: (id: string | null) => void;
  follow: (id: string) => void;
  enterPov: (id: string) => void;
  exitToGlobal: () => void;
  toggleJournal: () => void;
} = {
  togglePause: () => store.set({ paused: !state.paused }),
  setSpeed: (speed: 1 | 3) => store.set({ speed }),
  select: (id: string | null) =>
    store.set({ selectedId: id, mode: id === null && state.mode !== 'global' ? 'global' : state.mode }),
  follow: (id: string) => store.set({ selectedId: id, mode: 'follow' }),
  enterPov: (id: string) => store.set({ selectedId: id, mode: 'pov' }),
  exitToGlobal: () => store.set({ mode: 'global' }),
  toggleJournal: () => store.set({ journalOpen: !state.journalOpen }),
};

// Accès debug/console (utile aussi aux tests visuels automatisés).
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__village = { sim, store, actions };
}
