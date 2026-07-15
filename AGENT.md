# CLAUDE.md — Village IA

Jeu d'observation sociale : village miniature autonome, ~12 agents, propagation culturelle générique. Vertical slice sans LLM/backend. Voir `VISION.md` (produit), `HANDOFF.md` (état courant), `images/reference.png` (DA de référence — prime sur tout texte).

## Stack

TypeScript strict + Vite + React 18 (UI) + Phaser 3 (scène) + vitest. Zéro asset externe : rendu procédural (Graphics) + emojis natifs sur supports dessinés. Aucune API externe.

## Commandes

```bash
npm run dev      # localhost:5173 (?seed=1234 pour changer la seed)
npm run build    # tsc --noEmit + vite build
npm run test     # vitest — doit toujours passer
```

Debug console navigateur : `__village.{sim, store, actions}` (ex. `__village.actions.enterPov('maelle')`, `__village.sim.step(60)`).

## Architecture (règles strictes)

- `src/domain/types.ts` : contrats partagés, tout sérialisable. Étendre, ne jamais casser.
- `src/simulation/` : n'importe **jamais** Phaser ni React. Tick fixe 0,25 s, RNG seedé unique (`Rng`). Pas de `Math.random()`, pas de dépendance au framerate.
- `src/content/` : data pure (carte, habitants, cultures, scénarios). N'importe que `domain/`.
- `src/rendering/` : lit l'état, ne le modifie jamais. Toute transformation visuelle passe par `VisualDirective` → `applyGuardrails()` (rendering/directives.ts).
- `src/ui/` : React, aucune règle de simulation. Lit `sim.world`, dispatch via `actions` (app/runtime.ts).

## Règles métier

- **Déterminisme** : même seed ⇒ même déroulé (testé). À préserver absolument.
- **Liberté sémantique** : le moteur ne connaît aucune signification culturelle (pas de règle « pain » hors de `content/`). Le moteur contrôle la forme (taille, densité, durée), le contenu produit le sens.
- Les garde-fous visuels limitent forme et densité, jamais le contenu narratif.
- Point d'intégration futur orchestrateur LLM : `decideNext()`, `exchange()`, `VillageSim.applyAction()`, `issueDirective()` — mêmes structures de données.

## Contraintes visuelles

Miniature vivante, douce, colorée (cf. image de référence) : jamais de dashboard SaaS, d'UI sombre/technique, de surcharge de données. Le village occupe l'écran ; UI contextuelle et discrète. Palette centralisée dans `rendering/palette.ts`.

## Conventions

- Commentaires et textes de jeu en français ; identifiants en anglais.
- Fichiers courts, une responsabilité ; types explicites aux frontières de couches.
- Nouvelle culture/scénario = nouveaux fichiers dans `content/`, zéro changement moteur.

## Tests & vérification

- `npm run test` avant tout commit ; ajouter un test pour toute nouvelle mécanique de simulation.
- Vérification visuelle : lancer dev, observer ~3 min (ou vitesse ×3) ; piloter via `__village` en console. Le scénario Mie doit se dérouler en < 5 min : révélation (t≈22 s) → enseigne Fournil (t≈80 s) → bannière au puits (3 adeptes) → rassemblement (t≈185 s).

## Autonomie attendue

Décisions esthétiques mineures et refactors locaux : sans demander. Demander avant de : casser un contrat de `domain/types.ts`, ajouter une dépendance, toucher au déterminisme, ou dévier de la DA de référence.

# AGENTS.md — Instructions Codex pour projets vibe-coded / PO-technique

## Rôle

Tu travailles avec un utilisateur PO-technique qui construit des mini-produits, prototypes, outils internes et apps web pragmatiques.

L’objectif n’est pas de sur-ingénier une architecture parfaite, mais de livrer vite des incréments utiles, propres, maintenables et cohérents avec l’existant.

Tu dois agir comme un développeur produit senior : tu comprends l’intention métier, tu respectes l’ergonomie, tu limites les régressions, et tu fais des choix simples.

## Principes de travail

* Toujours comprendre le contexte produit avant de modifier le code.
* Privilégier l’incrément minimal à valeur ajoutée.
* Ne jamais transformer une demande simple en refactor massif.
* Ne pas inventer une nouvelle architecture si l’existant suffit.
* Ne pas créer de système parallèle si un composant, hook, service, token ou pattern existe déjà.
* Préserver le comportement existant sauf demande explicite.
* Signaler clairement toute hypothèse importante avant ou après implémentation.
* En cas d’ambiguïté mineure, choisir l’option la plus simple et la moins invasive.
* En cas d’ambiguïté structurante, proposer brièvement 2 ou 3 options avant d’agir.

