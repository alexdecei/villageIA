# Village IA — Vision produit et cadre du vertical slice

## 1. Pitch

Village IA est un jeu de gestion et d’observation sociale dans lequel le joueur suit une petite civilisation composée d’agents autonomes.

Les habitants vivent, travaillent, discutent, nouent des relations et s’influencent mutuellement. À terme, leurs décisions, dialogues, souvenirs et croyances seront partiellement produits par des modèles de langage.

Le joueur ne contrôle pas directement chaque habitant. Il observe le village, intervient ponctuellement et tente de maintenir sa civilisation suffisamment stable pour qu’elle survive dans le temps.

> Un Tamagotchi civilisationnel peuplé de petites intelligences capables de construire leurs propres cultures, croyances, symboles et dérives collectives.

## 2. État actuel du projet

Le projet est au stade de **vertical slice visuel**.

L’objectif actuel n’est pas de construire le jeu complet ni d’intégrer de véritables agents LLM. Il consiste à produire une scène navigateur attractive, vivante, lisible et techniquement saine, qui pourra ensuite accueillir progressivement :

- une simulation plus riche ;
- des agents LLM ;
- un orchestrateur multi-agent ;
- une persistance locale ou distante ;
- des systèmes sociaux, culturels et politiques.

Le premier livrable doit d’abord prouver que le village donne envie d’être observé.

## 3. Promesse centrale

Le principal intérêt du jeu ne vient pas seulement du fait que les habitants puissent parler.

Il vient de leur capacité à :

- interpréter les événements ;
- influencer les autres ;
- créer des récits collectifs ;
- faire émerger des groupes ;
- transformer leur manière de parler ;
- donner un sens culturel à des symboles ;
- modifier progressivement l’apparence du village ;
- produire des conséquences que le joueur n’avait pas prévues.

Une idée locale peut devenir une habitude, une mode, un dogme, une institution ou une révolution.

Le village construit progressivement son propre contexte culturel à partir de son histoire.

## 4. Fantasme du joueur

Le joueur observe le village depuis une position supérieure, sans que le jeu le définisse explicitement comme un dieu.

Il peut être perçu selon les habitants comme :

- une présence ;
- une autorité ;
- une force extérieure ;
- une abstraction ;
- un phénomène naturel ;
- une entité invisible ;
- quelque chose qu’ils ne comprennent pas.

Le joueur doit ressentir :

- de la curiosité ;
- de l’attachement ;
- de la responsabilité ;
- un pouvoir réel mais imparfait ;
- l’envie d’expérimenter ;
- la crainte de provoquer une dérive incontrôlable.

Il influence davantage qu’il ne contrôle.

## 5. Boucle de jeu cible

### Observer

Le joueur regarde les habitants :

- se déplacer ;
- travailler ;
- discuter ;
- se rapprocher ;
- entrer en conflit ;
- partager des idées ;
- former des groupes.

### Comprendre

Le joueur consulte de manière contextuelle :

- les pensées d’un habitant ;
- ses relations ;
- son humeur ;
- ses croyances ;
- les événements récents ;
- le journal du village ;
- les évolutions culturelles en cours.

### Intervenir

À terme, le joueur pourra notamment :

- répondre à une demande ;
- favoriser ou limiter une activité ;
- transmettre une consigne ;
- modifier une règle ;
- donner ou retirer une ressource ;
- influencer une personne ou un groupe ;
- provoquer un événement.

### Constater les conséquences

Les habitants peuvent :

- accepter ;
- refuser ;
- détourner ;
- interpréter ;
- amplifier ;
- oublier ;
- ritualiser ;
- politiser ;
- transformer une intervention.

### Maintenir la civilisation

Le joueur tente de faire durer une société instable, capable de connaître :

- tensions ;
- pénuries ;
- conflits ;
- factions ;
- désobéissance ;
- chaos ;
- révolution ;
- effondrement.

## 6. Proposition différenciante

