// ---------------------------------------------------------------------------
// Domaine — types partagés. Aucune dépendance à Phaser, React ou au contenu.
// Tout est sérialisable (JSON) : un futur orchestrateur LLM produira/consommera
// ces mêmes structures.
// ---------------------------------------------------------------------------

export interface Vec2 {
  x: number;
  y: number;
}

// --- Village ---------------------------------------------------------------

/** Style visuel d'un bâtiment. Purement formel : aucune sémantique culturelle. */
export interface BuildingStyle {
  roof: 'orange' | 'blue' | 'red' | 'slate' | 'thatch';
  tall?: boolean;
  wide?: boolean;
  chimney?: boolean;
  awning?: boolean;
}

export interface Building {
  id: string;
  name: string;
  /** Étiquette fonctionnelle libre (home, work, social, gather…) — le moteur n'y attache aucun sens narratif. */
  tags: string[];
  pos: Vec2; // centre
  door: Vec2; // point d'accès au sol
  style: BuildingStyle;
}

/** Point d'intérêt hors bâtiment (place, puits, banc, ponton…). */
export interface Spot {
  id: string;
  name: string;
  tags: string[];
  pos: Vec2;
  radius: number;
}

// --- Habitants ---------------------------------------------------------------

export type ActivityKind =
  | 'idle'
  | 'walk'
  | 'work'
  | 'chat'
  | 'gather'
  | 'rest'
  | 'share'; // partage une idée (générique — le contenu décide de laquelle)

export interface Relation {
  toId: string;
  kind: string; // libre : ami, rival, famille…
  strength: number; // 0..1
}

/** Apparence d'un habitant — variations simples pour l'identifier de loin. */
export interface VillagerLook {
  skin: number; // couleur hex
  hair: number;
  hairStyle: 'short' | 'long' | 'bun' | 'bald' | 'cap';
  outfit: number;
  outfitAccent: number;
  hat?: 'straw' | 'cap' | 'hood' | 'flower';
}

export interface Villager {
  id: string;
  name: string;
  job: string;
  traits: [string, string];
  look: VillagerLook;
  homeId: string;
  workId: string;
  /** 0..1 — poids social dans la propagation. */
  influence: number;
  /** 0..1 — propension à adopter de nouvelles idées. */
  receptivity: number;
  relations: Relation[];
  /** Affinité par culture (cultureId → 0..1). */
  affinities: Record<string, number>;
  // — état dynamique —
  pos: Vec2;
  target: Vec2 | null;
  activity: ActivityKind;
  activityUntil: number; // temps sim (s)
  mood: string;
  thought: string;
  chatPartnerId: string | null;
  speakCooldown: number;
  asleep: boolean;
}

// --- Cultures (génériques) ---------------------------------------------------

/**
 * Une culture est un paquet de contenu. Le moteur ne connaît que sa mécanique
 * (affinités, seuils, propagation) — jamais son sens.
 */
export interface CultureDef {
  id: string;
  name: string;
  /** Symbole affichable (emoji ou glyphe). Le moteur ne l'interprète pas. */
  symbol: string;
  /** Répliques prononcées par les convaincus, par palier d'affinité croissant. */
  lines: { min: number; text: string }[];
  /** Répliques des sceptiques exposés à la culture. */
  skepticLines: string[];
  /** Pensées associées, par palier. */
  thoughts: { min: number; text: string }[];
  /** Seuil d'adhésion (affinité ≥ seuil ⇒ adepte). */
  adherenceThreshold: number;
}

export interface CultureState {
  id: string;
  adherents: string[]; // villagerIds
  exposure: number; // somme des affinités
  stage: number; // dernier jalon de scénario franchi
}

// --- Événements & journal ------------------------------------------------------

export interface SimEvent {
  t: number; // temps sim (s)
  kind: 'info' | 'social' | 'culture' | 'alert';
  text: string;
  subjectIds: string[];
  importance: 1 | 2 | 3; // 3 = annonce majeure
}

// --- Directives visuelles (contrat clé pour le futur orchestrateur LLM) --------

export type DirectiveTarget =
  | { kind: 'building'; id: string }
  | { kind: 'villager'; id: string }
  | { kind: 'spot'; id: string }
  | { kind: 'point'; pos: Vec2 };

/**
 * Directive visuelle abstraite et sérialisable. Les agents (futurs LLM) émettent
 * l'intention ; le rendu applique forme, taille, densité et durée via des
 * garde-fous. Aucune signification n'est codée ici.
 */
export type VisualDirective =
  | { type: 'symbol'; target: DirectiveTarget; glyph: string; size?: 'small' | 'medium' }
  | { type: 'emoji-reaction'; target: DirectiveTarget; glyph: string; durationS: number }
  | { type: 'banner'; target: DirectiveTarget; color: string; glyph?: string }
  | { type: 'sign'; target: DirectiveTarget; glyph: string; slogan?: string }
  | { type: 'accessory'; target: DirectiveTarget; slot: 'head' | 'hand'; glyph: string }
  | { type: 'palette-shift'; target: DirectiveTarget; color: string; intensity: number }
  | { type: 'ambient'; tint: string; intensity: number; durationS?: number }
  | { type: 'remove'; directiveId: string };

export interface ActiveDirective {
  id: string;
  directive: VisualDirective;
  issuedAt: number;
  expiresAt: number | null;
}

// --- Scénario (contenu scripté, exécuté génériquement) --------------------------

export type ScenarioAction =
  | { do: 'event'; kind: SimEvent['kind']; text: string; subjects?: string[]; importance?: 1 | 2 | 3 }
  | { do: 'thought'; villagerId: string; text: string }
  | { do: 'mood'; villagerId: string; mood: string }
  | { do: 'boost-affinity'; villagerId: string; cultureId: string; amount: number }
  | { do: 'set-sharing'; villagerId: string; cultureId: string; on: boolean }
  | { do: 'directive'; directive: VisualDirective; ttlS?: number }
  | { do: 'gathering'; spotId: string; villagerIds: string[]; durationS: number }
  | { do: 'bubble'; villagerId: string; text: string };

export interface ScenarioBeat {
  id: string;
  /** Déclenchement : temps sim OU nombre d'adeptes atteint. */
  when: { atS?: number; adherents?: { cultureId: string; count: number } };
  actions: ScenarioAction[];
}

export interface Scenario {
  id: string;
  name: string;
  beats: ScenarioBeat[];
}

// --- Bulles de conversation -----------------------------------------------------

export interface SpeechBubble {
  villagerId: string;
  text: string;
  until: number; // temps sim
  /** importance 2+ = visible en vue globale ; 1 = seulement à proximité / POV */
  importance: 1 | 2;
}

// --- État observable (ce que le rendu et l'UI lisent) ----------------------------

export interface WorldState {
  seed: number;
  timeS: number;
  dayLengthS: number;
  villagers: Villager[];
  buildings: Building[];
  spots: Spot[];
  cultures: Record<string, CultureState>;
  cultureDefs: Record<string, CultureDef>;
  events: SimEvent[];
  bubbles: SpeechBubble[];
  directives: ActiveDirective[];
  /** villagerIds actuellement en train de partager activement une culture. */
  sharing: Record<string, string>; // villagerId -> cultureId
}

export interface VillageContent {
  name: string;
  buildings: Building[];
  spots: Spot[];
  villagers: Omit<
    Villager,
    'pos' | 'target' | 'activity' | 'activityUntil' | 'chatPartnerId' | 'speakCooldown' | 'asleep'
  >[];
  cultures: CultureDef[];
  scenario: Scenario;
  ambientChatter: string[];
  ambientThoughts: string[];
  moods: string[];
}
