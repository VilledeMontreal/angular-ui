# CoreComponentsAngular aka "Bao"

Une librairie de composantes angular aux couleurs de la ville! Elle est basée sur la [boîte à outils v4](https://services.montreal.ca/boite-outils4/)
[Documentation officiel de UX](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system)

## Objectif
L'objectif de cette librairie est de faciliter la création de SPA angular visuellement conforme au [Ville de Montréal Design System](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).

## Philosophie
### De la composition plutôt que de la configuration
Lorsque possible nous voulons laisser le développeur libre de composer le contenu de sa composante comme il le souhaite. 
Par contre, nous recommandons de suivre les recommandations du [Ville de Montréal Design System](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system). 
Ceci veut dire qu'il est préférable de pouvoir injecter du contenu dans la composante via des balises `<ng-content></ng-content>` plutôt que d'avoir une liste interminable de `@Input` permettant d'avoir l'affichage/comportement désiré.
L'idée générale est d'utiliser les `@Input()` pour tout ce qui est 'state' de la composante et les 'child-components' pour tout ce qui est contenu.

### Limiter les dépendances
Afin de rendre la librairie facile à utiliser dans nos différents projets nous tentons de limiter au maximum nos dépendances externes (Voir [Dépendances](#dependances)).

## Installation et configuration de la librairie dans vos projets
### Installer la librairie
`npm i @villemontreal/core-components-angular-lib`

## Documentation
Une documentation sur l'utilisation des composantes de la librairie avec des exemples de code est disponible [ici](https://services.interne.montreal.ca/bao-storybook).

Le site de documentation est contruit avec l'outil [Storybook](https://storybook.js.org/)

## Build de la librairie
Pour lancer le build de la librairie exécuter la commande 

`npm run build` 

ceci génèrera un build de la librairie dans dist/core-components-angular-lib

## Lancer Storybook
Storybook est une documentation interactive de la librairie, elle permet de montrer en action les diffèrentes composantes ainsi que de documenter leur fonctionnement. Pour visualiser le storybook localement, exécutez la commande 

`npm run storybook`

Ceci démarrera un serveur web local et fera pointer votre browser par défaut pointant vers la page du storybook local.

**Attention** il faut avoir complété le build de la librairie au préalable.

## Dépendances

Les seules dépendances sont [Angular](https://angular.io) et [Boîte à outil 4](https://services.montreal.ca/boite-outils4/) CSS.
Les versions supportées sont:

| @villemontreal/core-components-angular-lib | Angular | @villemontreal/boite-outils4-web |
|-|-|-|
| 1.x.x | >=8.0.0 < 11 | 4.x.x |

## Contribuer à la librairie

1. Regarder si le component existe déjà ou si quelqu'un travail déjà sur celui-ci.
2. Si la spécification n'existe pas, demander à l'équipe UX de la produire.
3. Si la spécification existe sur [Confluence](https://confluence.montreal.ca/pages/viewpage.action?pageId=121599367), lire la spécification et la suivre à la lettre.
4. Partir une branche a partir de master (ouioui, a partir de master).
5. Produire le component conformément au niveau de qualité et avec l'approche de [Material Angular](https://material.angular.io/).
6. Faire une PR de la feature branch vers master (ouioui, vers master).`
7. La pull-request doit contenir une story storybook documentant l’utilisation de la nouvelle composante.
8. Mettre le component en PR et se conformer aux demandes de changements.
9. Une fois la PR approuvé par au moins deux des maintainers, le travail est terminé! Une nouvelle version de la lib est sur le point d'être released!
10. Upgrader la version de la lib où nécessaire et apprécier un travail bien fait et standard qui sera utiliser par tous!