Village IA n’est pas simplement un jeu de gestion doté de dialogues génératifs.

Sa spécificité est de simuler une société d’agents capables de modifier progressivement leur propre contexte culturel.

Exemple :

1. quelques boulangers attribuent une importance excessive au pain ;
2. leurs voisins reprennent certaines expressions ;
3. leur influence sociale augmente ;
4. le symbole du pain apparaît dans différents lieux ;
5. le discours collectif change ;
6. une Doctrine de la Mie se forme ;
7. critiquer le pain devient progressivement suspect ;
8. la société peut finir par devenir une théocratie du pain.

Cette dérive ne doit pas être codée comme une mécanique spéciale liée au pain.

Le moteur doit pouvoir représenter de manière générique n’importe quelle évolution produite par les agents.

## 7. Piliers de conception

### Observer avant de contrôler

Le village doit rester intéressant lorsque le joueur ne fait rien.

### Pouvoir imparfait

Une intervention ne doit pas toujours produire une conséquence directe et prévisible.

### Émergence lisible

Le joueur doit pouvoir reconstituer approximativement :

- d’où vient une idée ;
- qui l’a propagée ;
- pourquoi elle a été adoptée ;
- quels groupes la soutiennent ;
- comment elle transforme le village.

### Attachement individuel

Chaque habitant doit être reconnaissable grâce à quelques éléments simples :

- nom ;
- apparence ;
- métier ;
- traits ;
- relations ;
- manière de parler ;
- ambition ;
- peur ;
- souvenirs marquants.

### Liberté sémantique

Le moteur fournit des moyens d’expression, mais ne décide pas de leur sens.

Une couleur, un symbole, un emoji, un accessoire ou un bâtiment ne possède pas de signification culturelle universelle codée dans le moteur.

### Lisibilité avant exhaustivité

L’interface ne montre pas toutes les données internes. Elle sélectionne ce qui mérite l’attention du joueur.

### Mystère discret

Le monde peut suggérer qu’une réalité plus vaste existe, mais sans l’expliquer complètement.

## 8. Direction artistique

La scène doit évoquer :

- une miniature vivante ;
- un petit terrarium ;
- un monde doux et coloré ;
- une société autonome ;
- un univers légèrement mystérieux ;
- un lieu que l’on a envie d’observer longtemps.

Références complémentaires :

- Terra Nil ;
- Littlewood ;
- Let’s Build a Zoo ;
- Dorfromantik ;
- Tunic pour la lisibilité des volumes et la sensation de maquette.

Les images placées dans `images/references/` constituent la référence visuelle principale et priment sur les descriptions textuelles.

### À éviter

- réalisme ;
- vraie 3D complexe ;
- esthétique sombre ou cyberpunk ;
- apparence de dashboard SaaS ;
- gros panneaux permanents ;
- surcharge d’indicateurs ;
- village vide ;
- agitation visuelle constante ;
- sprites aux perspectives incompatibles ;
- mélange de styles graphiques ;
- rectangles procéduraux utilisés comme assets finaux ;
- emojis flottants utilisés comme direction artistique principale.

## 9. Interface de l’écran principal

La direction détaillée de l’écran principal doit être définie dans une prochaine passe dédiée avant l’implémentation complète de l’interface.

Cette définition devra préciser au minimum :

- composition générale de l’écran ;
- place exacte du village ;
- éléments persistants ;
- éléments contextuels ;
- panneau habitant ;
- journal ;
- contrôles temporels ;
- navigation entre vue globale, suivi et POV ;
- priorités d’information ;
- comportement des panneaux ouverts et fermés ;
- références visuelles d’interface ;
- états de l’écran selon les interactions ;
- densité maximale acceptable.

Tant que cette section n’est pas complétée, Codex peut préparer l’architecture UI et produire une scène statique, mais ne doit pas inventer librement une interface principale définitive.

## 10. Évolution visuelle émergente

