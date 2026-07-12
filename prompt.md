Tu travailles directement dans le dépôt fourni pour construire le socle visuel d’un jeu nommé provisoirement « The Village » ou « Village IA ».

Une image de référence visuelle est jointe au projet. Commence par l’examiner attentivement.

Cette image doit servir de référence principale pour :

* le niveau de détail ;
* les proportions générales ;
* la densité de la scène ;
* le traitement des bâtiments ;
* le traitement des personnages ;
* les volumes ;
* les ombres ;
* les palettes ;
* la sensation de miniature ;
* la lisibilité à l’échelle du village.

Les références textuelles données plus bas sont complémentaires. En cas de contradiction, privilégie l’image jointe plutôt qu’une interprétation générique des jeux cités.

Ne copie pas littéralement les assets ou la composition de l’image. Reprends sa logique visuelle pour produire une scène originale adaptée au projet.

Ne consacre pas une longue réponse à planifier ou expliquer ton approche. Inspecte le dépôt et l’image, prends des décisions raisonnables, implémente le prototype, ouvre-le dans le navigateur, examine visuellement le résultat, puis améliore-le.

# 1. Vision générale

The Village est un jeu de gestion et d’observation sociale en 2D, vu du dessus ou en pseudo-isométrie.

Le joueur observe un petit village habité par des agents autonomes. À terme, ces agents seront contrôlés en partie par des LLM : ils auront des personnalités, des souvenirs, des relations, des croyances et pourront s’influencer mutuellement.

La particularité du projet est que les agents ne font pas seulement évoluer leurs comportements. Ils peuvent également transformer progressivement :

* leur manière de parler ;
* leurs symboles ;
* leurs couleurs ;
* leurs signes collectifs ;
* l’apparence du village ;
* leurs traditions ;
* leurs groupes ;
* leur représentation du monde.

Une croyance, un métier, une faction ou une idée peuvent progressivement influencer le langage et l’apparence du village.

Cette mission ne doit intégrer :

* aucun véritable LLM ;
* aucune API externe ;
* aucun backend ;
* aucun système multi-agent réel.

Elle doit construire une scène visuelle capable de recevoir plus tard ces comportements.

# 2. Objectif de cette mission

Créer un vertical slice visuel et interactif dans le navigateur.

La démo doit immédiatement transmettre les sensations suivantes :

* le village forme un petit monde autonome ;
* les habitants semblent poursuivre leur propre vie ;
* le joueur peut observer sans être obligé de tout contrôler ;
* les interactions sociales restent compréhensibles ;
* chaque agent peut devenir un personnage identifiable ;
* des idées et des signes peuvent se propager dans le village ;
* l’apparence du monde peut évoluer sans perdre sa cohérence visuelle ;
* l’interface ressemble à un jeu de gestion, pas à un dashboard professionnel.

La démo doit être intéressante à regarder pendant quelques minutes, même sans vraie intelligence artificielle.

La qualité de la scène principale, sa lisibilité et son potentiel d’évolution sont plus importants que la quantité de fonctionnalités.

# 3. Orientation technique

La piste privilégiée est :

* TypeScript ;
* Vite ;
* React pour l’interface HTML/CSS ;
* Phaser pour la scène du village ;
* état local léger ;
* simulation déterministe utilisant une seed ;
* assets locaux ;
* exécution entièrement dans le navigateur.

Phaser est recommandé parce qu’il facilite :

* la caméra ;
* le zoom ;
* les sprites ;
* les animations ;
* la profondeur d’affichage ;
* les interactions ;
* la boucle de rendu ;
* la gestion de plusieurs entités.

Ce choix peut néanmoins être challengé si, après inspection du projet, une autre solution est clairement plus pertinente pour ce vertical slice.

Ne change de technologie que pour une raison concrète et importante. N’utilise pas ce point comme prétexte pour consacrer une grande partie de la mission à comparer des frameworks.

L’interface React peut entourer ou recouvrir partiellement la scène, mais le village doit conserver la majorité de l’espace visible.

# 4. Séparation des responsabilités

Le projet doit maintenir une séparation claire entre :

