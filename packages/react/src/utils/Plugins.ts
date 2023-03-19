import { PluginType } from 'constants/common';
import AssetPlugin from './AssetPlugin';
import PluginArray from './PluginArray';

class Plugins {
  plugins: PluginArray | AssetPlugin[];

  constructor() {
    this.plugins = new PluginArray();
  }

  validatePlugin(plugin: AssetPlugin) {
    if (!plugin) {
      throw new Error('Invalid plugin: Can not read plugin.');
    }
    if (!plugin.type) {
      throw new Error('Invalid plugin: missing "type".');
    }
    switch (plugin.type) {
      case PluginType.ASSET: {
        if (!(plugin instanceof AssetPlugin)) {
          throw new Error(
            `Invalid plugin: plugin with type "${PluginType.ASSET}" must be constructed from class AssetPlugin.`,
          );
        }
        break;
      }
      default:
        break;
    }
  }

  loadPlugin(plugin: AssetPlugin) {
    this.validatePlugin(plugin);
    this.plugins.push(plugin);
  }

  getPlugins(type: string | undefined = undefined): PluginArray {
    if (!type) {
      return this.plugins as PluginArray;
    }
    return this.plugins.filter((plugin) => plugin.type === type) as PluginArray;
  }
}

export default new Plugins();
