# AGENTS.md — Village IA

## Mission actuelle

Village IA est un jeu navigateur d'observation sociale représentant un petit village autonome d'environ douze habitants.

La phase actuelle est exclusivement un vertical slice UI et rendu. Aucun backend, LLM réel, base de données, authentification ou persistance distante ne doit être ajouté.

L'objectif est d'obtenir une scène de jeu immédiatement lisible, attractive, vivante et cohérente, tout en conservant une architecture capable d'accueillir plus tard la simulation et les agents IA.

## Sources de vérité

Pour l'architecture et l'état réel du projet :

1. code exécuté, tests et rendu actuel ;
2. contrats TypeScript existants ;
3. `HANDOFF.md`, après vérification contre le code ;
4. `README.md` ;
5. `VISION.md`.

Pour la direction visuelle :

1. `images/reference.png` et les assets explicitement approuvés ;
2. les captures de rendu validées par l'utilisateur ;
3. les principes de `VISION.md` ;
4. l'implémentation existante, qui peut être remplacée si elle contredit les références.

`HANDOFF.md` peut être incomplet ou obsolète. Ne jamais lui faire confiance sans vérifier le dépôt.

## Stack cible

- TypeScript strict
- Vite
- React pour l'interface HTML/CSS
- Phaser pour la scène du village
- Vitest pour la logique
- Playwright pour les parcours navigateur et captures visuelles
- Assets locaux versionnés dans le dépôt

Phaser peut être challengé uniquement si l'implémentation existante prouve qu'il bloque réellement le résultat. Ne pas changer de moteur par préférence personnelle.

## Périmètre

Inclus :

- scène compacte de village ;
- habitants visibles et identifiables ;
- déplacements et activités simples ;
- conversations et réactions lisibles ;
- sélection et suivi d'un habitant ;
- panneau contextuel ;
- premier mode POV ;
- journal ;
- pause et vitesses ;
- propagation culturelle scriptée ;
- transformations visuelles génériques ;
- simulation déterministe avec seed ;
- build navigateur fonctionnel.

Exclus :

- véritables appels LLM ;
- backend et base de données ;
- authentification ;
- sauvegarde cloud ;
- multijoueur ;
- version mobile dédiée ;
- économie, politique ou combat complets ;
- génération procédurale complexe.

Le MVP est desktop-first. Vérifier au minimum 1280×720, 1440×900 et 1920×1080. Ne pas consacrer de temps à une UI mobile dédiée.

## Audit obligatoire avant reprise

Avant toute modification importante :

1. lire `VISION.md`, `README.md`, `HANDOFF.md` s'il existe et ce fichier ;
2. inspecter `package.json`, l'architecture réelle et l'état Git ;
3. lancer les tests et le build disponibles ;
4. lancer le serveur de développement ;
5. ouvrir la scène dans un navigateur avec une seed fixe ;
6. capturer le rendu initial aux trois résolutions de référence ;
7. comparer le rendu à `images/reference.png` et aux assets approuvés ;
8. identifier ce qui peut être conservé, corrigé ou remplacé.

Préserver en priorité les couches `domain`, `simulation`, `content`, les contrats sérialisables, le déterminisme et les hooks de debug s'ils sont sains.

Le rendu Phaser, les styles React et la composition visuelle peuvent être réécrits localement si leur qualité est insuffisante. Ne pas refaire tout le dépôt uniquement parce que l'UI est ratée.

## Règles d'architecture

- `src/domain/` contient les contrats partagés et sérialisables.
- `src/simulation/` n'importe jamais Phaser, React ou le DOM.
- La simulation utilise un tick fixe et un RNG seedé unique. Aucun `Math.random()`.
- `src/content/` contient les habitants, scénarios, cultures et contenus narratifs sous forme de données.
- `src/rendering/` lit l'état et produit le rendu sans modifier la simulation.
- `src/ui/` contient l'interface React et ne porte aucune règle de simulation.
- Les futurs agents IA produiront des intentions structurées. Ils ne manipuleront jamais Phaser, React, le DOM ou des coordonnées graphiques directement.
- Les directives visuelles contrôlent la forme et les garde-fous ; leur signification narrative vient du contenu.

Ne pas casser un contrat de `domain` ou le déterminisme sans validation explicite.

## Politique d'assets

Les assets locaux approuvés sont autorisés et préférés au dessin procédural lorsqu'ils améliorent la cohérence visuelle.

- Utiliser en priorité les sprites et tiles fournis.
- Ne pas remplacer un asset disponible par une forme générique Phaser.
- Ne pas utiliser les emojis comme identité graphique principale des habitants, bâtiments ou ressources.
- Les emojis restent possibles comme méta-signaux courts : pensée, réaction, symbole culturel ou emblème.
- Ne jamais charger un asset depuis une URL externe à l'exécution.
- Ne pas mélanger plusieurs styles graphiques incompatibles.
- Centraliser les dimensions, échelles, ancres, ombres et chemins d'assets.
- Maintenir un manifeste lisible des assets et de leur usage.
- Les placeholders doivent être temporaires, identifiables et listés dans le bilan.