## Rendu

Le rendu affiche :

* le village ;
* les habitants ;
* leurs déplacements ;
* leurs interactions ;
* les transformations visuelles ;
* les symboles ;
* les réactions ;
* les états visibles.

## Simulation

La simulation gère :

* les positions ;
* les destinations ;
* les activités ;
* les relations ;
* les niveaux d’influence ;
* les événements ;
* la propagation factice d’une idée ;
* les évolutions d’état.

## Futurs agents IA

Les futurs agents IA produiront plus tard :

* des décisions ;
* des intentions ;
* des réactions ;
* des dialogues ;
* des croyances ;
* des directives visuelles structurées.

Ils ne devront jamais manipuler directement :

* Phaser ;
* le DOM ;
* les coordonnées graphiques ;
* les sprites ;
* les composants React.

La scène doit consommer un état observable et des directives structurées.

# 5. Direction artistique

La direction visuelle recherchée est une vue de dessus ou pseudo-isométrique, en 2D ou fausse 3D.

L’objectif n’est pas de construire une vraie scène 3D.

Le rendu doit évoquer :

* une miniature vivante ;
* un petit terrarium ;
* un monde autonome ;
* une scène douce et accueillante ;
* un espace que l’on a envie d’observer longuement ;
* une légère étrangeté difficile à définir.

Le monde est séparé du réel. Son lore ne doit pas être expliqué explicitement dans cette démo.

Le joueur occupe une position supérieure et observe le village, mais l’interface ne doit pas le désigner directement comme « Dieu ».

Les habitants peuvent occasionnellement sembler :

* regarder vers le haut ;
* s’interroger sur quelque chose d’invisible ;
* craindre une limite du monde ;
* attribuer une signification à une intervention extérieure.

Ces éléments doivent rester très discrets.

## Qualités visuelles recherchées

* douceur ;
* couleurs lisibles ;
* volumes simples ;
* ombres légères ;
* superpositions maîtrisées ;
* bâtiments identifiables sans réalisme ;
* personnages lisibles malgré leur petite taille ;
* environnement cohérent ;
* interface élégante et peu intrusive ;
* hiérarchie visuelle claire ;
* sensation d’activité sans saturation.

## Références complémentaires

* Terra Nil pour la douceur, les couleurs et les volumes suggérés ;
* Littlewood pour la simplicité et la lisibilité ;
* Let’s Build a Zoo pour la lecture d’un jeu de gestion 2D ;
* Dorfromantik pour la sensation de miniature harmonieuse.

Ces références servent à identifier des principes, pas à reproduire leurs assets, leurs environnements ou leur direction artistique exacte.

## À éviter

* interface sombre et technique ;
* esthétique cyberpunk ;
* réalisme ;
* vraie 3D complexe ;
* multiplication des fenêtres ;
* grands tableaux de statistiques ;
* personnages minuscules et indistincts ;
* village trop vide ;
* surcharge décorative ;
* effets lumineux envahissants ;
* animations coûteuses sans valeur fonctionnelle ;
* apparence d’un produit SaaS ;
* panneaux occupant une grande partie de l’écran ;
* utilisation excessive de texte directement sur la scène.

# 6. Composition générale de la scène

Construis une seule scène compacte.

Ne cherche pas à définir un monde complet ni une carte exhaustive.

La composition doit donner l’impression que :

* plusieurs activités peuvent se dérouler simultanément ;
* les habitants peuvent se croiser naturellement ;
* certains endroits favorisent les rassemblements ;
* la caméra peut observer le village dans son ensemble ;
* le joueur peut ensuite se rapprocher d’un individu ;
* le village reste lisible avec environ douze habitants.

La carte doit être suffisamment dense pour éviter l’impression d’un prototype vide, mais suffisamment aérée pour distinguer :

* les déplacements ;
* les conversations ;
* les rassemblements ;
* les changements visuels ;
* les personnages importants.

Le contenu précis de la carte doit être guidé par l’image de référence.

Ne surdéfinis pas inutilement :

