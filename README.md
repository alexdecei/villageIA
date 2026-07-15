# Village IA

Prototype de jeu de gestion et d’observation sociale dans lequel une petite civilisation d’agents autonomes vit, discute et développe progressivement ses propres cultures, croyances et symboles.

Le projet est actuellement au stade de **vertical slice visuel**.

Le premier objectif n’est pas d’intégrer de véritables agents LLM, mais de construire une scène navigateur cohérente, vivante et suffisamment modulaire pour accueillir ultérieurement le moteur d’agents.

---

## Documents du projet

* [`VISION.md`](./VISION.md) : vision produit et principes de conception.
* [`prompt.md`](./prompt.md) : mission détaillée confiée à Fable.
* `HANDOFF.md` : documentation de transmission, à produire après l’implémentation du prototype.

Une image de référence visuelle doit également être fournie à Fable.

Elle constitue la référence principale pour :

* la direction artistique ;
* le niveau de détail ;
* les proportions ;
* les volumes ;
* les couleurs ;
* la densité de la scène ;
* le traitement des personnages et des bâtiments.

---

## Objectif du prototype

Produire une démonstration navigateur de deux à cinq minutes dans laquelle le joueur peut :

* observer un petit village ;
* voir une douzaine d’habitants vivre et se déplacer ;
* comprendre certaines interactions sociales ;
* sélectionner et suivre un habitant ;
* consulter ses pensées et relations principales ;
* passer dans un premier mode POV ;
* lire un journal synthétique ;
* observer une idée culturelle se propager ;
* voir cette propagation modifier certains signes du village.

Le scénario de démonstration utilisé est la montée progressive de la **Doctrine de la Mie**.

Ce scénario sert à valider un système générique de propagation culturelle. Le moteur ne doit contenir aucune règle spécifiquement liée au pain ou aux boulangers.

---

## Stack privilégiée

* TypeScript
* Vite
* React
* Phaser
* HTML / CSS
* État local léger
* Simulation déterministe avec seed
* Assets stockés localement

Phaser est la solution recommandée pour la scène du village, mais ce choix peut être challengé si une autre technologie répond manifestement mieux aux besoins du prototype.

Le projet ne doit nécessiter aucune API externe pour fonctionner.

---

## Structure du dépôt

```text
villageIA/
├── prompt.md          # mission du vertical slice
├── VISION.md          # vision produit
├── HANDOFF.md         # documentation de transmission (architecture réelle)
├── images/reference.png
├── package.json
├── index.html
└── src/
```

---

## Installation

Les commandes ci-dessous correspondent à la structure attendue d’un projet Vite.

```bash
npm install
```

---

## Lancement en développement

```bash
npm run dev
```

L’adresse locale est affichée dans le terminal, généralement :

```text
http://localhost:5173
```

---

## Build de production

```bash
npm run build
```

Le résultat doit être généré dans :

```text
dist/
```

---

## Prévisualisation du build

```bash
npm run preview
```

---

## Tests

Lorsque des tests sont disponibles :

```bash
npm run test
```

Le prototype doit au minimum vérifier :

* la reproductibilité de la simulation avec une seed identique ;
* la validité des événements produits ;
* la validité des directives visuelles ;
* l’absence de couplage direct entre la simulation et Phaser ;
* le bon fonctionnement du build.

Fable doit adapter cette section si les scripts réellement configurés diffèrent.

---

## Architecture réelle

```text
src/
├── domain/types.ts        # contrats partagés, sérialisables (directives visuelles incluses)
├── simulation/
│   ├── rng.ts             # RNG seedé (mulberry32)
│   ├── engine.ts          # VillageSim — tick fixe, déterministe
│   └── systems/           # movement, behavior, conversation, culture, scenario
├── content/               # data pure : carte, habitants, culture et scénario de la Mie
│   ├── map.ts
│   ├── villagers.ts
│   ├── cultures/mie.ts
│   └── scenarios/mie.ts
├── rendering/
│   ├── palette.ts         # direction artistique
│   ├── directives.ts      # garde-fous des directives visuelles
│   └── phaser/            # scène, carte procédurale, vues des habitants
├── app/runtime.ts         # instance sim + store UI (ni React ni Phaser)
└── ui/                    # React : barre du temps, journal, panneau habitant, POV
```

Détails complets (contrats, compromis, intégration LLM) dans [`HANDOFF.md`](./HANDOFF.md).

La seed de démonstration peut être changée via l'URL : `http://localhost:5173/?seed=1234`.

---

## Principes d’architecture

### Simulation

La simulation gère notamment :

* positions ;
* destinations ;
* activités ;
* relations ;
* influence ;
* propagation culturelle ;
* événements ;
* état civilisationnel.

Elle ne doit importer ni Phaser ni React.

### Rendu Phaser

Phaser gère :

* scène ;
* caméra ;
* sprites ;
* animations ;
* profondeur ;
* interactions avec le monde ;
* transformations visuelles.

Il ne doit pas décider de la signification narrative des symboles ou des événements.

### Interface React

React gère notamment :

