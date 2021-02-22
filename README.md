# CoreComponentsAngular aka "Bao"

Une librairie de composantes angular aux couleurs de la ville! Elle est basée sur la [boîte à outils v4](https://services.montreal.ca/boite-outils4/)

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
3. Si la spécification existe sur confluence, lire la spécification et la suivre à la lettre.
4. Produire le component conformément au niveau de qualité et avec l'approche de Material Angular (https://material.angular.io/).
4.1 La pull-request doit contenir une story storybook documentant l’utilisation de la nouvelle composante.
5. Mettre le component en PR et se conformer aux demandes de changements.
6. Une fois la PR approuvé et mergé, le code sera en release candidate.
7. Une fois approuvé par les UX il y aura une release et une documentation officielle (https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).
8. Upgrader la version de la lib où nécessaire et apprécier un travail bien fait et standard qui sera utiliser par tous!
