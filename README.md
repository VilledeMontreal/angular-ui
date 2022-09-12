# ✨ angular-ui ✨

Une librairie de composantes Angular aux couleurs de la ville!

Codes-tu avec le style ? Oui ? OK, "you rock"! 🎸 Sinon, nous pouvons t'aider à démarrer avec [la documentation, les démos et les guides](https://zeroheight.com/575tugn0n/p/261b21-avant-utilisation)!

## Objectif

L'objectif de cette librairie est de faciliter la création de SPA angular visuellement conforme au [UX](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).

## Installation et configuration de la librairie dans vos projets

1. Configurer le dépôt npm en ajoutant un fichier .npmrc à la racine du projet contenant: ` registry=https://npm.registry.interne.montreal.ca`

2. Installer la librairie `@villedemontreal/angular-ui`

   `npm i @villedemontreal/angular-ui`

3. Installer la peerDependency `@angular/cdk` (attention il faut installer la même MAJOR que votre `@angular/cli`)

   `npm i @angular/cdk@^14.0.0`

4. Ajouter la feuille de style `globabl.scss` (contient la définition des fonts à utiliser) dans le fichier `angular.json`

```
...
"styles": [
  ...
  "./node_modules/@villedemontreal/angular-ui/global.scss"
],
...
```

5. Importer `BaoModule` dans votre module principal

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

## Documentation

- Une documentation sur l'utilisation des composantes de la librairie avec des exemples de code est disponible [ici](https://services.interne.montreal.ca/bao-storybook). Le site de documentation est construit avec l'outil [Storybook](https://storybook.js.org/)
- La documentation du _Ville de Montréal Design System_ est disponible [ici](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system). Celle-ci explique quelles composantes utiliser selon le contexte.

## Philosophie de design

### De la composition plutôt que de la configuration

Lorsque possible nous voulons laisser le développeur libre de composer le contenu de sa composante comme il le souhaite.
Par contre, nous recommandons de suivre les recommandations du [sytème de design de la Ville de Montréal](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).
Ceci veut dire qu'il est préférable de pouvoir injecter du contenu dans la composante via des balises `<ng-content></ng-content>` plutôt que d'avoir une liste interminable de `@Input` permettant d'avoir l'affichage/comportement désiré.
L'idée générale est d'utiliser les `@Input()` pour tout ce qui est 'state' de la composante et les 'child-components' pour tout ce qui est contenu.

### Limiter les dépendances

Afin de rendre la librairie facile à utiliser dans nos différents projets nous tentons de limiter au maximum nos dépendances externes (Voir [Dépendances](#dependances)).

## Build de la librairie

Pour lancer le build de la librairie exécuter la commande

`npm run build`

ceci génèrera un build de la librairie dans dist/angular-ui

## Lancer Storybook

Storybook est une documentation interactive de la librairie, elle permet de montrer en action les diffèrentes composantes ainsi que de documenter leur fonctionnement. Pour visualiser le storybook localement, exécutez la commande

`npm run storybook`

Ceci démarrera un serveur web local et fera pointer votre browser par défaut pointant vers la page du storybook local.

**Attention** il faut avoir complété le build de la librairie au préalable.

## Contribuer

Veuillez lire [CONTRIBUTING.md](CONTRIBUTING_FR.md) pour plus de détails sur notre code de conduite et sur le processus de soumission des demandes.

### Contribuer à la librairie

1. Regarder si le component existe déjà ou si quelqu'un travail déjà sur celui-ci.
2. Si la spécification n'existe pas, demander à l'équipe UX de la produire.
3. Si la spécification existe sur [Confluence](https://confluence.montreal.ca/pages/viewpage.action?pageId=121599367), lire la spécification et la suivre à la lettre.
4. Partir une branche a partir de master _(ouioui, a partir de master)_.
5. Produire le component conformément au niveau de qualité et avec l'approche de [Material Angular](https://material.angular.io/).
6. Faire une PR de la feature branch vers master _(ouioui, vers master)_.
7. La pull-request doit contenir les tests afin de garantir que la composante fonctionne, mais aussi éviter les regressions pour les futurs modifications à la librairie.
8. La pull-request doit contenir une story storybook documentant l’utilisation de la nouvelle composante.
9. Mettre le component en PR et se conformer aux demandes de changements.
10. Une fois la PR approuvé par au moins deux des maintainers, le travail est terminé! Une nouvelle version de la lib est sur le point d'être released!
11. Upgrader la version de la lib où nécessaire et apprécier un travail bien fait et standard qui sera utiliser par tous!

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails
