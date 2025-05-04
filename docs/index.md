# Plugin Manager

A minimal, type-safe plugin pipeline for JavaScript/TypeScript.
Add, clear, and execute a sequence of synchronous or asynchronous plugins that transform and return new file collections—ideal for content processing, static site generation, and more.

## Features

- Sequential plugin execution
- Support for both synchronous and asynchronous plugins
- Error handling with detailed error messages
- Comprehensive logging of plugin operations
- Plugin lifecycle management (add/clear)
- **Functional pipeline:** Plugins transform and return new file collections (no mutation required)
- **Generic file data type:** Works with any file data structure

## Usage

### Basic Usage

```typescript
import { PluginManagerImpl, type Plugin, type FileDataCollection } from '@coursebook/plugin-manager';

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
    'example.txt': {
      ...files['example.txt'],
      contents: Buffer.from('modified content'),
    },
  };
};

// Add plugin to pipeline
pluginManager.addPlugin(myPlugin);

// Define files
const files: FileDataCollection<MyFileData> = {
  'example.txt': {
    contents: Buffer.from('original content'),
  },
};

// Run plugins (returns the transformed collection)
const result = await pluginManager.runPlugins(files);
console.log(result['example.txt'].contents.toString()); // Output: "modified content"
```

### Async Plugin Example

```typescript
const asyncPlugin: Plugin<MyFileData> = async (files) => {
  // Perform async operations
  const newContent = await someAsyncOperation();
  return {
    ...files,
    'example.txt': {
      ...files['example.txt'],
      contents: Buffer.from(newContent),
    },
  };
};
```

## API

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
type Plugin<T> = (files: FileDataCollection<T>) => Promise<FileDataCollection<T>> | FileDataCollection<T>;
```

### Methods

#### `addPlugin(plugin: Plugin<T>)`
Adds a plugin to the execution pipeline. Plugins are executed in the order they are added.

#### `runPlugins(files: FileDataCollection<T>)`
Executes all registered plugins sequentially. Each plugin receives the files object and must return a new (or updated) file collection. The final result is returned.

#### `clearPlugins()`
Removes all plugins from the pipeline.

## Installation

### Installing from NPM (After Publishing)

Once published to NPM, the package can be installed using:

```bash
npm install @coursebook/plugin-manager
```

This template is particularly useful for creating packages that are intended to be used locally so read the instructions below for local development.

### Local Development (Without Publishing to NPM)

There are three ways to use this package locally:

#### Option 1: Using npm link

1. Clone this repository, install dependencies, build the package, and create a global symlink:

   ```bash
   git clone <repository-url>
   cd plugin-manager/packages/plugin-manager
   # Install dependencies and build the package
   npm install
   npm run build
   # Create a global symlink
   npm link
   ```

   Note: You can unlink the package later using `npm unlink`.

2. In your other project where you want to use this package:

   ```bash
   npm link @coursebook/plugin-manager
   ```

3. Import the package in your project:

   ```typescript
   import { PluginManagerImpl, type Plugin } from '@coursebook/plugin-manager';
   ```

#### Option 2: Using local path

In your other project's `package.json`, add this package as a dependency using the local path:

```json
{
  "dependencies": {
    "@coursebook/plugin-manager": "file:/path/to/plugin-manager"
  }
}
```

You can use absolute or relative paths with the `file:` protocol.

Then run `npm install` in your project.

Now you can import the package in your project as usual.

#### Option 3: Using a local tarball (npm pack)

1. Follow option 1 but instead of using `npm link`, create a tarball of the package:

   ```bash
   npm pack
   ```

   This will generate a file like `coursebook-plugin-manager-1.0.0.tgz`. (Or whatever version you have.)
   You can find the tarball in the same directory as your `package.json`.

2. In your other project, install the tarball:

   ```bash
   npm install /absolute/path/to/plugin-manager/coursebook-plugin-manager-1.0.0.tgz
   ```

   Or, if you copy the tarball into your project directory:

   ```bash
   npm install ./coursebook-plugin-manager-1.0.0.tgz
   ```

This method installs the package exactly as it would be published to npm, making it ideal for final testing. After this installation, you must have the package in your `node_modules` directory, and you can import it as usual. You will also see the package in your `package.json` file as a dependency:

```json
{
  "dependencies": {
    "@coursebook/plugin-manager": "file:coursebook-plugin-manager-1.0.0.tgz"
  }
}
```