* panneau d’un habitant ;
* journal ;
* contrôles temporels ;
* commandes de suivi ;
* mode POV ;
* informations contextuelles.

Les composants React ne doivent pas contenir les règles de simulation.

### Contenu

Le contenu regroupe :

* habitants ;
* dialogues ;
* scénarios ;
* cultures ;
* symboles ;
* événements narratifs.

La Doctrine de la Mie doit être définie dans cette couche.

### Futurs agents LLM

Les agents LLM devront ultérieurement produire des objets structurés :

* intentions ;
* décisions ;
* dialogues ;
* réactions ;
* croyances ;
* directives visuelles.

Ils ne devront jamais manipuler directement Phaser, React, le DOM ou les coordonnées graphiques.

---

## Direction artistique

La scène doit évoquer :

* une miniature vivante ;
* un petit terrarium ;
* un monde doux et coloré ;
* une société autonome ;
* un univers légèrement mystérieux.

Références complémentaires :

* Terra Nil
* Littlewood
* Let’s Build a Zoo
* Dorfromantik

L’image fournie avec le projet prime sur ces références textuelles.

À éviter :

* réalisme ;
* vraie 3D complexe ;
* interface sombre ;
* esthétique cyberpunk ;
* dashboards ;
* grands tableaux ;
* multiplication des fenêtres ;
* surcharge visuelle ;
* effets coûteux sans utilité.

---

## Philosophie bac à sable

Le moteur doit proposer des moyens d’expression génériques.

Il peut permettre de :

* choisir un symbole ;
* afficher un emoji ;
* appliquer une couleur ;
* appliquer une palette ;
* ajouter un panneau ;
* afficher un slogan ;
* ajouter une bannière ;
* modifier un accessoire ;
* ajouter une décoration ;
* afficher une réaction temporaire ;
* modifier légèrement une ambiance.

Il ne doit pas déterminer ce que ces éléments signifient.

Exemples d’associations à ne pas hardcoder :

* une couleur correspond à une idéologie ;
* un emoji correspond obligatoirement à une émotion ;
* un bâtiment correspond à un régime ;
* un métier produit nécessairement une culture ;
* un symbole déclenche automatiquement une mécanique.

---

## Scénario de démonstration

Le scénario doit rester déterministe et reproductible.

Déroulement attendu :

1. le village fonctionne normalement ;
2. un habitant lié à la boulangerie attribue une valeur symbolique au pain ;
3. quelques habitants proches entendent cette idée ;
4. certains reprennent progressivement son vocabulaire ;
5. un symbole commence à circuler ;
6. l’influence du groupe augmente ;
7. un signe durable apparaît dans le village ;
8. un petit rassemblement se forme ;
9. le journal annonce l’apparition de la Doctrine de la Mie ;
10. certains habitants adhèrent tandis que d’autres restent sceptiques.

La simulation doit utiliser les mêmes primitives génériques que pour n’importe quelle future culture.

---

## Périmètre du vertical slice

### Inclus

* une scène compacte ;
* environ douze habitants ;
* déplacements ;
* activités simples ;
* conversations ;
* réactions visuelles ;
* sélection ;
* suivi ;
* premier mode POV ;
* journal ;
* pause et vitesses ;
* propagation culturelle scriptée ;
* transformations visuelles génériques ;
* simulation avec seed ;
* build fonctionnel.

### Hors périmètre

* véritable LLM ;
* orchestrateur multi-agent ;
* mémoire vectorielle ;
* backend ;
* base de données ;
* authentification ;
* sauvegarde cloud ;
* multijoueur ;
* espion humain ;
* monde persistant ;
* actualités réelles ;
* économie complète ;
* système politique complet ;
* révolution ;
* combat ;
* génération procédurale complexe ;
* éditeur de carte ;
* version mobile dédiée.

---

## Critères de réussite

Le prototype est considéré comme réussi lorsque :

* le projet se lance localement ;
* le build fonctionne ;
* la scène est lisible immédiatement ;
* le village semble vivant ;
* les habitants sont suffisamment identifiables ;
* les conversations importantes sont compréhensibles ;
* un habitant peut être sélectionné et suivi ;
* le mode POV modifie les informations accessibles ;
* la Doctrine de la Mie se propage progressivement ;
* les transformations utilisent un système générique ;
* la simulation est reproductible ;
* l’interface ressemble à un jeu ;
* le dépôt peut être repris par Codex sans réécriture totale.

---

## Transmission attendue

Après l’implémentation, Fable doit compléter ou créer un fichier `HANDOFF.md` contenant :

* l’architecture réellement mise en place ;
* les principaux contrats TypeScript ;
* le fonctionnement de la simulation ;
* le fonctionnement des directives visuelles ;
* les éléments scriptés ;
* les compromis ;
* les limites ;
* les décisions graphiques ;
* les prochaines étapes ;
* le point d’intégration prévu pour l’orchestrateur LLM.

Fable doit également mettre à jour ce `README.md` afin qu’il corresponde exactement aux commandes et à l’architecture finales.

---

## Principe directeur

> Le moteur contrôle la forme.
> Les futurs agents contrôlent le sens.
> Le joueur observe les conséquences.