* la nature du terrain ;
* la forme précise des bâtiments ;
* les détails environnementaux ;
* la disposition exacte des chemins ;
* les décorations.

Privilégie une composition cohérente avec l’image fournie et la sensation générale de petit village.

Le prototype doit néanmoins inclure quelques types de lieux distincts, dont au minimum :

* des habitations ;
* un lieu de production ou de travail ;
* un lieu collectif ;
* un lieu favorisant les échanges sociaux.

La fonction d’un lieu doit se comprendre visuellement, sans nécessiter une étiquette permanente.

# 7. Système d’assets modulaires

La scène doit être construite autour d’une bibliothèque visuelle modulaire.

Cette bibliothèque peut couvrir les familles suivantes :

* terrain ;
* environnement ;
* bâtiments ;
* personnages ;
* objets ;
* décorations ;
* symboles ;
* effets simples ;
* éléments d’interface.

Il n’est pas nécessaire de produire une liste exhaustive d’assets.

La priorité est de créer un système qui permette :

* de réutiliser les mêmes éléments ;
* de créer de la variété avec peu de ressources ;
* de recolorer certains composants ;
* d’ajouter ou retirer des décorations ;
* de modifier certaines apparences ;
* de superposer des signes visuels ;
* d’ajouter progressivement de nouveaux assets ;
* de transformer un lieu sans créer un sprite entièrement nouveau.

Les assets peuvent être :

* des sprites simples ;
* des SVG ;
* des formes composées ;
* des textures légères ;
* de petites illustrations originales.

Ils doivent être stockés localement.

Ne dépends pas d’assets distants pour faire fonctionner le prototype.

Si l’image de référence contient une DA complexe à reproduire, cherche une approximation cohérente et maîtrisée plutôt qu’une copie médiocre trop ambitieuse.

# 8. Philosophie bac à sable

Le moteur visuel doit rester générique.

Le cœur futur du projet consiste à laisser les IA produire des comportements, des cultures, des symboles, des groupes et des transformations imprévues.

Il ne faut pas inscrire dans le moteur des associations sémantiques rigides telles que :

* le pain correspond obligatoirement à une couleur ;
* une émotion correspond automatiquement à un emoji ;
* une croyance correspond à un type de bâtiment ;
* un régime politique correspond à une ambiance ;
* une faction possède toujours un symbole donné ;
* un symbole a une signification universelle ;
* une palette indique automatiquement qu’un groupe est dangereux ;
* un métier produit nécessairement une culture particulière.

Le prototype peut utiliser la « Doctrine de la Mie » comme scénario démonstratif, mais cette association doit rester du contenu de démonstration, pas une règle du moteur.

Le moteur fournit des moyens d’expression.

Il ne décide pas de leur signification.

# 9. Primitives visuelles génériques

Le système doit permettre à une future simulation ou à de futurs agents IA de demander des transformations génériques telles que :

* afficher un symbole ;
* choisir un symbole dans une bibliothèque disponible ;
* appliquer une couleur ;
* appliquer une palette ;
* recolorer une partie d’un asset compatible ;
* ajouter un signe à un bâtiment ;
* poser un emblème sur un support ;
* afficher un slogan court ;
* ajouter une bannière ;
* ajouter un panneau ;
* ajouter une décoration ;
* modifier l’apparence d’un personnage ;
* ajouter un accessoire simple ;
* modifier légèrement une ambiance ;
* afficher une réaction temporaire ;
* augmenter ou réduire la visibilité d’un signe ;
* retirer un élément devenu obsolète ;
* remplacer un symbole par un autre ;
* faire coexister plusieurs signes concurrents.

Ces actions doivent être traduites par le moteur graphique.

Les agents ne doivent pas connaître la structure exacte des sprites.

# 10. Directives visuelles structurées

Prépare une interface générique entre la future simulation IA et le rendu.

Une directive visuelle peut suivre un principe proche de :

