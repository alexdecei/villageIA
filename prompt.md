# PROMPT.md — Initialisation du vertical slice Village IA

## Mission

Construire une nouvelle base propre pour le vertical slice visuel de Village IA en utilisant le plugin Game Studio.

Le prototype précédent ne constitue pas la base technique du projet. Il peut être consulté uniquement comme source éventuelle de contenu, de types ou de logique déterministe après audit explicite.

Le travail actuel concerne uniquement :

- le monde visuel ;
- l’interface d’observation ;
- une simulation locale simple ;
- la préparation des frontières nécessaires à une future intégration d’agents LLM.

Ne pas intégrer de backend, base de données, authentification, API externe ou véritable agent LLM.

## Documents et assets à lire

Avant de coder :

1. lire `VISION.md` ;
2. lire `AGENTS.md` ;
3. inspecter toutes les images de `images/references/` ;
4. inventorier tous les assets de `images/sprites/raw/` ;
5. identifier les éléments manquants pour la première scène.

Les références visuelles constituent la source principale pour la direction artistique.

Les fichiers présents dans `images/sprites/raw/` sont des sources immuables. Ne jamais les écraser, les recadrer ou les modifier directement.

## Routage Game Studio

Utiliser Game Studio comme point d’entrée, puis mobiliser explicitement :

- `web-game-foundations` pour cadrer l’architecture ;
- `phaser-2d-game` pour la scène 2D ;
- `game-ui-frontend` pour les surfaces React ;
- `sprite-pipeline` pour les conventions, l’échelle et l’intégration des sprites ;
- `game-playtest` pour les captures, tests navigateur et revues visuelles.

Ne pas traiter ces domaines comme des chantiers indépendants. Ils doivent former une seule architecture cohérente.


## Outils autorisés et attendus

Aucun connecteur externe, MCP, service cloud ou outil de design tiers n’est nécessaire pour préparer les sprite sheets.

Utiliser en priorité les capacités locales disponibles :

- accès au système de fichiers du dépôt ;
- terminal et scripts reproductibles ;
- Python 3 ;
- Pillow pour l’inspection, le découpage, le recadrage et l’export PNG ;
- OpenCV uniquement si la détection de contours, de grilles ou de fonds l’exige réellement ;
- les scripts fournis par `sprite-pipeline` lorsqu’ils correspondent au besoin ;
- Playwright et le navigateur pour valider les assets dans la scène réelle.

L’utilisation d’ImageGen est facultative et réservée à la création ou à la réparation d’assets manquants après validation explicite de la direction artistique. Ne pas utiliser la génération d’images pour découper une planche existante ou supprimer un fond simple.

Éviter les outils nécessitant une API distante pour une opération réalisable localement.

Toute dépendance Python ou npm ajoutée pour le pipeline doit être :

- justifiée ;
- légère ;
- documentée ;
- installable par une commande reproductible ;
- absente du runtime de production lorsqu’elle ne sert qu’à la préparation des assets.

## Étape 1 — audit et cadrage

Produire d’abord `docs/FOUNDATIONS.md` avec :

- stack retenue ;
- structure des dossiers ;
- séparation simulation, rendu, UI et contenu ;
- ownership de l’état ;
- modèle de caméra ;
- modèle d’input ;
- organisation du manifeste d’assets ;
- conventions d’échelle, d’ancrage et de profondeur ;
- stratégie de debug ;
- stratégie de captures reproductibles ;
- commandes du projet ;
- principaux risques.

Le document doit être court et opérationnel.

Ne pas sur-concevoir les futurs systèmes LLM, backend ou sauvegarde. Préparer uniquement des frontières propres.

## Étape 2 — inventaire et pipeline des assets

Les assets peuvent être fournis sous forme de planches ou de sets contenant plusieurs sprites, avec ou sans arrière-plan.

Commencer par inventorier les sources dans `images/sprites/raw/`.

Produire `docs/ASSET_INVENTORY.md` avec un tableau indiquant pour chaque source et chaque sprite identifié :

