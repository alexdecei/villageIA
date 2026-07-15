# HANDOFF — Village IA, vertical slice visuel

Contexte : prototype implémenté en session Cowork (Fable), puis **vérifié dans un vrai navigateur le 2026-07-12** (session 2). Compile (`tsc` propre), 7/7 tests vitest passent, `npm run build` OK. Le rendu est conforme à la DA de référence (miniature douce et colorée) ; le scénario Mie complet se déroule en < 5 min (vérifié beat par beat, voir §6bis).

## 1. Objectif

Vertical slice navigateur d'un village autonome observé « en terrarium » : ~12 habitants qui vivent, discutent, se rassemblent, et une idée culturelle (« Doctrine de la Mie ») qui se propage et transforme visuellement le village. Pas de LLM, backend ni multi-agent — mais l'architecture doit permettre de brancher un orchestrateur LLM plus tard sans réécrire rendu/UI. Références : `VISION.md` (philosophie), `prompt.md` (mission), `images/reference.png` (**direction artistique — l'image prime sur tout texte**).

## 2. Architecture & choix techniques

Stack : TypeScript + Vite + React 18 (UI) + Phaser 3 (scène). Aucun asset externe : tout est dessiné procéduralement (Phaser Graphics) + emojis natifs sur supports dessinés (plaques, enseignes, fanions).

```text
src/
├── domain/types.ts        # contrats partagés, 100 % sérialisables — LE fichier pivot
├── simulation/
│   ├── rng.ts             # mulberry32 seedé (classe Rng)
│   ├── engine.ts          # VillageSim : tick fixe 0,25 s, applyAction(), issueDirective()
│   └── systems/           # movement, behavior (decideNext), conversation (exchange),
│                          # culture (updateCultures/updateSharing), scenario (ScenarioRunner)
├── content/               # DATA pure — remplaçable sans toucher au moteur
│   ├── map.ts             # BUILDINGS, SPOTS, RIVER, PATHS (monde 1500×1100)
│   ├── villagers.ts       # les 12 habitants
│   ├── cultures/mie.ts    # CultureDef générique de la Mie
│   ├── scenarios/mie.ts   # beats scriptés (ScenarioAction uniquement)
│   └── index.ts           # CONTENT + DEFAULT_SEED (20260712)
├── rendering/
│   ├── palette.ts         # PAL, ROOF_COLORS — couleurs dérivées de l'image de référence
│   ├── directives.ts      # applyGuardrails() — garde-fous purs et testés
│   └── phaser/            # game.ts, VillageScene.ts, drawMap.ts, VillagerView.ts
├── app/runtime.ts         # sim (singleton), store UI, actions, window.__village (debug)
└── ui/                    # App.tsx, hooks.ts, labels.ts, styles.css,
                           # components/{TopBar,Journal,VillagerPanel,PovOverlay}.tsx
```

Séparation stricte : `simulation/` et `domain/` n'importent ni Phaser ni React ; `content/` n'importe que `domain/` ; React lit `sim.world` et dispatch des actions UI ; Phaser lit l'état sans jamais le modifier.

## 3. Décisions prises dans la session précédente

- **Emojis natifs** dans des `Text` Phaser sur supports dessinés (unification visuelle sans banque d'assets). Migration Twemoji possible plus tard, même interface `glyph: string`.
- **Pas de pathfinding** : déplacement en ligne droite, carte ouverte. Assumé.
- **Décor procédural côté rendu** (seed dérivée `seed ^ 0x5eed`), hors état simulé — purement cosmétique.
- **Adhésion générique** : quand affinité ≥ seuil, l'adepte arbore le symbole de sa culture (directive `accessory`). La mécanique est générique, le symbole vient du contenu.
- **`store.tickNotify`** : re-render React ~5 Hz pendant que la sim tourne (suffisant).
- **`demo.html`** : build autonome monofichier (script classique, pas de module) pour démo sans serveur — à régénérer après chaque build (voir §9).
- Seed via URL : `?seed=1234`.

## 4. Fichiers/fonctions clés

- `domain/types.ts` : `WorldState`, `Villager`, `CultureDef`, `VisualDirective` (union : symbol, emoji-reaction, banner, sign, accessory, palette-shift, ambient, remove), `ScenarioAction`, `ScenarioBeat`, `SpeechBubble`.
- `simulation/engine.ts` → `VillageSim.step(dt)` (accumulateur, tick 0,25 s), `applyAction()` (exécute les ScenarioAction), `issueDirective()` (point d'entrée unique des directives).
- `systems/behavior.ts` → `decideNext()` : choix d'activité pondéré (work/idle/social/rest, + share si `world.sharing[id]`).
- `systems/conversation.ts` → appariement < 42 px, `exchange()` : réplique culturelle (affinité > 0,35) ou ambiante ; gain d'affinité `0,09 × (0,5+influence) × (0,4+réceptivité)`.
- `systems/culture.ts` → `updateCultures()` (adhésions, pensées par palier), `updateSharing()` (rayonnement 90 px).
- `rendering/directives.ts` → `applyGuardrails()` : max 1 enseigne/bâtiment, 2 symboles/cible, 3 bannières, slogan ≤ 40 car., ambient ≤ 0,14.
- `rendering/phaser/VillageScene.ts` → caméra (drag/molette/follow/POV), `syncBubbles()` (règles de visibilité par mode), `syncDirectives()` (diff apply/destroy), `scatterDecor()`.
- `rendering/phaser/drawMap.ts` → `drawGround/drawBuilding/drawTree/drawWell/drawField…` (tout le décor).
- `rendering/phaser/VillagerView.ts` → silhouette ~26 px, variations (coiffure, chapeau, tenue), anim marche/idle, `setAccessory()`.
- `app/runtime.ts` → `sim`, `store`, `actions`, `window.__village = {sim, store, actions}` (debug/pilotage tests).
- `ui/components/*` : TopBar (pause, ×1/×3, heure), Journal (compact, masqué en POV), VillagerPanel (présent > exhaustif), PovOverlay (vignette CSS).

## 5. Tâches terminées

Scaffold Vite/TS ; domaine + simulation déterministe ; contenu (carte, 12 habitants, culture + scénario Mie en 11 beats) ; rendu Phaser complet (carte, bâtiments, rivière, chemins, décor, habitants animés, bulles, directives) ; UI React (sélection, suivi, POV, journal, contrôles temps) ; tests (`src/simulation/__tests__/determinism.test.ts`) ; README à jour ; build + `demo.html`.

## 6. Tâches restantes (par priorité)

1. **Passe visuelle fine** : lisibilité de l'enseigne du Fournil et de son slogan à zoom 0,85 (petits, chevauchent parfois un habitant) ; deux bulles proches peuvent se chevaucher au puits ; vérifier la bannière au puits de près (posée à t≈164 s, partiellement masquée par les bulles en vue globale).
2. Vérifier les interactions restantes à la souris : sélection au clic, drag caméra vs clic (seuil 6 px dans `setupInput`), zoom molette, follow, POV, journal, pause/vitesses. (Non testé en session 2 — vérif interrompue ; le déroulé sim + rendu des directives, eux, sont validés.)
3. Ombres des personnages fixes au sol (actuellement le Graphics ombre+corps bobbe ensemble dans `VillagerView.update`).
4. Fluidité (cible 60 fps ; ~150 arbres en containers individuels — regrouper en une texture si besoin).
5. Relations → pondération de la propagation (champ `relations` présent, non branché).
6. POV subjectif plus poussé ; cycle jour/nuit léger (directive `ambient` interne).

## 6bis. Vérification session 2 (2026-07-12) — fait / constaté

- **Bug corrigé — canvas 0×0** : `Phaser.Scale.RESIZE` sans `width`/`height` démarrait à 0×0 sans jamais se rattraper. Fix dans `rendering/phaser/game.ts` : `width: '100%', height: '100%'` dans `scale` (l'`autoCenter` retiré, inutile avec RESIZE).
- **Scénario corrigé — 3ᵉ/4ᵉ adepte jamais atteints** : les boosts d'origine (+0,35/+0,3 à t=135) + gains de conversation ne suffisaient pas à franchir le seuil 0,7 ⇒ bannière au puits et symbole taverne ne se déclenchaient jamais. Fix **contenu pur** dans `content/scenarios/mie.ts` : boosts renforcés (beat `coup-de-pouce`) + 2 nouveaux beats `conviction-colette` (t=162) et `ferveur-sidonie` (t=215). Déroulé vérifié : accessoire Maëlle t=22 → enseigne t=80 → Basile t=136 → Colette t=162 → **bannière + ambient t=164** → rassemblement t=185 → Sidonie + symbole taverne t=216 → sceptiques t=240 → épilogue t=275. Zéro changement moteur ; 7/7 tests passent.
- **Constaté OK visuellement** (captures Playwright) : composition/densité du décor, échelle personnages/bâtiments, palette conforme à la référence, enseigne + slogan sur le Fournil, symbole 🥖 sur la taverne, teinte ambiante chaude, bulles crème, badge du Journal, TopBar/hint.
- **Piège d'outillage** : dans un onglet navigateur *caché* (`visibilityState: hidden`), Chrome suspend `requestAnimationFrame` ⇒ boucle Phaser gelée, sim à 0, et le double-montage StrictMode laisse alors 2 canvas (le `destroy` différé ne s'exécute jamais). Dans un onglet visible : 1 seul canvas, tout est normal. Utiliser Playwright (page visible) pour la vérif automatisée.
- **API réelle** : `sim.step(dt)` clampe `dt` à 2 s par appel (anti-spirale). Pour avancer le temps en console : `while (__village.sim.world.timeS < 200) __village.sim.step(2)` — et non `step(60)` comme l'indiquait CLAUDE.md.
- `.claude/launch.json` ajouté (config `village-dev`, port 5173).

## 7. Bugs / blocages connus

- Aucun bug connu **mais le rendu n'a jamais été observé** : attendre des surprises visuelles, pas structurelles.
- Sur ce dossier OneDrive, `npm install` est lent et la synchro peut retarder la visibilité des fichiers modifiés (vu en session : lecture tronquée juste après écriture). En cas d'erreur de compil incohérente, relire le fichier sur disque.
- Chunk JS de 1,6 MB (Phaser) — warning Vite, non bloquant.
- StrictMode double-monte le jeu en dev (create/destroy) : inoffensif.

## 8. Commandes

```bash
npm install
npm run dev      # http://localhost:5173 (?seed=1234)
npm run build    # tsc --noEmit + vite build → dist/
npm run test     # vitest — 7 tests
npm run preview
```

## 9. demo.html (build autonome)

Généré en inlinant `dist/assets/*.js` (script **non**-module) et le CSS dans `dist/index.html` → fichier unique ouvrable en `file://`. Valide tant que le bundle reste un seul chunk sans `import.meta` ni top-level `export`. À régénérer après build si on veut le garder à jour (script node de ~10 lignes, voir historique ; ou l'automatiser en script npm).

## 10. Résultat visuel attendu

Cf. `images/reference.png` : village miniature doux et coloré, vue de dessus légèrement pseudo-iso ; rivière à l'est, place du puits au centre, Fournil/Taverne/Atelier/Ferme + maisons nichées dans une végétation dense ; 12 habitants distincts qui marchent, travaillent, discutent (bulles crème), se rassemblent ; à partir de t≈80 s des signes 🥖 apparaissent (enseigne du Fournil, bannière au puits, accessoires des adeptes, légère teinte chaude) ; journal compact à droite, panneau habitant discret en bas à gauche. Jamais un dashboard : le village occupe l'écran, l'UI reste contextuelle.

## 11. Prochaines étapes exactes

1. `npm install && npm run test && npm run dev`.
2. Ouvrir localhost:5173, laisser tourner 3 min (ou ×3), observer le scénario complet.
3. Piloter via console : `__village.actions.select('maelle')`, `.follow(...)`, `.enterPov(...)`, `__village.sim.step(60)` pour avancer le temps.
4. Corriger les 5 défauts visuels/ergonomiques les plus importants (captures avant/après si possible).
5. `npm run build` + relancer les tests ; laisser le dépôt stable ; mettre à jour ce fichier.

## 12. À ne pas modifier / régresser

- **Séparation des couches** (§2) : la simulation n'importe jamais Phaser/React ; le contenu reste de la data ; toute nouvelle transformation visuelle passe par `VisualDirective` + `applyGuardrails()`.
- **Déterminisme** : même seed ⇒ même déroulé (tick fixe 0,25 s, un seul `Rng`). Ne pas introduire de `Math.random()` ni de dépendance au framerate dans `simulation/`.
- **Aucune sémantique culturelle dans le moteur** : rien de spécifique au pain hors de `content/`. Le moteur contrôle la forme, le contenu produit le sens.
- **Les 7 tests** doivent continuer à passer.
- La DA : douce, colorée, jamais sombre/technique. L'image de référence prime.
- Contrats de `domain/types.ts` : étendre, ne pas casser (futur orchestrateur LLM branché sur `applyAction`/`issueDirective`/`decideNext`/`exchange`).
