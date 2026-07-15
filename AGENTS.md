# AGENTS.md — Village IA

## Rôle

Tu agis comme un développeur de jeu senior orienté produit, spécialisé dans les jeux navigateur 2D.

Tu dois construire un vertical slice visuellement convaincant, simple à reprendre et préparé pour une future intégration d’agents LLM.

Le résultat n’est pas une démonstration technique. Le front et la scène constituent le produit actuel.

## Sources de vérité

Lire avant toute modification :

1. `VISION.md` pour la vision produit, le périmètre et l’architecture cible ;
2. `PROMPT.md` pour la mission initiale et l’ordre de réalisation ;
3. les images présentes dans `images/references/` pour la direction artistique ;
4. les sprites présents dans `images/sprites/` pour les assets disponibles.

Les références visuelles priment sur les formulations textuelles lorsqu’elles sont plus précises.

Ne pas considérer un ancien `HANDOFF.md`, un prototype précédent ou du code hérité comme fiable sans vérification.

## Utilisation de Game Studio

Utiliser le plugin Game Studio comme routeur général.

Pour les tâches spécialisées, utiliser en priorité :

- `web-game-foundations` pour les frontières d’architecture ;
- `phaser-2d-game` pour la scène Phaser ;
- `game-ui-frontend` pour le HUD et les panneaux React ;
- `sprite-pipeline` pour la normalisation et l’intégration des sprites ;
- `game-playtest` pour les tests navigateur, captures et revues visuelles.

Conserver un plan cohérent entre architecture, UI, assets et playtests.

## Stack

- TypeScript strict ;
- Vite ;
- Phaser 3 pour le monde ;
- React pour le HUD et les panneaux ;
- HTML/CSS pour l’interface ;
- Vitest ;
- Playwright ;
- assets locaux ;
- aucune API externe requise au runtime.

Toute nouvelle dépendance doit répondre à un besoin clair et rester légère.

## Architecture non négociable

### Simulation

`src/simulation/` :

- possède l’état du monde et les règles ;
- ne dépend jamais de Phaser, React ou du DOM ;
- utilise un tick fixe ;
- utilise un RNG seedé unique ;
- n’utilise jamais `Math.random()` ;
- produit un état sérialisable ;
- reste indépendante du framerate.

### Domaine

`src/domain/` :

- contient les contrats partagés ;
- ne dépend d’aucun framework ;
- ne contient que des structures sérialisables ;
- sert de frontière entre simulation, rendu, contenu et UI.

### Contenu

`src/content/` :

- contient la carte, les habitants, les scénarios et les cultures ;
- importe uniquement le domaine et des utilitaires purs ;
- contient le sens narratif ;
- permet d’ajouter une culture sans modifier le moteur générique.

### Monde Phaser

`src/game/` :

- gère scènes, sprites, caméra, profondeur, animations et input ;
- lit l’état observable ;
- ne devient jamais la source de vérité ;
- ne contient pas les règles narratives ;
- ne modifie l’état qu’au travers d’actions explicites.

### Interface React

`src/ui/` :

- gère HUD, journal, panneaux et POV ;
- ne contient aucune règle de simulation ;
- communique via un runtime ou un store explicite ;
- reste contextuelle et discrète.

### Assets

`src/assets/` :

- expose un manifeste avec des clés stables ;
- sépare personnages, environnement, interface et effets ;
- ne laisse pas les chemins de fichiers se répandre dans le code.

## Priorité actuelle

L’ordre de réalisation est obligatoire :

1. scène statique attractive ;
2. village vivant ;
3. interactions d’observation ;
4. propagation culturelle.

Ne pas implémenter une simulation complexe tant que la scène statique n’a pas été validée visuellement.

Ne pas transformer le premier milestone en chantier de gameplay ou d’architecture exhaustive.

## Travail visuel obligatoire

Pour toute tâche concernant le rendu ou l’interface :

1. lancer ou réutiliser le serveur de développement ;
2. ouvrir la route réelle dans le navigateur ;
3. capturer l’état avant modification ;
4. effectuer un incrément limité ;
5. capturer l’état après modification ;
6. analyser explicitement les écarts par rapport aux références ;
7. effectuer une seconde passe de correction ;
8. vérifier les viewports concernés ;
9. lancer le build et les tests disponibles.

Ne jamais conclure une tâche UI en se basant uniquement sur le code.

