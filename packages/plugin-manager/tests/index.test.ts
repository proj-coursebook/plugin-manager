import { beforeEach, describe, expect, it, vi } from "vitest";
import { PluginManagerImpl, PluginManagerError } from "@/index";
import type { FileDataCollection } from "@/types";

// Define a test file data type
interface TestFileData {
  contents: Buffer;
  metadata?: Record<string, any>;
}

describe("PluginManagerImpl", () => {
  let pluginManager: PluginManagerImpl<TestFileData>;
  let mockFiles: FileDataCollection<TestFileData>;

  beforeEach(() => {
    pluginManager = new PluginManagerImpl<TestFileData>();
    mockFiles = {
      "test.txt": {
        contents: Buffer.from("test content"),
      },
    };
  });

  describe("addPlugin", () => {
    it("should add a valid plugin", () => {
      const plugin = vi.fn((files: FileDataCollection<TestFileData>) => files);
      pluginManager.addPlugin(plugin);
      expect(plugin).not.toHaveBeenCalled(); // Plugin shouldn't be called until run
    });

    it("should throw error for invalid plugin", () => {
      expect(() => {
        pluginManager.addPlugin("not a function" as any);
      }).toThrow(PluginManagerError);
    });
  });

  describe("runPlugins", () => {
    it("should run plugins in order", async () => {
      const order: number[] = [];
      const plugin1 = vi.fn((files: FileDataCollection<TestFileData>) => {
        order.push(1);
        return files;
      });
      const plugin2 = vi.fn((files: FileDataCollection<TestFileData>) => {
        order.push(2);
        return files;
      });

      pluginManager.addPlugin(plugin1);
      pluginManager.addPlugin(plugin2);

      await pluginManager.runPlugins(mockFiles);

      expect(plugin1).toHaveBeenCalledWith(mockFiles);
      expect(plugin2).toHaveBeenCalled();
      expect(order).toEqual([1, 2]);
    });

    it("should handle async plugins", async () => {
      const order: number[] = [];
      const plugin1 = vi.fn(async (files: FileDataCollection<TestFileData>) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        order.push(1);
        return files;
      });
      const plugin2 = vi.fn((files: FileDataCollection<TestFileData>) => {
        order.push(2);
        return files;
      });

      pluginManager.addPlugin(plugin1);
      pluginManager.addPlugin(plugin2);

      await pluginManager.runPlugins(mockFiles);

      expect(plugin1).toHaveBeenCalledWith(mockFiles);
      expect(plugin2).toHaveBeenCalled();
      expect(order).toEqual([1, 2]);
    });

    it("should handle plugin errors", async () => {
      const error = new Error("Plugin error");
      const plugin = vi.fn((files: FileDataCollection<TestFileData>) => {
        throw error;
      });

      pluginManager.addPlugin(plugin);

      await expect(pluginManager.runPlugins(mockFiles)).rejects.toThrow(
        PluginManagerError,
      );
      expect(plugin).toHaveBeenCalledWith(mockFiles);
    });

    it("should allow plugins to transform files", async () => {
      const plugin = vi.fn((files: FileDataCollection<TestFileData>) => {
        return {
          ...files,
          "test.txt": {
            ...files["test.txt"],
            contents: Buffer.from("modified content"),
          },
        };
      });

      pluginManager.addPlugin(plugin);
      const result = await pluginManager.runPlugins(mockFiles);

      expect(result["test.txt"].contents.toString()).toBe("modified content");
    });
  });

  describe("clearPlugins", () => {
    it("should clear all plugins", async () => {
      const plugin1 = vi.fn((files: FileDataCollection<TestFileData>) => files);
      const plugin2 = vi.fn((files: FileDataCollection<TestFileData>) => files);

      pluginManager.addPlugin(plugin1);
      pluginManager.addPlugin(plugin2);
      pluginManager.clearPlugins();

      await pluginManager.runPlugins(mockFiles);

      expect(plugin1).not.toHaveBeenCalled();
      expect(plugin2).not.toHaveBeenCalled();
    });
  });
});
