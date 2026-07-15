import { actions } from '../../app/runtime';
import { useUI, useWorld } from '../hooks';
import { ACTIVITY_LABELS } from '../labels';

/** Panneau individuel discret : privilégie la situation présente. */
export function VillagerPanel() {
  const ui = useUI();
  const world = useWorld();
  const v = world.villagers.find((x) => x.id === ui.selectedId);
  if (!v) return null;

  const pov = ui.mode === 'pov';
  const nameOf = (id: string) => world.villagers.find((x) => x.id === id)?.name ?? id;
  const affinities = Object.entries(v.affinities)
    .filter(([, a]) => a >= 0.2)
    .map(([cid, a]) => ({ def: world.cultureDefs[cid], a }))
    .filter((x) => x.def);

  return (
    <div className="card villager-panel">
      <div className="head">
        <span className="name">{v.name}</span>
        <span className="job">{v.job}</span>
        <button className="close" onClick={() => actions.select(null)} title="Fermer">✕</button>
      </div>

      <div className="now">
        {v.asleep ? 'S’est retiré·e chez soi' : (ACTIVITY_LABELS[v.activity] ?? v.activity)}
        {' · '}
        <span className="mood">{v.mood}</span>
      </div>

      <div className="thought">« {v.thought} »</div>

      {!pov && (
        <>
          <div className="chips">
            {v.traits.map((t) => (
              <span key={t} className="chip">{t}</span>
            ))}
          </div>
          {v.relations.slice(0, 3).map((r) => (
            <div key={r.toId} className="rel">
              {nameOf(r.toId)} — {r.kind}
            </div>
          ))}
          {affinities.map(({ def, a }) => (
            <div key={def.id} className="aff">
              {a >= def.adherenceThreshold ? 'Adepte de' : 'Sensible à'} {def.name} {def.symbol}{' '}
              <span className="dots">{'●'.repeat(Math.round(a * 5)).padEnd(5, '○')}</span>
            </div>
          ))}
        </>
      )}

      <div className="actions">
        {ui.mode !== 'follow' && (
          <button className="ui-btn small" onClick={() => actions.follow(v.id)}>Suivre</button>
        )}
        {ui.mode !== 'pov' && (
          <button className="ui-btn small" onClick={() => actions.enterPov(v.id)}>Voir par ses yeux</button>
        )}
        {ui.mode !== 'global' && (
          <button className="ui-btn small" onClick={actions.exitToGlobal}>Vue globale</button>
        )}
      </div>
    </div>
  );
}
