import type { Scenario } from '../../domain/types';

/**
 * Scénario de démonstration : montée de la Doctrine de la Mie.
 * Uniquement des primitives génériques (ScenarioAction) — remplaçable par
 * n'importe quelle autre dérive culturelle, ou par un orchestrateur LLM.
 */
export const SCENARIO_MIE: Scenario = {
  id: 'doctrine-mie',
  name: 'La Doctrine de la Mie',
  beats: [
    {
      id: 'matin',
      when: { atS: 8 },
      actions: [{ do: 'event', kind: 'info', text: 'Matinée ordinaire : chacun vaque à ses occupations.', importance: 1 }],
    },
    {
      id: 'revelation',
      when: { atS: 22 },
      actions: [
        { do: 'boost-affinity', villagerId: 'maelle', cultureId: 'mie', amount: 0.4 },
        { do: 'set-sharing', villagerId: 'maelle', cultureId: 'mie', on: true },
        { do: 'mood', villagerId: 'maelle', mood: 'illuminée' },
        { do: 'thought', villagerId: 'maelle', text: 'Ce matin, la pâte m’a parlé. Ce n’était pas un rêve.' },
        { do: 'bubble', villagerId: 'maelle', text: 'La mie nous rassemble !' },
        { do: 'event', kind: 'culture', text: 'Maëlle attribue une valeur nouvelle au pain.', subjects: ['maelle'], importance: 2 },
      ],
    },
    {
      id: 'premier-echo',
      when: { atS: 48 },
      actions: [
        { do: 'boost-affinity', villagerId: 'basile', cultureId: 'mie', amount: 0.55 },
        { do: 'bubble', villagerId: 'basile', text: 'Maëlle dit vrai : la mie nous rassemble !' },
        { do: 'event', kind: 'culture', text: 'Basile reprend les mots de Maëlle.', subjects: ['basile'], importance: 1 },
      ],
    },
    {
      id: 'signe-fournil',
      when: { atS: 80 },
      actions: [
        { do: 'directive', directive: { type: 'sign', target: { kind: 'building', id: 'fournil' }, glyph: '🥖', slogan: 'La mie nous rassemble' } },
        { do: 'event', kind: 'culture', text: 'Un signe apparaît sur le Fournil.', importance: 2 },
      ],
    },
    {
      id: 'scepticisme',
      when: { atS: 105 },
      actions: [
        { do: 'thought', villagerId: 'armand', text: 'Je ne suis pas convaincu, mais tout le monde en parle.' },
        { do: 'mood', villagerId: 'armand', mood: 'agacé' },
        { do: 'bubble', villagerId: 'armand', text: 'Ils parlent encore de pain…' },
      ],
    },
    {
      id: 'coup-de-pouce',
      when: { atS: 135 },
      actions: [
        { do: 'boost-affinity', villagerId: 'basile', cultureId: 'mie', amount: 0.2 },
        { do: 'boost-affinity', villagerId: 'colette', cultureId: 'mie', amount: 0.5 },
        { do: 'boost-affinity', villagerId: 'sidonie', cultureId: 'mie', amount: 0.45 },
        { do: 'boost-affinity', villagerId: 'prune', cultureId: 'mie', amount: 0.35 },
        { do: 'event', kind: 'culture', text: 'Le vocabulaire de la mie circule à la taverne et au champ.', importance: 1 },
      ],
    },
    {
      id: 'conviction-colette',
      when: { atS: 162 },
      actions: [
        { do: 'boost-affinity', villagerId: 'colette', cultureId: 'mie', amount: 0.25 },
        { do: 'bubble', villagerId: 'colette', text: 'La mie nous rassemble, je le sens aussi.' },
      ],
    },
    {
      id: 'influence',
      when: { adherents: { cultureId: 'mie', count: 3 } },
      actions: [
        { do: 'directive', directive: { type: 'banner', target: { kind: 'spot', id: 'puits' }, color: '#e8b04a', glyph: '🥖' } },
        { do: 'event', kind: 'culture', text: 'La Doctrine de la Mie gagne en influence.', importance: 3 },
        { do: 'directive', directive: { type: 'ambient', tint: '#f4c17a', intensity: 0.07 } },
      ],
    },
    {
      id: 'rassemblement',
      when: { atS: 185 },
      actions: [
        { do: 'gathering', spotId: 'puits', villagerIds: ['maelle', 'basile', 'colette', 'sidonie', 'prune', 'henriette', 'gustave', 'leonie', 'marius'], durationS: 28 },
        { do: 'bubble', villagerId: 'maelle', text: 'Chaque miche est un présent !' },
        { do: 'event', kind: 'culture', text: 'Un rassemblement se forme autour de la Doctrine de la Mie.', importance: 3 },
      ],
    },
    {
      id: 'ferveur-sidonie',
      when: { atS: 215 },
      actions: [
        { do: 'boost-affinity', villagerId: 'sidonie', cultureId: 'mie', amount: 0.3 },
        { do: 'bubble', villagerId: 'sidonie', text: 'À la taverne aussi, chaque miche est un présent !' },
      ],
    },
    {
      id: 'partage-sidonie',
      when: { adherents: { cultureId: 'mie', count: 4 } },
      actions: [
        { do: 'set-sharing', villagerId: 'sidonie', cultureId: 'mie', on: true },
        { do: 'directive', directive: { type: 'symbol', target: { kind: 'building', id: 'taverne' }, glyph: '🥖', size: 'small' } },
        { do: 'event', kind: 'culture', text: 'Ce symbole apparaît un peu partout.', importance: 2 },
      ],
    },
    {
      id: 'sceptiques-fin',
      when: { atS: 240 },
      actions: [
        { do: 'thought', villagerId: 'theo', text: 'Un pain reste un pain. Enfin… je crois.' },
        { do: 'bubble', villagerId: 'jonas', text: 'Un pain reste un pain.' },
        { do: 'event', kind: 'info', text: 'Armand, Théo et Jonas restent à l’écart de la Doctrine.', importance: 2 },
      ],
    },
    {
      id: 'epilogue',
      when: { atS: 275 },
      actions: [
        { do: 'event', kind: 'culture', text: 'La Doctrine de la Mie s’installe dans le quotidien du village.', importance: 3 },
      ],
    },
  ],
};
