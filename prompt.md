# Mission — Vertical slice visuel de Village IA

Travaille directement dans le dépôt fourni.

Lis d’abord :

1. `VISION.md` ;
2. `README.md` ;
3. l’image de référence jointe.

L’image est la référence principale pour le niveau de détail, les proportions, la densité, les volumes, les couleurs et le traitement visuel général. `VISION.md` définit la philosophie produit et les principes à préserver.

Ne commence pas par une longue analyse. Inspecte le dépôt, implémente le prototype, ouvre-le dans le navigateur, évalue visuellement le résultat et corrige les défauts les plus importants.

## Objectif

Créer un vertical slice navigateur montrant un petit village autonome, vivant et agréable à observer.

Le prototype doit démontrer :

* une scène 2D vue du dessus ou pseudo-isométrique ;
* une direction artistique douce, colorée et cohérente avec l’image ;
* environ douze habitants visibles ;
* des déplacements et activités simples ;
* des conversations et rassemblements lisibles ;
* la sélection et le suivi d’un habitant ;
* un panneau individuel discret ;
* un premier mode POV ;
* un journal compact ;
* une transformation culturelle progressive du village.

Aucun véritable LLM, backend ou système multi-agent ne doit être intégré.

## Stack

La piste recommandée est :

* TypeScript ;
* Vite ;
* React pour l’interface ;
* Phaser pour la scène ;
* état local léger ;
* simulation déterministe avec une seed ;
* assets locaux.

Phaser peut être challengé uniquement si une autre solution apporte un avantage concret et immédiat pour ce prototype. Ne consacre pas de temps à une comparaison théorique de frameworks.

## Direction UI et artistique

Le village doit évoquer :

* une miniature vivante ;
* un petit monde autonome ;
* un terrarium doux et légèrement mystérieux ;
* une scène que l’on a envie d’observer ;
* un jeu de gestion, jamais un dashboard SaaS.

Le village doit occuper la majorité de l’écran.

L’interface doit rester secondaire, contextuelle et peu intrusive. Évite les grands panneaux, les tableaux de statistiques et l’affichage permanent de toutes les données.

Les fonctions des lieux et les activités des habitants doivent être compréhensibles principalement par le rendu et les comportements.

Utilise des volumes simples, des ombres légères, des superpositions maîtrisées et des personnages suffisamment distincts malgré leur petite taille.

Ne cherche pas à reproduire littéralement l’image de référence. Produis une scène originale qui reprend sa logique visuelle.

## Scène

Construis une seule carte compacte.

Elle doit contenir :

* des habitations ;
* un lieu de travail ou de production ;
* un lieu collectif ;
* un lieu favorisant les échanges sociaux ;
* suffisamment de décor pour éviter une impression de prototype vide.

Ne cherche pas à produire une carte complète, procédurale ou éditable.

La composition exacte doit être guidée par l’image de référence plutôt que par une liste trop rigide d’éléments environnementaux.

## Habitants

Ajoute environ douze habitants.

Chaque habitant possède au minimum :

* un nom ;
* un métier ;
* deux traits ;
* une humeur ;
* une activité ;
* une pensée actuelle ;
* quelques relations ;
* une affinité culturelle ;
* un niveau d’influence.

Ils doivent pouvoir :

* marcher ;
* attendre ;
* travailler ;
* discuter ;
* rejoindre un petit groupe ;
* dormir ou se retirer ;
* réagir à un événement scripté.

Ils doivent rester identifiables grâce à quelques variations simples : silhouette, couleur, vêtement, coiffure, accessoire ou animation.

Tous les habitants ne doivent pas être constamment actifs.

## Interactions

Implémente :

* déplacement et zoom de caméra ;
* pause ;
* vitesse normale et accélérée ;
* sélection directe d’un habitant ;
* suivi de l’habitant sélectionné ;
* panneau individuel ;
* retour à la vue globale ;
* bulles courtes pour les conversations importantes ;
* réactions visuelles légères ;
* journal chronologique compact.

Le panneau individuel doit privilégier la situation présente :

* nom ;
* métier ;
* activité ;
* humeur ;
* pensée ;
* traits ;
* relations importantes ;
* affinités culturelles pertinentes ;
* commandes de suivi et de POV.

Ne crée pas une fiche RPG exhaustive.

## Mode POV

Le mode POV doit modifier principalement les informations accessibles :

* caméra centrée sur l’habitant ;
* pensées de cet agent prioritaires ;
* conversations visibles seulement à proximité ;
* informations globales réduites ou masquées ;
* perception légèrement subjective ;
* retour simple à la vue globale.

Il n’est pas nécessaire de créer un nouveau moteur graphique ou un filtre visuel complexe.

## Scénario de démonstration

Utilise un scénario déterministe appelé « Doctrine de la Mie ».

Il sert uniquement à démontrer une propagation culturelle générique.

Déroulement attendu :

