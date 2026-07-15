import { actions } from '../../app/runtime';
import { useUI, useWorld } from '../hooks';
import { formatTime } from '../labels';

/** Journal chronologique compact. Masqué en POV (information globale réduite). */
export function Journal() {
  const ui = useUI();
  const world = useWorld();
  if (ui.mode === 'pov') return null;

  const events = world.events.filter((e) => e.importance >= 2 || ui.journalOpen).slice(-40).reverse();
  const majorCount = world.events.filter((e) => e.importance >= 3).length;

  return (
    <>
      <button className="card journal-toggle ui-btn" onClick={actions.toggleJournal}>
        📜 Journal
        {majorCount > 0 && <span className="badge">{majorCount}</span>}
      </button>
      {ui.journalOpen && (
        <div className="card journal">
          <h3>Chroniques du village</h3>
          <ul>
            {events.map((e, i) => (
              <li key={`${e.t}-${i}`} className={`imp-${e.importance} k-${e.kind}`}>
                <span className="t">{formatTime(e.t, world.dayLengthS).split('· ')[1]}</span>
                <span className="txt">{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
