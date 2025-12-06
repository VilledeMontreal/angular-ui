# ✨ Angular UI ✨

Une librairie de composantes Angular aux couleurs de la ville!

Codes-tu avec style ? Oui ? OK, "you rock"! 🎸 Sinon, nous pouvons t'aider à démarrer avec [la documentation, les démos et les guides](https://zeroheight.com/575tugn0n/p/261b21-avant-utilisation)!

## Objectif

L'objectif de cette librairie est de faciliter la création de SPA angular visuellement conforme au [UX](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).

## Installation et configuration de la librairie dans vos projets

1. Installer la librairie `@villedemontreal/angular-ui`

   `npm i @villedemontreal/angular-ui`

2. Installer la peerDependency `@angular/cdk` (attention il faut installer la même MAJOR que votre `@angular/cli`)

   `npm i @angular/cdk@^15.0.0`. _Pour angular 14 utilisez la version ^14.0.0, pour angular 13 ^13.0.0 ... (vous avez compris)_

3. Ajouter la feuille de style `global.scss` (contient la définition des fonts à utiliser) dans le fichier `angular.json`

```
...
"styles": [
  ...
  "./node_modules/@villedemontreal/angular-ui/global.scss"
],
...
```

4. Importer `BaoModule` dans votre module principal

```
...
import { BaoModule } from '@villedemontreal/angular-ui';
...
imports: [
    ...
    BaoModule,
    ...
  ],
...
```

## 🍿 Documentation

- Une documentation sur l'utilisation des composantes de la librairie avec des exemples de code est disponible [ici](https://services.interne.montreal.ca/bao-storybook). Le site de documentation est construit avec l'outil [Storybook](https://storybook.js.org/)
- La documentation du _Ville de Montréal Design System_ est disponible [ici](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system). Celle-ci explique quelles composantes utiliser selon le contexte.

## Versionning

| Angular UI Version                  | Version d'Angular                      |
| ----------------------------------- | -------------------------------------- |
| @villedemontreal/angular-ui@^13.0.0 | Angular 13. Compatible avec Angular 12 |
| @villedemontreal/angular-ui@^14.0.0 | Angular 14                             |
| @villedemontreal/angular-ui@^15.0.0 | Angular 15                             |
| @villedemontreal/angular-ui@^16.0.0 | Angular 16                             |
| @villedemontreal/angular-ui@^17.0.0 | Angular 17                             |
| @villedemontreal/angular-ui@^18.0.0 | Angular 18                             |
| @villedemontreal/angular-ui@^19.0.0 | Angular 19                             |

📢 Nous n'utilisons pas semver dans les versions étant donné que la `majeur` est destinée à la version d'Angular afin de faciliter votre compréhension et la gestion des versions. Nous recommandons d'utiliser `~` et non `^` sur les versions comme par exemple `~15.3.0` (_MAJEUR.MINEUR.CORRECTIF_) et non `^15.3.0`, car nous nous reservons le droit de faire des ruptures ☝️ dans le support de composants dans les versions `mineur`. `~` permettant de mettre à jour automatiquement les `correctifs`.

## Philosophie de design

### De la composition plutôt que de la configuration

Lorsque possible nous voulons laisser le développeur libre de composer le contenu de sa composante comme il le souhaite.
Par contre, nous recommandons de suivre les recommandations du [sytème de design de la Ville de Montréal](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).
Ceci veut dire qu'il est préférable de pouvoir injecter du contenu dans la composante via des balises `<ng-content></ng-content>` plutôt que d'avoir une liste interminable de `@Input` permettant d'avoir l'affichage/comportement désiré.
L'idée générale est d'utiliser les `@Input()` pour tout ce qui est 'state' de la composante et les 'child-components' pour tout ce qui est contenu.

### 🧙‍♂️ Limiter les dépendances

Afin de rendre la librairie facile à utiliser dans nos différents projets nous tentons de limiter au maximum nos dépendances externes.

## Build de la librairie

Pour lancer le build de la librairie exécuter la commande

`npm run build`

ceci génèrera un build de la librairie dans dist/angular-ui

## Lancer Storybook

Storybook est une documentation interactive de la librairie, elle permet de montrer en action les diffèrentes composantes ainsi que de documenter leur fonctionnement. Pour visualiser le storybook localement, exécutez la commande

`npm run storybook`

Ceci démarrera un serveur web local et fera pointer votre browser par défaut pointant vers la page du storybook local.

**Attention** il faut avoir complété le build de la librairie au préalable.

## 🦦 Contribuer

Veuillez lire [CONTRIBUTING.md](CONTRIBUTING_FR.md) pour plus de détails sur notre code de conduite et sur le processus de soumission des demandes.

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails
