import type { Building, Spot } from '../domain/types';

// Monde : 1500 × 1100. Composition guidée par l'image de référence :
// rivière à l'est, place centrale au puits, bâtiments nichés dans la végétation.

export const BUILDINGS: Building[] = [
  { id: 'fournil', name: 'Le Fournil', tags: ['work'], pos: { x: 615, y: 350 }, door: { x: 615, y: 415 }, style: { roof: 'orange', chimney: true, awning: true } },
  { id: 'ferme', name: 'La Grange', tags: ['work'], pos: { x: 330, y: 700 }, door: { x: 330, y: 765 }, style: { roof: 'thatch', wide: true } },
  { id: 'atelier', name: "L'Atelier", tags: ['work'], pos: { x: 935, y: 330 }, door: { x: 935, y: 393 }, style: { roof: 'blue', chimney: true } },
  { id: 'taverne', name: 'La Taverne du Gué', tags: ['work', 'social'], pos: { x: 845, y: 645 }, door: { x: 845, y: 710 }, style: { roof: 'red', wide: true, awning: true, chimney: true } },
  { id: 'cabane', name: 'La Cabane de pêche', tags: ['work'], pos: { x: 1045, y: 845 }, door: { x: 1000, y: 875 }, style: { roof: 'slate' } },
  { id: 'filature', name: 'La Filature', tags: ['work', 'home'], pos: { x: 1080, y: 235 }, door: { x: 1080, y: 297 }, style: { roof: 'thatch', tall: true } },
  { id: 'm1', name: "L'Échoppe aux herbes", tags: ['home', 'work'], pos: { x: 275, y: 415 }, door: { x: 275, y: 477 }, style: { roof: 'blue', awning: true } },
  { id: 'm2', name: 'Maison du Levain', tags: ['home'], pos: { x: 455, y: 245 }, door: { x: 455, y: 307 }, style: { roof: 'orange' } },
  { id: 'm3', name: 'Maison du Gué', tags: ['home'], pos: { x: 1055, y: 520 }, door: { x: 1055, y: 582 }, style: { roof: 'blue', chimney: true } },
  { id: 'm4', name: 'Maison des Sillons', tags: ['home'], pos: { x: 180, y: 855 }, door: { x: 180, y: 917 }, style: { roof: 'slate' } },
  { id: 'm5', name: 'Maison du Saule', tags: ['home'], pos: { x: 720, y: 880 }, door: { x: 720, y: 942 }, style: { roof: 'red' } },
];

export const SPOTS: Spot[] = [
  { id: 'puits', name: 'La place du puits', tags: ['social', 'gather'], pos: { x: 700, y: 555 }, radius: 62 },
  { id: 'ponton', name: 'Le ponton', tags: ['social'], pos: { x: 985, y: 770 }, radius: 40 },
  { id: 'champ', name: 'Le champ', tags: ['field'], pos: { x: 400, y: 860 }, radius: 52 },
  { id: 'chene', name: 'Le banc du chêne', tags: ['social'], pos: { x: 470, y: 560 }, radius: 30 },
  { id: 'lavoir', name: 'Le lavoir', tags: ['social'], pos: { x: 1010, y: 640 }, radius: 30 },
];

/** Polyligne de la rivière (le rendu l'épaissit et la borde de berges). */
export const RIVER: { x: number; y: number }[] = [
  { x: 1290, y: -40 },
  { x: 1245, y: 160 },
  { x: 1175, y: 380 },
  { x: 1130, y: 560 },
  { x: 1105, y: 720 },
  { x: 1140, y: 900 },
  { x: 1230, y: 1140 },
];

/** Chemins de terre (polylignes, épaissies au rendu). */
export const PATHS: { x: number; y: number }[][] = [
  // axe ouest → place
  [{ x: -30, y: 620 }, { x: 180, y: 600 }, { x: 400, y: 580 }, { x: 640, y: 560 }],
  // place → taverne → lavoir/rivière
  [{ x: 700, y: 555 }, { x: 845, y: 715 }, { x: 985, y: 690 }],
  // place → fournil → m2
  [{ x: 700, y: 555 }, { x: 640, y: 460 }, { x: 615, y: 420 }, { x: 540, y: 330 }, { x: 460, y: 310 }],
  // fournil → atelier → filature
  [{ x: 650, y: 430 }, { x: 800, y: 400 }, { x: 935, y: 398 }, { x: 1040, y: 310 }],
  // place → sud (ferme, champ, maison du saule)
  [{ x: 690, y: 590 }, { x: 560, y: 720 }, { x: 420, y: 780 }, { x: 335, y: 770 }],
  [{ x: 560, y: 720 }, { x: 680, y: 850 }, { x: 720, y: 945 }],
  // taverne → ponton
  [{ x: 870, y: 715 }, { x: 950, y: 760 }, { x: 985, y: 775 }],
  // échoppe m1 → axe principal
  [{ x: 275, y: 480 }, { x: 300, y: 560 }, { x: 330, y: 590 }],
];