- famille ;
- nom proposé ;
- fichier source ;
- position ou zone dans la planche ;
- dimensions natives ;
- présence et nature de l’arrière-plan ;
- perspective ;
- ancrage attendu ;
- échelle logique ;
- variations disponibles ;
- état : utilisable, à extraire, à normaliser, ambigu, manquant ou rejeté ;
- remarques.

### Structure des assets

Utiliser la structure suivante :

```text
images/sprites/
├── raw/                    # sources originales, immuables
├── processed/              # PNG découpés et normalisés, régénérables
│   ├── characters/
│   ├── buildings/
│   ├── vegetation/
│   ├── terrain/
│   ├── water/
│   ├── props/
│   ├── ui/
│   └── fx/
├── previews/               # planches contact et aperçus de contrôle
└── manifest.json           # inventaire stable utilisé par le projet
```

Le jeu ne doit jamais charger directement les fichiers de `raw/`.

### Pipeline à construire

Créer un pipeline local et reproductible dans `scripts/assets/` capable, selon les besoins, de :

1. inspecter les dimensions et le canal alpha des sources ;
2. détecter une grille régulière lorsqu’elle existe ;
3. permettre une configuration manuelle des zones lorsque la détection automatique est ambiguë ;
4. découper chaque sprite sans modifier la source ;
5. supprimer un fond uni ou quasi uni ;
6. préserver les contours et les pixels utiles ;
7. recadrer les marges inutiles ;
8. ajouter une marge transparente homogène lorsque nécessaire ;
9. normaliser l’échelle sans agrandissement destructeur ;
10. aligner les sprites sur un ancrage partagé, généralement `bottom-center` ;
11. exporter en PNG transparent ;
12. générer des noms et clés stables ;
13. produire `images/sprites/manifest.json` ;
14. produire des planches contact dans `images/sprites/previews/` ;
15. produire un rapport des anomalies et décisions manuelles.

Le pipeline doit être relançable sans intervention destructive.

### Suppression de l’arrière-plan

La suppression automatique est autorisée uniquement lorsque le fond est identifiable avec un niveau de confiance suffisant :

- couleur unie ;
- couleur quasi unie ;
- transparence déjà présente ;
- séparation nette avec les sprites.

Ne pas supprimer automatiquement des pixels lorsque :

- le fond partage des couleurs avec le sprite ;
- les ombres sont peintes dans le fond ;
- plusieurs sprites se chevauchent ;
- les limites sont ambiguës ;
- le détourage risque de dégrader le contour.

Dans ces cas :

- conserver la source ;
- marquer l’asset comme `ambigu` ;
- produire un aperçu ;
- documenter l’intervention manuelle minimale nécessaire.

Ne pas prétendre qu’un détourage est propre sans l’avoir inspecté visuellement.

### Animations

Lorsqu’une planche contient une animation :

- identifier les lignes, colonnes, directions et états ;
- conserver un nombre de frames explicite ;
- normaliser toute la séquence avec une échelle commune ;
- utiliser un ancrage commun ;
- ne pas générer ou corriger chaque frame indépendamment si cela provoque une dérive ;
- produire un aperçu de l’animation ou une planche de contrôle ;
- valider le résultat dans Phaser avant de l’ajouter au manifeste final.

### Manifeste

Les chemins de fichiers ne doivent pas constituer l’API publique du jeu.

Le manifeste doit exposer des clés lisibles, par exemple :

```json
{
  "building.house.small.01": {
    "path": "images/sprites/processed/buildings/house-small-01.png",
    "anchor": [0.5, 1],
    "nativeSize": [192, 224],
    "worldScale": 1
  }
}
```

Ne pas utiliser des références opaques telles que `frame-42` ou `sprite-87` lorsqu’une identité fonctionnelle peut être donnée.

### Validation du pipeline

Avant d’intégrer les assets :