Ajouter ou générer de nouveaux assets uniquement lorsqu'ils manquent réellement au kit approuvé. Conserver les prompts de génération dans le dépôt lorsque des assets sont générés.

## Direction artistique

La scène doit évoquer une miniature vivante, douce, colorée et légèrement mystérieuse.

Le village doit occuper l'essentiel de l'écran. L'interface doit rester contextuelle et discrète.

À éviter :

- apparence de dashboard SaaS ;
- UI sombre ou cyberpunk ;
- grands tableaux et panneaux permanents ;
- village vide ou excessivement agité ;
- densité uniforme sans hiérarchie ;
- composants semblant provenir de plusieurs design systems ;
- effets visuels sans fonction ;
- formes procédurales génériques utilisées comme rendu final alors que des sprites existent.

La palette, les espacements, les rayons, les ombres, les profondeurs et les échelles doivent être centralisés.

## Boucle visuelle obligatoire

Aucune tâche UI ne peut être considérée comme terminée uniquement parce que le code compile.

Pour chaque incrément visuel significatif :

1. ouvrir le rendu avant modification et prendre une capture de référence ;
2. implémenter un seul objectif visuel cohérent ;
3. ouvrir le rendu réel dans le navigateur ;
4. capturer les états concernés ;
5. comparer le résultat à l'image de référence et aux captures précédemment validées ;
6. effectuer au moins une passe autonome de correction des défauts évidents ;
7. exécuter build et tests pertinents ;
8. présenter les captures, les changements et les écarts restants.

Ne pas enchaîner plusieurs grands chantiers UI sans capture intermédiaire.

Conserver les captures utiles dans :

```text
.artifacts/screenshots/<milestone>/
```

Utiliser des noms explicites :

```text
00-baseline-1440x900.png
01-village-default-1440x900.png
02-villager-selected-1440x900.png
03-pov-1440x900.png
04-doctrine-mie-1440x900.png
```

## États de capture obligatoires

Pour la validation du vertical slice, maintenir des captures déterministes des états suivants :

- village au lancement ;
- habitant sélectionné ;
- caméra suivant un habitant ;
- mode POV ;
- journal ouvert ;
- étape intermédiaire de propagation culturelle ;
- transformation visuelle durable de la Doctrine de la Mie.

Utiliser une seed fixe et les hooks de debug existants pour avancer la simulation sans attendre en temps réel.

Si nécessaire, exposer uniquement en développement une API stable sous `window.__village` permettant de :

- mettre en pause ;
- avancer la simulation d'une durée déterminée ;
- sélectionner un habitant ;
- entrer et sortir du POV ;
- déclencher un état de démonstration.

Cette API ne doit pas contenir de logique de production parallèle.

## Playwright

`@playwright/test` et l'installation locale de Chromium sont pré-approuvés comme dépendances de développement.

Playwright doit servir à :

- ouvrir la build réelle ;
- fixer les dimensions du viewport ;
- piloter les interactions principales ;
- vérifier l'absence d'erreur console bloquante ;
- capturer les états déterministes ;
- créer quelques tests visuels stables sur les écrans principaux.

Ne pas rendre les tests visuels fragiles à cause d'animations non stabilisées. Mettre la simulation en pause et désactiver ou figer les animations décoratives au moment de la capture.

## Commandes attendues

Adapter cette section au dépôt réel :

```bash
npm install
npm run dev
npm run build
npm run test
npm run test:e2e
npm run test:visual
```

Toute commande annoncée doit réellement exister dans `package.json`.

## Git et reprise du travail Fable

Avant une refonte visuelle importante :

- conserver l'état Fable dans une branche ou un tag identifiable ;
- créer une branche dédiée à la reprise UI ;
- ne pas supprimer l'ancien rendu tant que le nouveau n'a pas atteint un premier état vérifiable ;
- effectuer des commits par milestone visuel cohérent ;
- ne pas mélanger refonte graphique et refactor de simulation dans le même commit.

## Autonomie

Tu peux décider sans demander :

- ajustements de composition, espacement, profondeur, palette et animation mineure ;
- refactors locaux du rendu ;
- remplacement d'un placeholder par un asset approuvé ;
- ajout de tests Playwright et de scripts de capture ;
- correction de défauts observés sur les captures ;
- documentation de l'architecture réelle.

Demander avant de :

- changer de moteur graphique ;
- ajouter une dépendance de production ;
- casser un contrat partagé ;
- modifier le déterminisme ;
- supprimer une fonctionnalité visible ;
- introduire un backend, un LLM ou une base de données ;
- dévier volontairement de la référence visuelle ou des assets approuvés.

## Critères de fin d'un milestone

Un milestone UI est terminé uniquement si :

- le résultat demandé est visible dans la build réelle ;
- les captures avant/après existent ;
- les défauts évidents observés ont été corrigés ou documentés ;
- le build passe ;
- les tests pertinents passent ;
- aucune erreur console bloquante n'est observée ;
- le diff reste limité au périmètre ;
- le bilan indique les fichiers modifiés, les commandes exécutées et les écarts visuels restants.