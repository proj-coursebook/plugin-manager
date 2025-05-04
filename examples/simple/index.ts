import { PluginManagerImpl } from "@coursebook/plugin-manager";
import type { Plugin, FileDataCollection } from "@coursebook/plugin-manager";

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

// Run plugins and print results
const result = await pluginManager.runPlugins(files);
console.log(result["example.txt"].contents.toString()); // Output: "modified content"