1. générer les sprites traités ;
2. générer les planches contact ;
3. inspecter les transparences, contours, dimensions et ancrages ;
4. tester un échantillon dans Phaser à l’échelle réelle ;
5. corriger les erreurs systématiques ;
6. relancer le pipeline ;
7. seulement ensuite mettre à jour le manifeste utilisé par le jeu.

Ne pas commencer par générer une grande quantité de nouveaux sprites.

Identifier d’abord le kit minimal nécessaire à une scène statique convaincante.

## Étape 3 — scaffold

Créer une base Vite + TypeScript strict avec :

- Phaser 3 ;
- React ;
- Vitest ;
- Playwright ;
- scripts de développement, build, test et test visuel ;
- seed configurable par URL ;
- API de debug `window.__village`.

Architecture cible :

```text
src/
├── app/
├── domain/
├── simulation/
├── content/
├── game/
├── assets/
├── ui/
└── debug/
```

La simulation ne doit importer ni Phaser ni React.

Le renderer ne doit pas être la source de vérité.

L’interface React ne doit pas contenir de règles de simulation.

## Étape 4 — premier milestone visuel

Construire une scène statique attractive avant toute simulation complexe.

La scène doit inclure au minimum :

- terrain principal ;
- eau ou limite naturelle si prévue par les références ;
- chemins ;
- bâtiments principaux ;
- arbres et végétation ;
- props ;
- environ douze habitants immobiles ou en idle ;
- ombres cohérentes ;
- profondeur correcte ;
- caméra cadrée ;
- composition suffisamment dense pour évoquer un village vivant.

Le village doit occuper la majorité de l’écran.

Ne pas utiliser des formes procédurales génériques comme remplacement final des sprites.

Ne pas construire l’interface principale définitive tant que sa direction détaillée n’a pas été ajoutée à `VISION.md`.

Une interface temporaire minimale est autorisée uniquement pour :

- debug ;
- pause ;
- affichage de la seed ;
- déclenchement des états de capture.

## Validation visuelle obligatoire

Pour le premier milestone :

1. lancer le projet ;
2. ouvrir la scène dans un navigateur réel ;
3. produire des captures en 1280 × 720, 1440 × 900 et 1920 × 1080 ;
4. comparer explicitement les captures aux références ;
5. écrire une courte revue dans `docs/VISUAL_REVIEW.md` ;
6. corriger les principaux écarts ;
7. produire une seconde série de captures ;
8. lancer le build et les tests.

Ne pas considérer le milestone terminé après une seule passe.

## Critères de réussite du premier milestone

- la capture ressemble à un jeu, pas à une démo technique ;
- la scène donne envie d’observer le village ;
- les sprites partagent une perspective cohérente ;
- les habitants sont visibles et identifiables ;
- la composition n’est ni vide ni surchargée ;
- les bâtiments structurent naturellement la scène ;
- le village occupe l’espace principal ;
- aucune interface de type dashboard ne domine l’image ;
- les captures sont reproductibles avec une seed fixe ;
- le build et les tests passent.

## Suite prévue

Après validation de la scène statique seulement :

1. ajouter idle, marche et activités simples ;
2. ajouter sélection, suivi et panneau contextuel ;
3. ajouter journal et premier POV ;
4. ajouter la propagation scriptée de la Doctrine de la Mie ;
5. vérifier que les transformations visuelles passent par des directives génériques.

## Limite actuelle sur l’interface

La description détaillée de l’écran principal n’est pas encore finalisée.

Ne pas inventer une architecture UI définitive sur la seule base des fonctionnalités attendues.

Préparer des composants découplés et une surface DOM légère, mais attendre le cadrage dédié pour figer :

- placement du HUD ;
- panneau habitant ;
- journal ;
- navigation ;
- contrôles permanents ;
- transitions entre vue globale, suivi et POV.

## Compte rendu attendu

À la fin de chaque milestone, fournir :

- résumé des modifications ;
- fichiers créés ou modifiés ;
- commandes exécutées ;
- liens ou chemins des captures ;
- résultats des tests ;
- analyse visuelle concise ;
- limites restantes ;
- prochaine étape logique.
