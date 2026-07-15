import type { VillageContent } from '../domain/types';
import { BUILDINGS, SPOTS } from './map';
import { VILLAGERS } from './villagers';
import { MIE } from './cultures/mie';
import { SCENARIO_MIE } from './scenarios/mie';

export const CONTENT: VillageContent = {
  name: 'Le Petit Havre',
  buildings: BUILDINGS,
  spots: SPOTS,
  villagers: VILLAGERS,
  cultures: [MIE],
  scenario: SCENARIO_MIE,
  ambientChatter: [
    'Belle journée, non ?',
    'La rivière est haute ce matin.',
    'Tu as vu ces nuages, hier soir ?',
    'Le toit de la grange aurait besoin d’une réparation.',
    'Les poissons mordent bien en ce moment.',
    'Il faudrait resserrer les planches du ponton.',
    'On dit que la forêt a bougé. Enfin, on dit…',
    'Passe à la taverne ce soir !',
    'Les fleurs sentent fort cette année.',
  ],
  ambientThoughts: [
    'J’aimerais finir avant la tombée du jour.',
    'Le vent sent la pluie.',
    'Quelque chose nous observe parfois… non, je me fais des idées.',
    'Il faudra que je repasse voir Sidonie.',
    'La place est calme à cette heure.',
    'Je devrais réparer cette clôture.',
  ],
  moods: ['paisible', 'joyeux', 'curieux', 'fatigué', 'préoccupé', 'enjoué', 'songeur'],
};

export const DEFAULT_SEED = 20260712;
