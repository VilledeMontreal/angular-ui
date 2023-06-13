[English](CONTRIBUTING.md)

# 🦦 Comment contribuer

Cette librairie est l’un des projets open source de la Ville de Montréal. Elle est utilisé pour les services en ligne que vous pouvez accéder à [montreal.ca](https://montreal.ca).

## [Code de conduite](http://ville.montreal.qc.ca/pls/portal/docs/page/intra_fr/media/documents/code_conduite_employes.pdf)

Les participants aux projets doivent souscrire au code de conduite que la Ville de Montréal a adopté. Veuillez lire [le texte intégral](http://ville.montreal.qc.ca/pls/portal/docs/page/intra_fr/media/documents/code_conduite_employes.pdf) afin de comprendre quelles actions seront ou ne seront pas tolérées.

## Développement ouvert

Tous les travaux sur cette librairie se font directement sur [GitHub] (/). Les membres de l'équipe principale et les contributeurs externes envoient des demandes "Pull request" qui passent par le même processus de révision.

## 👩‍💻 Contribuer à la librairie

0. Vous devez "fork" le projet si vous n'ëtes pas familier avec ce processus vous pouvez suivre [cet article](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
1. Regarder si la composante existe déjà ou si quelqu'un travaille déjà sur celle-ci.
2. Si la spécification n'existe pas, demander à l'équipe UX de la produire.
3. Si la spécification existe sur [Confluence](https://confluence.montreal.ca/pages/viewpage.action?pageId=121599367), lire la spécification et la suivre à la lettre.
4. Produire la composante conformément au niveau de qualité et avec l'approche de [Material Angular](https://material.angular.io/).
5. La pull-request doit contenir les tests afin de garantir que la composante fonctionne, mais aussi éviter les regressions pour les futurs modifications à la librairie.
6. La pull-request doit contenir une story storybook documentant l’utilisation de la nouvelle composante.
7. Mettre la composante en PR et se conformer aux demandes de changements.
8. Une fois la PR approuvée par au moins deux des mainteneurs, le travail est terminé! Une nouvelle version de la librairie est sur le point d'être publiée!
9. Mettre à jour la version de la librairie où c'est nécessaire, apprécier un travail bien fait et standard qui sera utilisé par tous 💗 !

### 🤯 `master` est dangereux

Nous ferons de notre mieux pour garder la branche `master` en bonne forme, avec des tests. Mais pour aller vite, nous allons faire des changements d’API. Ces changements pourraient ne pas être compatible avec votre application. Nous ferons de notre mieux pour communiquer ces modifications et toujours disposer de la version appropriée afin que vous puissiez verrouiller une version spécifique si besoin est.

### Github

Ma PR traite les demandes suivantes de Github et les référence dans le titre de ma PR. Par exemple, "feat(scope): #XXX My PR"
Si vous corrigez une faute de frappe dans la documentation, vous pouvez l'ajouter à votre commit avec docs(scope): xxxx #XXX. Les modifications de code nécessitent toujours une demande Github.

#### La description

Voici quelques détails sur ma PR, y compris des captures d'écran de toutes les modifications apportées à l'interface utilisateur:

- Clarifiez la documentation.
- Pas de changements d'interface utilisateur.

#### Tests

Ma PR ajoute les tests unitaires suivants OU n'a pas besoin de test pour cette très bonne raison:

- Ce n'est qu'un simple changement de documentation.

#### Commits

Mon commit référence dans le sujet la demande Github (recommandé),
et j'ai **écrasé** plusieurs commits s'ils traitent la même chose.
De plus, mes commits suivent les instructions de ["Comment rédiger un bon message de validation git"](https://www.conventionalcommits.org/fr/v1.0.0-beta.3)

#### Documentation

En cas de nouvelle fonctionnalité, ma PR ajoute une documentation décrivant son utilisation.

## Certificat d'origine du développeur (DCO)

Pour accepter vos demandes, nous devons vous soumettre un DCO. Il vous suffit d'ajouter l'option de ligne de commande `-s` pour l'ajouter automatiquement à votre message de validation.
[Plus de détails](https://github.com/probot/dco)
