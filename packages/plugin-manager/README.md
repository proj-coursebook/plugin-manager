# Plugin Manager

A minimal, type-safe plugin pipeline for JavaScript/TypeScript that handles the following:

- Sequential plugin execution
- Support for both synchronous and asynchronous plugins
- Error handling with detailed error messages
- Comprehensive logging of plugin operations
- Plugin lifecycle management (add/clear)
- **Functional pipeline:** Plugins transform and return new file collections (no mutation required)
- **Generic file data type:** Works with any file data structure

> [!TIP]
> Refer to this package's docs ([source](../../docs/index.md) or [website](https://proj-coursebook.github.io/plugin-manager/)) for how to use it.

## Features

- Written in TypeScript
- Builds to modern ES modules
- Provides TypeScript type definitions
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Minimal dependencies
- Can be used locally or published to NPM

## Development

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development:

   ```bash
   npm run dev
   ```

### Available Scripts

- `npm run build` - Build the package
- `npm run dev` - Run in development mode with watch
- `npm start` - Run the package
- `npm run debug` - Run with debugger attached
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Check code formatting 
- `npm run format:fix` - Format code with Prettier
- `npm run validate` - Run all checks (types, lint, format, tests)
- `npm run clean` - Clean the package (remove dist and coverage)
- `npm run clean:all` - Clean the package and all dependencies (remove dist, coverage, and node_modules)
- `npm run link` - Create a global link to the package
- `npm run release` - Create a new release (bump version, update changelog, create tag)

## Release & Publish Workflow

### Automated Versioning and Changelog

This package uses [`standard-version`](https://github.com/conventional-changelog/standard-version) to automate versioning and changelog updates. To create a new release:

1. Make sure all your changes are committed.

2. Run:

   ```bash
   npm run release
   ```

   This will:

   - Bump the version in `package.json` according to your commit messages (using [Conventional Commits](https://www.conventionalcommits.org/)).
   - Update `CHANGELOG.md` with a summary of changes.
   - Create a new Git tag for the release.

3. Push your changes and tags:

   ```bash
   git push && git push --tags
   ```

### Publishing to NPM via GitHub Actions

This repository is set up to publish the package to NPM automatically using GitHub Actions:

- **When does it publish?**
  - When you create a new GitHub Release (from the GitHub UI or by pushing a tag and creating a release), or
  - When you manually trigger the workflow from the GitHub Actions tab.

- **What does it do?**
  - Installs dependencies, runs all validation (type-check, lint, format, tests), builds the package, and publishes to NPM if all checks pass.

> [!NOTE]
> You must add your NPM token as a secret named `NPM_TOKEN` in your GitHub repository settings for publishing to work.