```ts
type VisualDirective = {
  id: string;
  target:
    | { type: "villager"; id: string }
    | { type: "building"; id: string }
    | { type: "zone"; id: string }
    | { type: "village" };
  operation:
    | "add"
    | "update"
    | "replace"
    | "remove";
  visualType:
    | "symbol"
    | "palette"
    | "sign"
    | "banner"
    | "decoration"
    | "accessory"
    | "reaction"
    | "shortText"
    | "ambience";
  payload: {
    symbol?: string;
    colors?: string[];
    text?: string;
    intensity?: number;
    duration?: number;
    placement?: string;
  };
  persistence:
    | "temporary"
    | "persistent";
  priority: number;
};
```

Cette structure est une proposition.

Tu peux l’adapter si une autre modélisation est plus propre.

Le point important est de conserver :

* une cible ;
* une opération ;
* un type de rendu ;
* des paramètres contrôlés ;
* une durée ou une persistance ;
* une priorité ;
* une séparation entre intention et exécution.

Le système ne doit pas permettre à une IA de choisir librement :

* des coordonnées en pixels ;
* une taille illimitée ;
* un nombre arbitraire d’éléments ;
* un niveau de superposition incontrôlé ;
* du HTML ;
* du CSS ;
* un nom de fichier ou de sprite interne.

# 11. Utilisation des emojis

Les emojis constituent un vocabulaire visuel générique potentiellement très utile.

Ils peuvent représenter :

* des réactions ;
* des idées ;
* des symboles de groupes ;
* des emblèmes ;
* des signes culturels ;
* des objets symboliques ;
* des marques visibles dans le village ;
* des micro-interactions ;
* des pensées très courtes.

Le moteur ne doit pas interpréter automatiquement leur signification.

Par exemple :

* 🍞 ne signifie pas nécessairement « boulanger » ;
* ❤️ ne signifie pas obligatoirement « amour » ;
* ⚠️ ne signifie pas automatiquement « danger » dans la simulation ;
* 👁️ ne doit pas déclencher une mécanique précise par sa seule présence.

Leur sens vient du contexte produit par la simulation et par l’histoire du village.

Le moteur doit seulement savoir :

* afficher l’emoji ;
* le positionner sur un support autorisé ;
* le dimensionner ;
* l’associer à une entité ;
* contrôler sa durée ;
* contrôler sa densité ;
* éviter les chevauchements ;
* éventuellement l’intégrer à un support graphique cohérent.

## Usages recommandés dans le prototype

* réaction courte au-dessus d’un personnage ;
* symbole affiché sur un bâtiment ;
* petit emblème associé à un groupe ;
* pictogramme dans le journal ;
* pensée très courte ;
* marque temporaire pendant une interaction.

Les emojis ne doivent pas remplacer tous les dialogues ou toutes les informations du jeu.

# 12. Homogénéisation des emojis

Le choix définitif du rendu des emojis ne doit pas être figé trop tôt.

Compare rapidement les approches les plus simples et retiens celle qui fonctionne le mieux dans le prototype.

Les options peuvent inclure :

## Emoji natif

Pertinent pour :

* prototype rapide ;
* interface ;
* réactions temporaires ;
* tests de diversité.

## Banque cohérente

Par exemple :

* OpenMoji ;
* Twemoji ;
* Noto Emoji.

Cela peut améliorer :

* la cohérence entre navigateurs ;
* la stabilité du rendu ;
* l’intégration à la direction artistique ;
* la disponibilité en SVG ou PNG.

N’ajoute une dépendance ou une banque complète que si cela reste léger et utile au prototype.

## Support graphique commun

Un emoji peut être intégré dans :

* un médaillon ;
* une petite bulle ;
* un panneau ;
* une bannière ;
* un autocollant ;
* un pictogramme avec contour ;
* un support possédant une ombre cohérente.

Cette approche peut suffire à intégrer des emojis hétérogènes dans la DA.

## Assets spécifiques

Les symboles importants pourront plus tard disposer d’une version personnalisée.

Ne cherche pas à créer dès maintenant une version dessinée de chaque emoji possible.

Un système hybride est acceptable et probablement souhaitable.

# 13. Garde-fous graphiques

La liberté sémantique doit rester compatible avec une scène lisible.

Ajoute des garde-fous portant uniquement sur la forme, jamais sur la signification.