1. le village fonctionne normalement ;
2. un habitant lié à la boulangerie attribue une valeur symbolique au pain ;
3. quelques habitants proches entendent cette idée ;
4. certains reprennent progressivement son vocabulaire ou son symbole ;
5. l’influence du groupe augmente ;
6. un signe apparaît sur un lieu ou un personnage ;
7. un rassemblement se forme ;
8. le journal annonce la montée de la Doctrine de la Mie ;
9. certains habitants adhèrent ;
10. d’autres restent sceptiques.

Exemples de textes courts :

* « La mie nous rassemble. »
* « Ils parlent encore de pain. »
* « Ce symbole apparaît un peu partout. »
* « Je ne suis pas convaincu, mais tout le monde en parle. »
* « La Doctrine de la Mie gagne en influence. »

La transformation doit être progressive et facile à comprendre.

Aucune logique du moteur ne doit être spécifiquement codée pour le pain. Le scénario doit être défini comme du contenu remplaçable.

## Transformations visuelles génériques

Prépare un système permettant à une future simulation de produire des directives visuelles structurées.

Les primitives peuvent permettre :

* d’afficher un symbole ;
* d’afficher un emoji ;
* d’appliquer une couleur ou une palette ;
* d’ajouter un panneau, une bannière ou une décoration ;
* d’ajouter un accessoire à un personnage ;
* d’afficher un slogan court ;
* d’afficher une réaction temporaire ;
* de modifier légèrement une ambiance ;
* de retirer ou remplacer un élément.

Le moteur contrôle :

* la taille ;
* la position autorisée ;
* la densité ;
* les superpositions ;
* la durée ;
* le contraste ;
* les performances.

Il ne définit pas la signification culturelle des symboles, couleurs ou emojis.

Les futurs agents produiront le sens. Le moteur graphique contrôlera uniquement la forme.

Les emojis peuvent être natifs, issus d’une banque cohérente ou intégrés à un support visuel commun. Choisis la solution la plus pertinente pour ce prototype sans construire un système exhaustif.

## Architecture

Maintiens une séparation claire entre :

* domaine et types ;
* simulation ;
* contenu narratif ;
* adaptateur de rendu ;
* scène Phaser ;
* interface React ;
* assets.

Principes impératifs :

* la simulation n’importe pas Phaser ;
* React ne contient pas les règles de simulation ;
* Phaser ne décide pas du sens narratif ;
* les transformations visuelles sont sérialisables ;
* le scénario de la Mie reste dans le contenu ;
* une seed identique reproduit la démonstration ;
* un futur orchestrateur LLM pourra remplacer ou compléter la simulation sans réécrire l’interface.

Ne surarchitecture pas le prototype. Mets en place uniquement les abstractions nécessaires à une reprise propre.

## Hors périmètre

Ne construis pas :

* de véritable LLM ;
* de backend ;
* de base de données ;
* d’authentification ;
* de sauvegarde cloud ;
* de multijoueur ;
* de monde persistant ;
* de connexion aux actualités ;
* d’économie complète ;
* de politique complète ;
* de révolution ;
* de combat ;
* de génération procédurale complexe ;
* d’éditeur de carte ;
* de version mobile dédiée.

## Priorités

En cas de temps ou de crédits limités :

### Priorité 1

* qualité de la scène ;
* direction artistique ;
* composition ;
* caméra ;
* habitants ;
* déplacements.

### Priorité 2

* conversations ;
* sélection ;
* suivi ;
* journal ;
* propagation de la Doctrine de la Mie.

### Priorité 3

* transformations visuelles génériques ;
* réactions et symboles ;
* POV.

### Priorité 4

* cycle jour/nuit ;
* animations secondaires ;
* tests supplémentaires ;
* documentation détaillée.

Une scène cohérente et mémorable vaut mieux qu’une liste complète de fonctionnalités moyennes.

## Processus attendu

1. Inspecte le dépôt et les documents.
2. Analyse l’image de référence.
3. Construis une première version fonctionnelle.
4. Lance-la dans le navigateur.
5. Vérifie la composition, l’échelle et la densité.
6. Vérifie la lisibilité avec douze habitants.
7. Corrige les cinq défauts visuels ou ergonomiques les plus importants.
8. Vérifie la fluidité.
9. Exécute le build.
10. Laisse le dépôt dans un état stable.

Ne demande pas de validation pour les choix esthétiques mineurs.

## Livrables

Mets à jour `README.md` pour refléter les vraies commandes.

Crée un `HANDOFF.md` concis contenant :

* architecture réelle ;
* contrats importants ;
* fonctionnement de la simulation ;
* fonctionnement des directives visuelles ;
* traitement retenu pour les symboles et emojis ;
* éléments scriptés ;
* compromis ;
* limites ;
* point d’intégration du futur orchestrateur LLM ;
* prochaines étapes pour Codex.

Conserve quelques captures représentatives si l’environnement le permet.

La priorité absolue reste le prototype interactif et visuel.