Les agents doivent pouvoir agir indirectement sur l’apparence du village à travers des directives structurées.

Le système pourra représenter :

- symboles ;
- couleurs ;
- palettes ;
- panneaux ;
- bannières ;
- slogans ;
- accessoires ;
- décorations ;
- réactions temporaires ;
- modifications d’ambiance ;
- signes ajoutés aux bâtiments.

Les futurs agents ne manipulent jamais directement Phaser, React, le DOM, les coordonnées ou les sprites.

Le moteur graphique reçoit une intention contrôlée, applique des garde-fous, puis la traduit dans la scène.

Les garde-fous contrôlent :

- taille ;
- densité ;
- emplacement ;
- contraste ;
- durée ;
- superposition ;
- fréquence ;
- performances.

Ils ne contrôlent pas la signification narrative du contenu.

## 11. Objectif du vertical slice

Produire une démonstration navigateur de deux à cinq minutes dans laquelle le joueur peut :

- observer un petit village ;
- voir environ douze habitants vivre et se déplacer ;
- comprendre certaines interactions sociales ;
- sélectionner et suivre un habitant ;
- consulter ses pensées et relations principales ;
- passer dans un premier mode POV ;
- lire un journal synthétique ;
- observer une idée culturelle se propager ;
- voir cette propagation modifier certains signes du village.

Le scénario de démonstration est la montée progressive de la **Doctrine de la Mie**.

Il sert à valider un système générique de propagation culturelle. Le moteur ne doit contenir aucune règle spécifiquement liée au pain ou aux boulangers.

## 12. Ordre de réalisation

### Milestone 1 — scène statique attractive

Créer et valider visuellement :

- terrain ;
- eau ;
- chemins ;
- bâtiments ;
- végétation ;
- personnages immobiles ;
- ombres ;
- profondeur ;
- cadrage caméra ;
- densité générale.

Critère de réussite : une capture statique doit déjà donner envie de lancer le jeu.

### Milestone 2 — village vivant

Ajouter :

- idle ;
- marche ;
- déplacements ;
- activités simples ;
- petites conversations ;
- regroupements ;
- caméra libre.

### Milestone 3 — interactions d’observation

Ajouter :

- sélection d’un habitant ;
- panneau contextuel ;
- suivi caméra ;
- contrôles temporels ;
- journal discret ;
- premier mode POV.

### Milestone 4 — propagation culturelle

Ajouter :

- scénario déterministe ;
- diffusion progressive d’une idée ;
- réactions ;
- symboles ;
- signe durable ;
- rassemblement ;
- évolution visuelle du village.

## 13. Périmètre inclus

- scène compacte ;
- environ douze habitants ;
- déplacements ;
- activités simples ;
- conversations ;
- réactions visuelles ;
- sélection ;
- suivi ;
- premier mode POV ;
- journal ;
- pause et vitesses ;
- propagation culturelle scriptée ;
- transformations visuelles génériques ;
- simulation avec seed ;
- build fonctionnel ;
- tests essentiels ;
- captures de validation.

## 14. Hors périmètre actuel

- véritable LLM ;
- orchestrateur multi-agent ;
- mémoire vectorielle ;
- backend ;
- base de données ;
- authentification ;
- sauvegarde cloud ;
- multijoueur ;
- espion humain ;
- monde persistant ;
- actualités réelles ;
- économie complète ;
- système politique complet ;
- révolution complète ;
- combat ;
- génération procédurale complexe ;
- éditeur de carte ;
- version mobile dédiée.

## 15. Stack cible

- TypeScript strict ;
- Vite ;
- Phaser 3 pour le monde ;
- React pour le HUD et les panneaux ;
- HTML/CSS pour les interfaces ;
- Vitest pour les tests unitaires ;
- Playwright pour les tests navigateur et captures ;
- état local léger ;
- simulation déterministe avec seed ;
- assets stockés localement ;
- aucune API externe requise pour fonctionner.