Les limites peuvent concerner :

* nombre maximal de réactions visibles simultanément ;
* fréquence des changements ;
* longueur maximale d’un slogan ;
* nombre maximal de symboles sur un bâtiment ;
* tailles minimales et maximales ;
* contraste ;
* marges ;
* zones autorisées ;
* durée des effets ;
* priorité d’affichage ;
* profondeur ;
* superpositions ;
* densité ;
* performances ;
* nettoyage des effets temporaires.

Le moteur peut par exemple :

* mettre en attente une directive ;
* remplacer une directive moins importante ;
* réduire la densité d’effets ;
* tronquer un texte ;
* déplacer automatiquement un symbole dans une zone valide ;
* regrouper plusieurs réactions ;
* refuser un rendu techniquement incompatible.

Il ne doit pas décider que le contenu demandé est culturellement, politiquement ou narrativement incohérent.

# 14. Évolution visuelle du village

Le village doit pouvoir évoluer visuellement en réponse à la simulation.

Une transformation peut être :

* immédiate ;
* progressive ;
* temporaire ;
* persistante ;
* locale ;
* globale ;
* discrète ;
* dominante ;
* concurrente avec une autre transformation.

Le caractère progressif est intéressant pour montrer la propagation d’une influence, mais il ne doit pas être imposé à tous les effets.

Le système doit principalement permettre :

* l’ajout ;
* la modification ;
* le remplacement ;
* la superposition contrôlée ;
* la suppression ;
* la restauration ;
* la coexistence de plusieurs influences.

Les transformations doivent rester réversibles dans le modèle de données.

Évite de modifier définitivement un sprite source pour représenter un état temporaire.

# 15. Habitants

Ajoute environ douze habitants visibles.

Chaque habitant doit être identifiable sans nécessiter un portrait détaillé.

Utilise une combinaison cohérente de variations telles que :

* silhouette ;
* coiffure ou couvre-chef ;
* couleur principale ;
* vêtement ;
* accessoire ;
* posture ;
* animation ;
* petit symbole contextuel.

Les variations doivent rester compatibles avec la direction artistique et la lisibilité à petite échelle.

Chaque habitant possède au minimum :

```ts
type VillagerState = {
  id: string;
  name: string;
  occupation: string;
  traits: string[];
  position: {
    x: number;
    y: number;
  };
  destination?: {
    x: number;
    y: number;
  };
  activity:
    | "idle"
    | "walking"
    | "working"
    | "talking"
    | "sleeping";
  mood: number;
  currentThought?: string;
  conversationId?: string;
  relations: Array<{
    villagerId: string;
    affinity: number;
  }>;
  culturalAffinities: Record<string, number>;
  influence: number;
  visualModifiers: string[];
};
```

Adapte le modèle si nécessaire, sans coupler les habitants à Phaser.

# 16. Animation et game feel

Les animations doivent être simples mais suffisantes pour donner vie à la scène.

Priorise :

* déplacement ;
* légère animation d’attente ;
* interaction ou discussion ;
* travail ;
* sommeil ;
* petite réaction ;
* rassemblement.

Cherche un mouvement doux et lisible.

Évite :

* les animations très détaillées ;
* les rigs complexes ;
* les effets permanents ;
* les mouvements trop rapides ;
* les personnages qui se superposent constamment ;
* les bulles suivant difficilement les personnages ;
* l’agitation artificielle de tous les habitants en même temps.

Tous les habitants n’ont pas besoin d’être constamment actifs.

Les temps calmes participent à la sensation d’un village crédible.

# 17. Conversations et interactions visibles

Les conversations doivent être compréhensibles sans recouvrir la scène de texte.

Utilise plusieurs niveaux de représentation :

## Interaction ambiante

Pour une interaction peu importante :

* orientation des personnages ;
* proximité ;
* petite animation ;
* réaction emoji ;
* symbole temporaire ;
* courte pensée.

## Conversation notable

Pour une interaction intéressante :

* courte bulle ;
* indication claire de l’émetteur ;
* quelques mots seulement ;
* possibilité de retrouver l’événement dans le journal.

