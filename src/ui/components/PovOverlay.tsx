import { actions } from '../../app/runtime';
import { useUI, useWorld } from '../hooks';

/**
 * Mode POV : perception limitée. Vignette, informations globales masquées
 * (TopBar et Journal se retirent d'eux-mêmes), pensées de l'agent prioritaires.
 */
export function PovOverlay() {
  const ui = useUI();
  const world = useWorld();
  if (ui.mode !== 'pov') return null;
  const v = world.villagers.find((x) => x.id === ui.selectedId);
  if (!v) return null;

  return (
    <>
      <div className="pov-vignette" />
      <div className="card pov-banner">
        <span>
          Vous percevez le monde à travers <em>{v.name}</em>
        </span>
        <button className="ui-btn small" onClick={actions.exitToGlobal}>
          Revenir à la vue globale
        </button>
      </div>
    </>
  );
}
