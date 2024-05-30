# Contributing

- [Getting Started: Backend \& Frontend](#getting-started-backend--frontend)
  - [Requirements](#requirements)
  - [First Setup](#first-setup)
  - [Run Unit Tests](#run-unit-tests)
- [Conventions](#conventions)
- [Release](#release)
  - [Versionning](#versionning)
    - [Breaking changes](#breaking-changes)
- [Maintenance](#maintenance)
  - [Updating icons](#updating-icons)
  - [Updating caniuse browserlist](#updating-caniuse-browserlist)
- [Notes](#notes)

## Getting Started: Backend & Frontend

### Requirements

- Debian-based Linux or macOS
- Node.js v20 (with npm v10)
- [Yarn 2+ (Yarn Modern)](https://yarnpkg.com/getting-started/install)

### First Setup

```sh
yarn
yarn prepare # Install Git hooks
```

### Run Unit Tests

You must have the Storybook running locally to run the E2E tests (`yarn dev`). You can then run the E2E tests with:

```sh
yarn test:unit
```

or:

```sh
yarn test:unit:watch
```

to run the tests in watch mode.

## Conventions

Please respect [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) messages as defined by Angular in
[their contributing documentation](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit).

## Release

The release process is automated, including versionning and release notes generation, using
[semantic-release](https://github.com/semantic-release/semantic-release).

1. Go to [Github Actions Release Workflow](https://github.com/MTES-MCT/monitor-ui/actions/workflows/release.yml)
2. Click on "Run workflow" > "Run workflow" ("Branch: main" should be selected by default).
3. ⚠️ This will generate a version pull request with a title looking like `ci(release): X.Y.Z`.  
   You **MUST** merge this pull request before merging new pull requests.  
   _Why? Because this PR include both the release notes and the new version from which later versions will be
   calculated._

### Versionning

In short, 'feat(...):' will generated minor versions and 'fix(...):' will generate patch versions.

#### Breaking changes

If you have to release a BREAKING CHANGE, you should look at the
[official documentation](https://www.conventionalcommits.org/en/v1.0.0/#commit-message-with-description-and-breaking-change-footer)
and you may look at this [pull request](https://github.com/MTES-MCT/monitor-ui/pull/131) as an example.

In the case of a BREAKING CHANGE, it's **strongly advised** to add an exclamation point before the colon in the commit
message, i.e.:

```sh
git commit -m "feat(fields)!: this prop has been removed"
git commit -m "feat!: all theses component props are now strings instead of numbers"
```

And **don't forget** the `BREAKING CHANGE: ...` in the commit message body.

## Maintenance

### Updating icons

1. Copy the new SVG icons in `src/assets/icons` folder
2. Run

```sh
yarn icons
```

to generate React components from the SVG icons.

### Updating caniuse browserlist

We
[should regularly update `browserlist` database](https://github.com/browserslist/browserslist#browsers-data-updating):

```sh
npx browserslist@latest --update-db
```

## Notes

We added `@babel/runtime` in `package.json` dependencies to fix this error:

```
@rsuite/icons tried to access @babel/runtime, but it isn't declared in its dependencies;
this makes the require call ambiguous and unsound.
```

We added `prop-types` in `package.json` dependencies to fix this error:

```
ModuleNotFoundError: Module not found: Error:
Can't resolve 'prop-types' in '.../monitor-ui/.yarn/__virtual__/.../@rsuite/icons/lib'
```