## Événement important

Pour une transformation culturelle ou narrative :

* mise en valeur légère ;
* journal ;
* regroupement visible ;
* changement d’un signe ;
* évolution d’une palette ;
* nouvelle directive visuelle.

Ne montre pas les conversations complètes de tous les agents simultanément.

# 18. Scénario démonstratif

Le prototype doit contenir une évolution culturelle scriptée et reproductible.

La « Doctrine de la Mie » sert uniquement à démontrer le système générique.

Au commencement :

* le village fonctionne normalement ;
* les habitants utilisent peu de symboles collectifs ;
* les conversations sont variées ;
* aucune influence ne domine clairement.

Puis :

1. un habitant lié à la boulangerie commence à attribuer une valeur symbolique au pain ;
2. quelques voisins entendent cette idée ;
3. certains agents reprennent un mot, une expression ou un symbole ;
4. l’influence se propage principalement par proximité et conversation ;
5. un symbole lié à cette idée apparaît temporairement ;
6. un premier signe durable apparaît sur un lieu ;
7. quelques habitants adoptent une variante visuelle ou linguistique ;
8. un petit rassemblement se forme ;
9. le journal mentionne l’apparition de la « Doctrine de la Mie » ;
10. certains habitants restent neutres ou sceptiques.

Exemples de formulations utilisables :

* « La mie nous rassemble. »
* « Ils parlent encore de pain. »
* « Ce symbole apparaît un peu partout. »
* « Une journée sans pain est-elle vraiment une journée ? »
* « Je ne suis pas convaincu, mais tout le monde en parle. »
* « La Doctrine de la Mie gagne en influence. »

La propagation doit être progressive et visible, sans transformer immédiatement tout le village.

Le scénario doit utiliser les mêmes primitives génériques qui pourront plus tard représenter une autre culture, croyance ou faction.

Aucune fonction du moteur ne doit s’appeler spécifiquement :

* `spreadBreadReligion`;
* `applyBakeryCulture`;
* `makeBreadVillage`;
* ou équivalent.

Le contenu lié au pain doit être défini dans les données de démonstration.

# 19. Interface générale

L’interface doit rester claire, élégante et secondaire par rapport au village.

Hiérarchie recommandée :

1. scène du village ;
2. interactions entre habitants ;
3. évolution culturelle en cours ;
4. habitant sélectionné ;
5. journal ;
6. commandes temporelles.

Les composants HTML/CSS doivent être visuellement intégrés à la direction artistique.

Évite les cartes génériques blanches avec ombre utilisées comme composants SaaS sans adaptation.

Privilégie :

* formes simples ;
* fonds légèrement texturés ou teintés ;
* bordures discrètes ;
* typographie très lisible ;
* espacements généreux ;
* informations courtes ;
* transitions légères ;
* panneaux escamotables ou contextuels.

L’interface ne doit pas afficher toutes les données internes de la simulation.

# 20. Sélection d’un habitant

Le joueur doit pouvoir sélectionner un habitant directement dans la scène.

La sélection doit produire une indication visuelle claire mais discrète :

* halo ;
* contour ;
* cercle au sol ;
* petite élévation ;
* marque contextuelle.

La fiche de l’habitant peut présenter :

* nom ;
* métier ;
* activité ;
* humeur ;
* pensée actuelle ;
* quelques traits ;
* deux ou trois relations importantes ;
* affinités culturelles pertinentes ;
* niveau d’influence ;
* symboles actuellement portés ;
* commandes de suivi et de POV.

Ne transforme pas cette fiche en fiche RPG exhaustive.

La fiche doit aider à comprendre ce que vit l’agent maintenant.

# 21. Mode de suivi et POV

Ajoute un mode de suivi permettant de centrer la caméra sur l’habitant sélectionné.

Ajoute également un premier mode POV.

Dans ce mode :

* la caméra suit l’agent ;
* ses pensées deviennent prioritaires ;
* seules les paroles suffisamment proches sont affichées ;
* les événements globaux sont réduits ;
* les informations que cet agent ne connaît pas sont masquées ;
* la vue peut refléter légèrement sa subjectivité ;
* le joueur peut revenir facilement à la vue globale.

