# Plugin Manager

A minimal, type-safe plugin pipeline for JavaScript/TypeScript. Add, clear, and execute a sequence of synchronous or asynchronous plugins that transform and return new file collections—ideal for content processing, static site generation, and more.

**Features:**

- Written in TypeScript
- Builds to both modern ES modules and CommonJS formats
- Provides TypeScript type definitions
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing
- Tsup for building
- Minimal dependencies

## Installation

```bash
npm install @coursebook/plugin-manager
```

## Usage

A minimal, type-safe plugin pipeline for JavaScript/TypeScript. Add, clear, and execute a sequence of synchronous or asynchronous plugins that transform and return new file collections—ideal for content processing, static site generation, and more.

### Basic Usage

```typescript
import {
  PluginManagerImpl,
  type Plugin,
  type FileDataCollection,
} from "@coursebook/plugin-manager";

// Define your file data type
interface MyFileData {
  contents: Buffer;
  metadata?: Record<string, any>;
}

// Create plugin manager instance
const pluginManager = new PluginManagerImpl<MyFileData>();

// Define a plugin (must return a new file collection)
const myPlugin: Plugin<MyFileData> = (files) => {
  return {
    ...files,
    "example.txt": {
      ...files["example.txt"],
      contents: Buffer.from("modified content"),
    },
  };
};

// Add plugin to pipeline
pluginManager.addPlugin(myPlugin);

// Define files
const files: FileDataCollection<MyFileData> = {
  "example.txt": {
    contents: Buffer.from("original content"),
  },
};

// Run plugins (returns the transformed collection)
const result = await pluginManager.runPlugins(files);
console.log(result["example.txt"].contents.toString()); // Output: "modified content"
```

### Async Plugin Example

```typescript
const asyncPlugin: Plugin<MyFileData> = async (files) => {
  // Perform async operations
  const newContent = await someAsyncOperation();
  return {
    ...files,
    "example.txt": {
      ...files["example.txt"],
      contents: Buffer.from(newContent),
    },
  };
};
```

### PluginManager Interface

```typescript
interface PluginManager<T> {
  addPlugin(plugin: Plugin<T>): void;
  runPlugins(files: FileDataCollection<T>): Promise<FileDataCollection<T>>;
  clearPlugins(): void;
}
```

### Plugin Type

```typescript
type Plugin<T> = (
  files: FileDataCollection<T>
) => Promise<FileDataCollection<T>> | FileDataCollection<T>;
```

### Methods

#### `addPlugin(plugin: Plugin<T>)`

Adds a plugin to the execution pipeline. Plugins are executed in the order they are added.

#### `runPlugins(files: FileDataCollection<T>)`

Executes all registered plugins sequentially. Each plugin receives the files object and must return a new (or updated) file collection. The final result is returned.

#### `clearPlugins()`

Removes all plugins from the pipeline.

## Features

- Sequential plugin execution
- Support for both synchronous and asynchronous plugins
- Error handling with detailed error messages
- Comprehensive logging of plugin operations
- Plugin lifecycle management (add/clear)
- **Functional pipeline:** Plugins transform and return new file collections (no mutation required)
- **Generic file data type:** Works with any file data structure

## Cloning the Repository

To make your workflow more organized, it's a good idea to clone this repository into a directory named `plugin-manager-workspace`. This helps differentiate the workspace from the `plugin-manager` located in the `packages` directory.

```bash
git clone https://github.com/proj-coursebook/plugin-manager plugin-manager-workspace

cd plugin-manager-workspace
```

## Repository Structure

- `packages` — Contains the primary package(s) for this repository (e.g., `plugin-manager`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `playgrounds` — Contains demos of the dependencies of the primary package(s). Each playground is a minimal, standalone project.
- `docs` — Contains various documentation for users and developers.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- To run the playground, go to `playground/<package-name>` and follow its README.
- For documentation, see the `docs` folder.

### Using a VSCode Multi-root Workspace

With Visual Studio Code, you can enhance your development experience by using a multi-root workspace to access packages, examples, and playgrounds simultaneously. This approach is more efficient than opening the root directory, or each package or example separately.

To set up a multi-root workspace:

1. Open Visual Studio Code.
2. Navigate to `File > Open Workspace from File...`.
3. Select the `plugin-manager.code-workspace` file located at the root of the repository. This action will open all specified folders in one workspace.

The `plugin-manager.code-workspace` file can be customized to include different folders or settings. Here's a typical configuration:

```json
{
  "folders": [
    {
      "path": "packages/plugin-manager"
    },
    {
      "path": "examples/basic"
    }
  ],
  "settings": {
    // Add any workspace-specific settings here, for example:
    "git.openRepositoryInParentFolders": "always"
  }
}
```

## Developing the Package

Change to the package directory and install dependencies:

```bash
cd packages/plugin-manager
npm install
```

- Read the [Project Roadmap](../../docs/ROADMAP.md) for project goals, status, evolution, and development guidelines.
- Read the [Development Guide](DEVELOPMENT.md) for detailed information on the package architecture, build configuration, and implementation patterns.
- Follow the [Contributing Guide](../../docs/CONTRIBUTING.md) for contribution guidelines, coding standards, and best practices.

## Package Management

When you are ready to publish your package:

```bash
npm run release
```

This single command will:

- Validate your code with the full validation pipeline
- Analyze commits to determine version bump
- Update package.json version and changelog
- Build the package
- Create and push git tag
- Create GitHub release
- Publish to NPM

> [!TIP]
> For detailed information about package publishing, versioning, and local development workflows, see the [NPM Package Management Guide](../../docs/guides/npm-package.md).
