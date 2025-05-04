/**
 * Collection of files, keyed by relative path
 *
 * @template T - The type of the file data
 */
type FileDataCollection<T> = Record<string, T>;

/**
 * A plugin function that transforms files and returns the transformed collection
 *
 * @template T - The type of the file data
 */
type Plugin<T> = (
  files: FileDataCollection<T>,
) => Promise<FileDataCollection<T>> | FileDataCollection<T>;

/**
 * Configuration for the plugin manager
 *
 * @template T - The type of the file data
 */
interface PluginManagerConfig<T> {
  /**
   * List of plugins
   */
  plugins: Plugin<T>[];
}

/**
 * Interface for the plugin manager component
 *
 * @template T - The type of the file data
 */
interface PluginManager<T> {
  /**
   * Add a plugin to the pipeline
   * @param plugin The plugin to add
   */
  addPlugin(plugin: Plugin<T>): void;

  /**
   * Run all registered plugins
   * @param files The files to process
   */
  runPlugins(files: FileDataCollection<T>): Promise<FileDataCollection<T>>;

  /**
   * Clear all registered plugins
   */
  clearPlugins(): void;
}

/**
 * Error types specific to plugin manager
 */
enum PluginManagerErrorType {
  PLUGIN_EXECUTION_ERROR = "PLUGIN_EXECUTION_ERROR",
}

/**
 * Custom error class for plugin runner errors
 */
class PluginManagerError extends Error {
  constructor(
    public type: PluginManagerErrorType,
    message: string,
    public cause?: Error,
  ) {
    super(message);
    this.name = "PluginManagerError";
  }
}

export {
  type Plugin,
  type PluginManager,
  type PluginManagerConfig,
  type FileDataCollection,
  PluginManagerError,
  PluginManagerErrorType,
};