La subjectivité peut être suggérée par :

* une différence légère d’ambiance ;
* la mise en avant de certains personnages ;
* des pensées interprétatives ;
* une perception différente d’un même symbole ;
* un journal local très limité.

N’implémente pas de filtre graphique lourd ni de véritable changement complet de caméra.

Le but est principalement de démontrer une différence d’information et de perspective.

# 22. Journal

Le journal doit fournir une lecture synthétique des événements intéressants.

Il peut contenir :

* événement notable ;
* nouvelle relation ;
* propagation d’une idée ;
* apparition d’un symbole ;
* rassemblement ;
* changement culturel ;
* phrase mémorable ;
* réaction collective.

Le journal ne doit pas lister :

* chaque déplacement ;
* chaque tick ;
* chaque changement de destination ;
* chaque variation mineure d’humeur.

Chaque entrée peut inclure :

* heure ou période ;
* pictogramme facultatif ;
* phrase courte ;
* habitants concernés ;
* niveau d’importance.

Il doit rester compact et ne pas occuper la majorité de l’écran.

# 23. Contrôles

Implémente au minimum :

* déplacement de caméra ;
* zoom ;
* pause ;
* vitesse normale ;
* vitesse accélérée ;
* sélection d’un habitant ;
* suivi ;
* mode POV ;
* retour à la vue globale ;
* affichage ou masquage du journal si nécessaire.

Les contrôles doivent être faciles à découvrir.

Ne produis pas un écran complet d’aide ou de paramétrage.

# 24. Architecture du dépôt

Sépare clairement :

```text
src/
├── domain/
│   ├── villagers/
│   ├── village/
│   ├── events/
│   └── visual-directives/
├── simulation/
│   ├── engine/
│   ├── systems/
│   ├── scenarios/
│   └── seed/
├── rendering/
│   ├── phaser/
│   ├── adapters/
│   ├── sprites/
│   └── visual-directives/
├── ui/
│   ├── components/
│   ├── panels/
│   └── hooks/
├── content/
│   ├── villagers/
│   ├── dialogues/
│   ├── scenarios/
│   └── cultures/
└── assets/
```

Cette structure peut être légèrement adaptée si le dépôt existant possède déjà une organisation cohérente.

Principes impératifs :

* la simulation n’importe pas Phaser ;
* les composants React ne contiennent pas les règles de simulation ;
* Phaser ne décide pas de la signification narrative d’un symbole ;
* le scénario de démonstration reste dans le contenu ;
* les directives visuelles restent sérialisables ;
* une directive peut être sauvegardée puis rejouée ;
* la seed produit le même scénario ;
* le futur orchestrateur LLM pourra émettre les mêmes types de décisions.

# 25. Périmètre à ne pas dépasser

Ne construis pas :

* de véritable système LLM ;
* de mémoire vectorielle ;
* de backend ;
* de base de données ;
* d’authentification ;
* de sauvegarde cloud ;
* de multijoueur ;
* de monde persistant en arrière-plan ;
* de connexion aux actualités ;
* de génération procédurale complexe ;
* d’éditeur de carte ;
* de système économique complet ;
* de système politique complet ;
* de combat ;
* de révolution ;
* de météo complexe ;
* de version mobile dédiée ;
* de système exhaustif de création d’assets ;
* de personnalisation complète de chaque bâtiment ;
* de moteur universel de thèmes graphiques.

Une légère variation jour/nuit peut être ajoutée si elle est peu coûteuse, mais elle ne constitue pas une priorité.

# 26. Processus de réalisation

Travaille dans cet ordre :

