[Français](README_FR.md)

# ✨ Angular UI ✨

Angular components in the colors of the city!

Do you code with style? Are you contributing to open source? Yes? Okay, you rock! 🎸 If not, we can help you get started with [documentation, demos, and guides](https://zeroheight.com/575tugn0n/p/261b21-avant-utilisation)!

## Goal

The goal of this library is to facilitate the creation of Angular SPA visually conforming to [UX](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system).

## Installation and configuration of the library in your projects

1. Install `@villedemontreal/angular-ui`

   `npm i @villedemontreal/angular-ui`

2. Install peerDependency `@angular/cdk` (same MAJOR as `@angular/cli`)

   `npm i @angular/cdk@^15.0.0`. _For angular 14 use ^14.0.0, for angular 13 ^13.0.0 ..._

3. Add style `global.scss` in `angular.json`

```
...
"styles": [
  ...
  "./node_modules/@villedemontreal/angular-ui/global.scss"
],
...
```

4. Import `BaoModule` like

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

- Code examples are available [here](https://services.interne.montreal.ca/bao-storybook).
- The design system documentation is available [here](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system). This explains which components to use depending on the context.

## Versionning

| Angular UI Version                  | Angular Version                        |
| ----------------------------------- | -------------------------------------- |
| @villedemontreal/angular-ui@^13.0.0 | Angular 13. Compatible avec Angular 12 |
| @villedemontreal/angular-ui@^14.0.0 | Angular 14                             |
| @villedemontreal/angular-ui@^15.0.0 | Angular 15                             |
| @villedemontreal/angular-ui@^16.0.0 | Angular 16                             |
| @villedemontreal/angular-ui@^17.0.0 | Angular 17                             |

📢 We don't use semver in releases since `major` is for Angular release to make it easier for you to understand and manage releases. We recommend using `~` and not `^` on versions such as `~15.3.0` (_MAJOR.MINOR.PATCH_) and not `^15.3.0`, because we reserve the right to make breaking changes ☝️ in components in `minor` releases. `~` to automatically update `patches`.

## Design philosophy

### Composition rather than configuration

When possible we want to leave the developer free to compose the content of their component as they wish.
On the other hand, we must follow the recommendations of the [design system](https://zeroheight.com/575tugn0n/p/139208-ville-de-montral-design-system). This means that it is preferable to be able to inject content into the component via `<ng-content></ng-content>` tags rather than having an endless list of `@Input` allowing to have the desired display/behavior.
The general idea is to use the `@Input()` for everything that is the component 'state' and the 'child-components' for everything that is content.

### 🧙‍♂️ Limit dependencies

In order to make the library easy to use in our various projects, we try to limit our external dependencies as much as possible.

## Build

To launch the build run the command

`npm run build`

this will generate a build in dist/angular-ui

## Run Storybook

Storybook is an interactive documentation, it allows to show in action the different components as well as to document their operation. To view the storybook locally, run the command

`npm run storybook`

This will start a local web server and point your default browser to the local storybook page.

**warning** you must have completed the build of the library beforehand.

## 🦦 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more details on our code of conduct and the application submission process.

## License

This project is licensed under the MIT license - see the [LICENSE](LICENSE) file for details
