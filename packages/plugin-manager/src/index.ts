import { LogManagerImpl, type Logger } from "@coursebook/simple-logger";
import {
  type Plugin,
  type PluginManager,
  type PluginManagerConfig,
  type FileDataCollection,
  PluginManagerError,
  PluginManagerErrorType,
} from "./types";

/**
 * Implementation of the plugin manager component
 *
 * @template T - The type of the file data
 */
class PluginManagerImpl<T> implements PluginManager<T> {
  private config: PluginManagerConfig<T>;
  private logger: Logger;

  constructor() {
    this.config = {
      plugins: [],
    };
    this.logger = LogManagerImpl.getInstance().getLogger("plugin-runner");
  }

  addPlugin(plugin: Plugin<T>): void {
    this.logger.trace("Adding plugin to pipeline");
    if (typeof plugin !== "function") {
      this.logger.error("Plugin must be a function");
      throw new PluginManagerError(
        PluginManagerErrorType.PLUGIN_EXECUTION_ERROR,
        "Plugin must be a function",
      );
    }
    this.config.plugins.push(plugin);
    this.logger.info(
      "Plugin added successfully, total plugins:",
      this.config.plugins.length,
    );
  }

  async runPlugins(
    files: FileDataCollection<T>,
  ): Promise<FileDataCollection<T>> {
    this.logger.trace("Starting plugin execution");
    this.logger.info(
      "Running plugins, total count:",
      this.config.plugins.length,
    );

    let currentFiles = files;
    for (let i = 0; i < this.config.plugins.length; i++) {
      const plugin = this.config.plugins[i];
      this.logger.trace(
        `Running plugin ${i + 1}/${this.config.plugins.length}`,
      );

      try {
        const result = plugin(currentFiles);
        if (result instanceof Promise) {
          currentFiles = await result;
        } else {
          currentFiles = result;
        }
        this.logger.trace(`Plugin ${i + 1} completed successfully`);
      } catch (error) {
        this.logger.error(`Plugin ${i + 1} failed:`, error);
        throw new PluginManagerError(
          PluginManagerErrorType.PLUGIN_EXECUTION_ERROR,
          `Plugin ${i + 1} failed: ${error instanceof Error ? error.message : "Unknown error"}`,
          error instanceof Error ? error : undefined,
        );
      }
    }

    this.logger.info("All plugins executed successfully");
    return currentFiles;
  }

  clearPlugins(): void {
    this.logger.trace("Clearing all plugins");
    this.config.plugins = [];
    this.logger.info("All plugins cleared");
  }
}

// Export all types
export type { Plugin, PluginManager, PluginManagerConfig, FileDataCollection };

// Export the classes
export { PluginManagerError, PluginManagerErrorType, PluginManagerImpl };