1. inspecter le dépôt ;
2. examiner l’image de référence ;
3. identifier ses principes visuels ;
4. vérifier les commandes existantes ;
5. mettre en place l’architecture minimale ;
6. réaliser une première composition du village ;
7. créer ou intégrer les assets modulaires ;
8. ajouter les habitants ;
9. ajouter leurs déplacements et activités ;
10. ajouter la sélection et le suivi ;
11. ajouter les conversations et réactions ;
12. implémenter les directives visuelles génériques ;
13. construire le scénario de la Doctrine de la Mie ;
14. ajouter le journal ;
15. ajouter le mode POV ;
16. lancer le prototype dans le navigateur ;
17. examiner la scène à plusieurs niveaux de zoom ;
18. examiner la lisibilité avec douze habitants ;
19. comparer visuellement le résultat à l’image de référence ;
20. corriger les défauts majeurs de densité, composition, échelle et cohérence ;
21. vérifier les performances ;
22. exécuter le build ;
23. laisser le dépôt dans un état stable et exécutable.

Ne m’interromps pas pour demander des choix esthétiques mineurs.

Fais des choix cohérents avec :

* l’image jointe ;
* la philosophie bac à sable ;
* la faisabilité d’un prototype navigateur ;
* la transmission future à Codex.

# 27. Priorités en cas de temps ou de crédits limités

Priorité 1 :

* composition du village ;
* direction artistique ;
* qualité du rendu ;
* personnages visibles ;
* déplacements ;
* caméra.

Priorité 2 :

* conversations ;
* sélection ;
* suivi ;
* journal ;
* Doctrine de la Mie.

Priorité 3 :

* directives visuelles génériques ;
* emojis ;
* propagation culturelle ;
* POV.

Priorité 4 :

* cycle jour/nuit ;
* animations secondaires ;
* documentation approfondie ;
* tests additionnels ;
* polissage non essentiel.

Ne sacrifie pas la scène principale pour compléter toutes les fonctionnalités.

Une scène cohérente et mémorable vaut mieux qu’une longue liste de fonctionnalités peu abouties.

# 28. Critères d’acceptation

La mission est réussie lorsque :

* le projet s’installe et se lance avec des commandes documentées ;
* la scène fonctionne sans API externe ;
* la direction artistique est cohérente avec l’image de référence ;
* le village paraît suffisamment dense et vivant ;
* les éléments importants restent lisibles ;
* environ douze habitants peuvent être affichés sans confusion excessive ;
* les conversations importantes sont compréhensibles ;
* le joueur peut sélectionner et suivre un habitant ;
* le mode POV démontre une perception individuelle ;
* la Doctrine de la Mie se propage progressivement ;
* cette propagation utilise des mécanismes génériques ;
* des symboles ou réactions peuvent être affichés sans signification hardcodée ;
* les transformations visuelles restent contrôlées ;
* la simulation est déterministe ;
* Phaser, React et la simulation restent découplés ;
* le build réussit ;
* le résultat ressemble à un jeu et non à un dashboard.

# 29. Transmission à Codex

Lorsque le prototype fonctionne, ajoute uniquement une documentation concise.

## README.md

Inclure :

* installation ;
* lancement ;
* build ;
* contrôles ;
* description rapide de la démo ;
* stack réellement utilisée.

## HANDOFF.md

Inclure :

* architecture réelle ;
* principaux contrats TypeScript ;
* fonctionnement de la simulation déterministe ;
* fonctionnement des directives visuelles ;
* traitement des emojis retenu ;
* décisions graphiques principales ;
* rôle de l’image de référence ;
* éléments scriptés ;
* compromis ;
* limites ;
* emplacement prévu pour le futur orchestrateur LLM ;
* prochaines étapes recommandées pour Codex.

## Captures

Conserve quelques captures représentatives :

* vue globale initiale ;
* vue pendant la propagation culturelle ;
* habitant sélectionné ;
* mode POV.

Évite les longues explications théoriques.

La priorité absolue est un résultat visuel interactif, cohérent, transmissible et plaisant à observer.

# 30. Principe directeur final

Construire une scène de village visuellement douce, lisible et modulaire, dans laquelle une future population d’agents IA pourra produire des transformations culturelles et graphiques imprévues.

Le moteur doit contrôler la forme afin de garantir la lisibilité.

Les agents contrôleront plus tard le sens.

La direction artistique doit rester cohérente même lorsque les significations, les symboles, les couleurs, les groupes et les usages émergent librement.
