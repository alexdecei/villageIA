import { actions } from '../../app/runtime';
import { useUI, useWorld } from '../hooks';
import { formatTime } from '../labels';

export function TopBar() {
  const ui = useUI();
  const world = useWorld();
  if (ui.mode === 'pov') return null;

  return (
    <div className="card topbar">
      <span className="village-name">Le Petit Havre</span>
      <span className="sep" />
      <span className="time">{formatTime(world.timeS, world.dayLengthS)}</span>
      <span className="sep" />
      <button className={`ui-btn small${ui.paused ? ' active' : ''}`} onClick={actions.togglePause} title="Pause">
        {ui.paused ? '▶' : '⏸'}
      </button>
      <button className={`ui-btn small${ui.speed === 1 && !ui.paused ? ' active' : ''}`} onClick={() => actions.setSpeed(1)}>
        ×1
      </button>
      <button className={`ui-btn small${ui.speed === 3 && !ui.paused ? ' active' : ''}`} onClick={() => actions.setSpeed(3)}>
        ×3
      </button>
    </div>
  );
}
