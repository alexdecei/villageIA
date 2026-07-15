import type { VillageContent } from '../domain/types';

// Palette de peaux / cheveux / tenues — douce, cohérente avec la référence.
const SKIN = { clair: 0xf2c9a0, dore: 0xe0a878, brun: 0xb07b52, fonce: 0x8a5a3b };
const HAIR = { noir: 0x3b2c26, brun: 0x6b4a32, roux: 0xb35c33, blond: 0xd9a852, gris: 0xb8b0a4 };

export const VILLAGERS: VillageContent['villagers'] = [
  {
    id: 'maelle', name: 'Maëlle', job: 'Boulangère', traits: ['fervente', 'charismatique'],
    look: { skin: SKIN.dore, hair: HAIR.noir, hairStyle: 'bun', outfit: 0xc95f4a, outfitAccent: 0xf3e6cd },
    homeId: 'm2', workId: 'fournil', influence: 0.85, receptivity: 0.5,
    relations: [
      { toId: 'basile', kind: 'apprenti', strength: 0.9 },
      { toId: 'sidonie', kind: 'amie', strength: 0.7 },
      { toId: 'armand', kind: 'fournisseur', strength: 0.5 },
    ],
    affinities: { mie: 0.5 }, mood: 'inspirée', thought: 'La pâte a quelque chose de différent ce matin…',
  },
  {
    id: 'basile', name: 'Basile', job: 'Apprenti boulanger', traits: ['enthousiaste', 'crédule'],
    look: { skin: SKIN.clair, hair: HAIR.roux, hairStyle: 'short', outfit: 0xe8963f, outfitAccent: 0xf3e6cd, hat: 'cap' },
    homeId: 'm5', workId: 'fournil', influence: 0.35, receptivity: 0.85,
    relations: [{ toId: 'maelle', kind: 'mentore', strength: 0.9 }, { toId: 'prune', kind: 'ami', strength: 0.6 }],
    affinities: {}, mood: 'joyeux', thought: 'Le four chauffe bien aujourd’hui.',
  },
  {
    id: 'armand', name: 'Armand', job: 'Meunier', traits: ['pragmatique', 'têtu'],
    look: { skin: SKIN.brun, hair: HAIR.gris, hairStyle: 'short', outfit: 0x6b7f8f, outfitAccent: 0xc4a476, hat: 'straw' },
    homeId: 'm4', workId: 'ferme', influence: 0.6, receptivity: 0.12,
    relations: [{ toId: 'colette', kind: 'voisine', strength: 0.7 }, { toId: 'maelle', kind: 'cliente', strength: 0.5 }],
    affinities: {}, mood: 'bougon', thought: 'Le grain n’attend pas.',
  },
  {
    id: 'colette', name: 'Colette', job: 'Fermière', traits: ['travailleuse', 'chaleureuse'],
    look: { skin: SKIN.clair, hair: HAIR.blond, hairStyle: 'long', outfit: 0x7fa06b, outfitAccent: 0xf3e6cd, hat: 'flower' },
    homeId: 'm4', workId: 'ferme', influence: 0.5, receptivity: 0.6,
    relations: [{ toId: 'armand', kind: 'voisin', strength: 0.7 }, { toId: 'leonie', kind: 'amie', strength: 0.6 }],
    affinities: {}, mood: 'paisible', thought: 'Les semis prennent bien.',
  },
  {
    id: 'theo', name: 'Théo', job: 'Menuisier', traits: ['minutieux', 'réservé'],
    look: { skin: SKIN.dore, hair: HAIR.brun, hairStyle: 'short', outfit: 0x8a6b4a, outfitAccent: 0x4f7fb5 },
    homeId: 'm3', workId: 'atelier', influence: 0.45, receptivity: 0.3,
    relations: [{ toId: 'jonas', kind: 'collègue', strength: 0.8 }, { toId: 'henriette', kind: 'voisine', strength: 0.5 }],
    affinities: {}, mood: 'concentré', thought: 'Cette planche est presque droite.',
  },
  {
    id: 'sidonie', name: 'Sidonie', job: 'Tavernière', traits: ['bavarde', 'généreuse'],
    look: { skin: SKIN.fonce, hair: HAIR.noir, hairStyle: 'bun', outfit: 0x9b59a0, outfitAccent: 0xf3e6cd },
    homeId: 'taverne', workId: 'taverne', influence: 0.7, receptivity: 0.5,
    relations: [{ toId: 'maelle', kind: 'amie', strength: 0.7 }, { toId: 'marius', kind: 'habitué', strength: 0.8 }],
    affinities: {}, mood: 'enjouée', thought: 'Il faudra rentrer des tonneaux avant ce soir.',
  },
  {
    id: 'gustave', name: 'Gustave', job: 'Pêcheur', traits: ['patient', 'rêveur'],
    look: { skin: SKIN.brun, hair: HAIR.brun, hairStyle: 'cap', outfit: 0x4f7fb5, outfitAccent: 0xd9c9a8, hat: 'cap' },
    homeId: 'cabane', workId: 'cabane', influence: 0.3, receptivity: 0.55,
    relations: [{ toId: 'sidonie', kind: 'ami', strength: 0.6 }, { toId: 'theo', kind: 'ami', strength: 0.4 }],
    affinities: {}, mood: 'rêveur', thought: 'La rivière murmure, comme toujours.',
  },
  {
    id: 'leonie', name: 'Léonie', job: 'Herboriste', traits: ['curieuse', 'douce'],
    look: { skin: SKIN.clair, hair: HAIR.brun, hairStyle: 'long', outfit: 0x5e9c8f, outfitAccent: 0xf3e6cd, hat: 'flower' },
    homeId: 'm1', workId: 'm1', influence: 0.5, receptivity: 0.65,
    relations: [{ toId: 'colette', kind: 'amie', strength: 0.6 }, { toId: 'prune', kind: 'apprentie', strength: 0.7 }],
    affinities: {}, mood: 'curieuse', thought: 'La camomille sera prête à cueillir demain.',
  },
  {
    id: 'marius', name: 'Marius', job: 'Conteur', traits: ['sage', 'nostalgique'],
    look: { skin: SKIN.dore, hair: HAIR.gris, hairStyle: 'bald', outfit: 0x7a6a8f, outfitAccent: 0xd9c9a8 },
    homeId: 'm3', workId: 'taverne', influence: 0.75, receptivity: 0.4,
    relations: [{ toId: 'sidonie', kind: 'confidente', strength: 0.8 }, { toId: 'armand', kind: 'vieil ami', strength: 0.6 }],
    affinities: {}, mood: 'songeur', thought: 'Ce village ressemble à celui de mes souvenirs… ou presque.',
  },
  {
    id: 'prune', name: 'Prune', job: 'Apprentie herboriste', traits: ['vive', 'espiègle'],
    look: { skin: SKIN.fonce, hair: HAIR.noir, hairStyle: 'long', outfit: 0xe0a34e, outfitAccent: 0x5e9c8f },
    homeId: 'm1', workId: 'm1', influence: 0.25, receptivity: 0.75,
    relations: [{ toId: 'leonie', kind: 'mentore', strength: 0.8 }, { toId: 'basile', kind: 'ami', strength: 0.6 }],
    affinities: {}, mood: 'espiègle', thought: 'Je parie que je cours plus vite que Basile.',
  },
  {
    id: 'jonas', name: 'Jonas', job: 'Tailleur de pierre', traits: ['costaud', 'placide'],
    look: { skin: SKIN.brun, hair: HAIR.noir, hairStyle: 'short', outfit: 0x8f8578, outfitAccent: 0xc95f4a },
    homeId: 'm5', workId: 'atelier', influence: 0.4, receptivity: 0.35,
    relations: [{ toId: 'theo', kind: 'collègue', strength: 0.8 }, { toId: 'gustave', kind: 'ami', strength: 0.5 }],
    affinities: {}, mood: 'placide', thought: 'La pierre ne ment jamais.',
  },
  {
    id: 'henriette', name: 'Henriette', job: 'Tisserande', traits: ['élégante', 'observatrice'],
    look: { skin: SKIN.clair, hair: HAIR.blond, hairStyle: 'bun', outfit: 0xb5638f, outfitAccent: 0xf3e6cd },
    homeId: 'filature', workId: 'filature', influence: 0.55, receptivity: 0.5,
    relations: [{ toId: 'theo', kind: 'voisin', strength: 0.5 }, { toId: 'sidonie', kind: 'amie', strength: 0.6 }],
    affinities: {}, mood: 'attentive', thought: 'Ce fil bleu ferait une belle écharpe.',
  },
];