## Règle anti-régression

Avant toute modification :

* identifier les fichiers concernés ;
* repérer les composants, routes, hooks, stores, services et patterns déjà utilisés ;
* comprendre les dépendances directes ;
* éviter de toucher aux fichiers partagés sauf nécessité claire.

Pendant la modification :

* changer uniquement les fichiers nécessaires ;
* conserver les APIs existantes ;
* éviter les effets de bord ;
* ne pas renommer ou déplacer sans raison ;
* ne pas supprimer du code sans vérifier son usage.

Après modification :

* vérifier le build, le lint ou les tests disponibles si la commande est connue ;
* vérifier manuellement le flux concerné quand c’est possible ;
* résumer ce qui a changé, où, et comment vérifier.

## Frontend / UI / UX

Le front est un livrable produit, pas une décoration.

Pour toute tâche UI :

* inspecter les composants existants avant d’en créer de nouveaux ;
* réutiliser les tokens, composants, primitives, icônes et patterns du projet ;
* respecter la hiérarchie visuelle, les espacements, la responsivité et les états interactifs ;
* penser desktop et mobile ;
* vérifier les breakpoints importants ;
* éviter les layouts génériques, mous ou mal alignés ;
* éviter les interfaces “tech demo” sans ergonomie ;
* prévoir les états vides, loading, erreur et succès si le flux l’exige ;
* préserver la lisibilité et l’accessibilité de base.

Ne jamais considérer une tâche front comme terminée si :

* un élément déborde sur mobile ;
* le layout casse sur une largeur standard ;
* un bouton important est mal placé ;
* une action principale n’est pas visible ;
* les composants semblent appartenir à plusieurs design systems différents.

## Travail visuel

Quand une tâche concerne le rendu visuel :

* lancer ou réutiliser le serveur de dev si possible ;
* ouvrir la route concernée dans le navigateur si l’environnement le permet ;
* vérifier le rendu réel avant de conclure ;
* utiliser Playwright, Browser ou screenshots disponibles pour inspecter desktop et mobile ;
* ne pas se fier uniquement au code.

Si le navigateur n’est pas disponible, le dire explicitement dans le résumé final et indiquer le risque résiduel.

## Architecture

Architecture attendue : simple, lisible, durable.

* Favoriser une séparation claire : UI, logique métier, services/API, types, utils.
* Garder les composants petits mais pas fragmentés artificiellement.
* Extraire uniquement quand il y a réutilisation réelle ou complexité visible.
* Éviter les abstractions prématurées.
* Éviter les dépendances lourdes pour des besoins simples.
* Garder les conventions du repo même si une autre approche serait théoriquement meilleure.
* Ne pas modifier le modèle de données ou les contrats API sans nécessité explicite.

## Logique d’itération

Chaque itération doit être :

* petite ;
* testable ;
* compréhensible ;
* réversible ;
* directement utile.

Ne pas cumuler plusieurs chantiers dans une même réponse.
Si la demande contient plusieurs sujets, proposer un découpage ou traiter uniquement le premier bloc logique.

## Relation au produit

Toujours raisonner en termes de valeur utilisateur :

* Quel problème est résolu ?
* Pour quel utilisateur ?
* Dans quel parcours ?
* Quelle action devient plus simple ?
* Quel risque de régression est introduit ?

Si une solution technique ne sert pas clairement le parcours utilisateur, la simplifier.

## Style de réponse

Répondre de manière concise, dense et opérationnelle.

Après modification, indiquer :

* ce qui a été fait ;
* les fichiers modifiés ;
* comment vérifier ;
* les limites ou risques restants.

Ne pas faire de longs discours.
Ne pas survendre.
Ne pas prétendre avoir testé si ce n’est pas le cas.

## Interdits

* Ne pas réécrire une page entière pour corriger un détail.
* Ne pas ajouter une lib sans justification.
* Ne pas créer de design system parallèle.
* Ne pas casser la responsivité existante.
* Ne pas masquer une erreur avec un contournement fragile.
* Ne pas modifier les fichiers partagés sans vérifier les impacts.
* Ne pas faire de refactor “gratuit”.
* Ne pas supprimer du code utilisateur ou des changements non liés.
* Ne pas utiliser de commande destructive Git sans demande explicite.