## 16. Architecture cible

```text
src/
├── app/                 # runtime et composition globale
├── domain/              # contrats sérialisables
├── simulation/          # état et règles du monde, sans Phaser ni React
├── content/             # habitants, carte, scénarios et cultures
├── game/                # Phaser : scènes, caméra, sprites, input, rendu
├── assets/              # manifestes et catalogues
├── ui/                  # React : HUD, journal, panneaux, POV
└── debug/               # outils de pilotage et diagnostic
```

### Simulation

La simulation possède :

- positions ;
- destinations ;
- activités ;
- relations ;
- influence ;
- propagation culturelle ;
- événements ;
- état civilisationnel.

Elle ne doit importer ni Phaser ni React.

### Phaser

Phaser gère :

- scène ;
- caméra ;
- sprites ;
- animations ;
- profondeur ;
- interactions avec le monde ;
- transformations visuelles.

Il lit l’état observable et ne contient pas la logique narrative.

### React

React gère :

- panneau d’un habitant ;
- journal ;
- contrôles temporels ;
- commandes de suivi ;
- mode POV ;
- informations contextuelles.

Les composants React ne contiennent pas les règles de simulation.

### Contenu

Le contenu regroupe :

- habitants ;
- dialogues ;
- scénarios ;
- cultures ;
- symboles ;
- événements narratifs.

Une nouvelle culture doit pouvoir être ajoutée sans modifier le moteur générique.

### Futurs agents LLM

Les futurs agents produiront des objets structurés :

- intentions ;
- décisions ;
- dialogues ;
- réactions ;
- croyances ;
- directives visuelles.

Ils ne manipuleront jamais directement le renderer ou le DOM.

## 17. Assets

Structure attendue :

```text
images/
├── references/
│   ├── visual-direction/
│   └── main-screen-ui/
└── sprites/
    ├── characters/
    ├── buildings/
    ├── vegetation/
    ├── terrain/
    ├── water/
    ├── props/
    ├── ui/
    └── fx/
```

Chaque famille de sprites doit partager :

- la même perspective ;
- la même échelle logique ;
- les mêmes règles d’ancrage ;
- une direction de lumière cohérente ;
- une résolution cohérente ;
- une palette compatible ;
- des conventions de nommage stables.

Les noms de fichiers ne doivent pas devenir l’API publique du jeu. Un manifeste d’assets doit fournir des clés stables.

## 18. Vérification visuelle

Toute tâche graphique doit suivre cette boucle :

1. lancer le serveur ;
2. ouvrir la scène dans un navigateur réel ;
3. capturer l’état avant modification ;
4. effectuer un incrément limité ;
5. capturer l’état après modification ;
6. comparer le résultat aux références ;
7. effectuer une seconde passe de correction ;
8. vérifier le build et les tests.

Captures minimales :

- scène initiale ;
- habitant sélectionné ;
- caméra en suivi ;
- POV ;
- journal ouvert ;
- propagation intermédiaire ;
- transformation finale.

Viewports de référence :

- 1280 × 720 ;
- 1440 × 900 ;
- 1920 × 1080.

## 19. Critères de réussite

Le vertical slice est réussi lorsque :

- le projet se lance localement ;
- le build fonctionne ;
- la scène est lisible immédiatement ;
- une capture statique est visuellement convaincante ;
- le village semble vivant ;
- les habitants sont suffisamment identifiables ;
- les conversations importantes sont compréhensibles ;
- un habitant peut être sélectionné et suivi ;
- le mode POV modifie les informations accessibles ;
- la Doctrine de la Mie se propage progressivement ;
- les transformations utilisent un système générique ;
- la simulation est reproductible ;
- l’interface ressemble à un jeu et non à un outil métier ;
- l’architecture permet une intégration future des agents LLM.

## 20. Principe directeur

> Le moteur contrôle la forme.  
> Les agents produisent le sens.  
> Le joueur observe les conséquences.