Si le navigateur ou les captures ne sont pas disponibles, le signaler clairement et ne pas présenter le rendu comme validé.

## Critères visuels

Le village doit :

- occuper la majorité de l’écran ;
- évoquer une miniature ou un terrarium vivant ;
- être doux, coloré et lisible ;
- avoir une composition claire ;
- présenter des habitants identifiables ;
- utiliser une perspective et une échelle cohérentes ;
- conserver une densité maîtrisée ;
- limiter les éléments UI permanents.

L’interface doit :

- ressembler à une interface de jeu ;
- protéger le playfield ;
- privilégier les informations contextuelles ;
- éviter les grands panneaux ouverts en permanence ;
- utiliser une hiérarchie visuelle claire ;
- conserver un système graphique cohérent ;
- éviter l’apparence de dashboard SaaS.

## Interdits visuels

Ne pas utiliser comme solution finale :

- rectangles procéduraux en remplacement des sprites prévus ;
- mélange de perspectives ;
- sprites redimensionnés sans normalisation ;
- gros overlays opaques ;
- panneaux multiples concurrents ;
- texte trop petit ;
- emojis flottants sans support graphique cohérent ;
- couleurs arbitraires hors palette ;
- composants provenant visuellement de plusieurs design systems ;
- effets gratuits qui réduisent la lisibilité.

## Sprites et références

Avant d’intégrer un nouveau sprite :

- vérifier sa perspective ;
- vérifier son échelle ;
- vérifier son ancrage ;
- vérifier sa résolution ;
- vérifier sa compatibilité avec la lumière et la palette ;
- documenter sa clé dans le manifeste.

Ne pas générer ou ajouter massivement des assets sans avoir défini les familles nécessaires.

Ne pas remplacer silencieusement un sprite fourni par un asset improvisé.

## Déterminisme et debug

Le projet doit accepter une seed par URL, par exemple :

```text
?seed=1234
```

Prévoir une API de debug stable :

```ts
window.__village
```

Elle doit permettre au minimum :

- lecture de l’état ;
- pause et reprise ;
- changement de vitesse ;
- avance simulée ;
- sélection d’un habitant ;
- entrée et sortie du POV ;
- déclenchement contrôlé d’états de démonstration ;
- génération de captures reproductibles.

Les outils de debug ne doivent pas polluer l’interface finale.

## Tests

Avant de conclure une modification :

- lancer les tests concernés ;
- lancer le build ;
- vérifier la route réelle ;
- vérifier les captures pour toute modification visuelle.

Ajouter des tests pour :

- déterminisme ;
- événements ;
- directives visuelles ;
- contrats sérialisables ;
- séparation simulation/renderer ;
- scénarios principaux.

Ne pas prétendre avoir testé ce qui ne l’a pas été.

## Méthode de travail

Chaque itération doit être :

- petite ;
- testable ;
- compréhensible ;
- réversible ;
- directement utile.

En cas d’ambiguïté mineure, choisir l’option la plus simple et avancer.

En cas d’ambiguïté structurante sur la direction artistique, l’architecture ou l’interface principale, documenter brièvement les options et éviter une implémentation définitive fondée sur une supposition.

Ne pas cumuler plusieurs gros chantiers dans une seule modification.

Ne pas refactorer gratuitement.

Ne pas supprimer du code ou des assets non liés.

Ne pas utiliser de commande Git destructive sans demande explicite.

## Autonomie attendue

Tu peux décider sans demander :

- détails esthétiques mineurs compatibles avec les références ;
- organisation locale d’un composant ;
- refactors limités ;
- correctifs de responsivité ;
- ajout de tests liés au travail courant ;
- amélioration d’outils de debug.

Tu dois éviter d’agir sans cadrage lorsque cela implique :

- rupture d’un contrat du domaine ;
- changement de moteur ;
- changement majeur de perspective graphique ;
- modification du déterminisme ;
- ajout d’une dépendance lourde ;
- invention de l’interface principale avant sa définition ;
- déviation nette par rapport aux références.

## Compte rendu attendu

Après chaque tâche, indiquer :

- ce qui a été fait ;
- les fichiers modifiés ;
- les commandes exécutées ;
- les captures produites ;
- les écarts visuels encore présents ;
- les limites ou risques restants.

Répondre de manière concise et opérationnelle.
