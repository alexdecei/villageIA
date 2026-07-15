import { useEffect, useRef } from 'react';
import { createGame } from '../rendering/phaser/game';
import { TopBar } from './components/TopBar';
import { Journal } from './components/Journal';
import { VillagerPanel } from './components/VillagerPanel';
import { PovOverlay } from './components/PovOverlay';
import { useUI } from './hooks';

export function App() {
  const hostRef = useRef<HTMLDivElement>(null);
  const ui = useUI();

  useEffect(() => {
    if (!hostRef.current) return;
    const game = createGame(hostRef.current);
    return () => game.destroy(true);
  }, []);

  return (
    <div className="app">
      <div ref={hostRef} className="game-host" />
      <TopBar />
      <Journal />
      <VillagerPanel />
      <PovOverlay />
      {ui.selectedId === null && (
        <div className="card hint">Cliquez sur un habitant · glissez pour déplacer · molette pour zoomer</div>
      )}
    </div>
  );
}
