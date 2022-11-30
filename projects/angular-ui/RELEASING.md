# Releasing @villedemontreal/angular-ui package

This document explains how to publish the package at version x.y.z. Ensure that you’re following semver when choosing a version number.

## Publish Process

Update to latest locally to ensure you’re on the latest commit. Make sure you have no unstaged changes.

### Releasing on master/main branch

Run:

```batch
npm version --no-git-tag-version x.y.z
cd projets/angular-ui
npm version x.y.z
git tag vx.y.z
```

Next,

```batch
git commit -am "ci(release): vx.y.z"
git push --tags or git push origin vx.y.z
```

Next,

```batch
git push
```

Next, go to https://github.com/VilledeMontreal/angular-ui/releases and create a "draft new release".
Select your tag vx.y.z and "Generate release notes", next check "Set as the latest release" and "Publish release". In the "Actions" panel, you should see that the workflow "vx.y.z publish NPM package" is triggered
