import type { CultureDef } from '../../domain/types';

/**
 * La Doctrine de la Mie — contenu pur. Le moteur ne connaît ni le pain,
 * ni la boulangerie : il ne voit qu'une CultureDef générique et remplaçable.
 */
export const MIE: CultureDef = {
  id: 'mie',
  name: 'la Doctrine de la Mie',
  symbol: '🥖',
  adherenceThreshold: 0.7,
  lines: [
    { min: 0.35, text: 'Le pain, c’est ce qui nous lie.' },
    { min: 0.55, text: 'La mie nous rassemble.' },
    { min: 0.75, text: 'Chaque miche est un présent. 🥖' },
  ],
  skepticLines: [
    'Je ne suis pas convaincu, mais tout le monde en parle.',
    'Ils parlent encore de pain…',
    'Un pain reste un pain.',
  ],
  thoughts: [
    { min: 0.3, text: 'Cette histoire de mie me trotte dans la tête.' },
    { min: 0.5, text: 'Ce symbole apparaît un peu partout.' },
    { min: 0.75, text: 'La mie nous rassemble. J’en suis maintenant convaincu·e.' },
  ],
};
