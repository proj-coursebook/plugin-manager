# Plugin Manager

A minimal, type-safe plugin pipeline for JavaScript/TypeScript.
Add, clear, and execute a sequence of synchronous or asynchronous plugins that transform and return new file collections—ideal for content processing, static site generation, and more.

> [!NOTE]
> A plugin is a function that tranforms its input and returns the transformed output.

> [!TIP]
> For package-specific instructions (installation, usage, development, publishing, etc.), see the [README in `packages/plugin-manager/`](packages/plugin-manager/README.md).

## Repository Structure

This repository follows the [example-package](https://github.com/madooei/example-package) template for building minimal TypeScript packages. The codebase contains the following directories:

- `packages` — Contains the primary package(s) for this repository (e.g., `plugin-manager`). Each package is self-contained and can be copied out and used independently.
- `examples` — Contains examples of how to use the packages. Each example is a minimal, standalone project.
- `docs` — Contains documentation for the primary package(s) and, optionally, for examples or other aspects of the repo.
- `.github` — Contains GitHub-specific files, such as workflows and issue templates.

### Philosophy

- **Portability:** Each package and example is self-contained. You can copy any package or example out of this repo and use it as a standalone project. It is generally assumed that you open each package in your editor to work on it (rather than opening the entire repo).
- **Simplicity:** We intentionally avoid monorepo tools (like workspaces or shared config files) to keep things simple and portable.
- **Clarity:** The structure is easy to navigate, and each part of the repo has a clear purpose.

## How to Use This Repo

- To work on a package, go to `packages/<package-name>` and follow its README.
- To try an example, go to `examples/<example-name>` and follow its README.
- For documentation, see the `docs` folder.

## Contributing

Feel free to open issues or pull requests! If you want to add a new package or example, just create a new folder in the appropriate directory and include a README. (Check [`CONTRIBUTING.md`](CONTRIBUTING.md) for more information.)
