import { PluginType } from 'constants/common';
import AssetPlugin from './AssetPlugin';
import PluginArray from './PluginArray';

class Plugins {
  constructor() {
    this.plugins = new PluginArray();
  }

  validatePlugin(plugin) {
    if (!plugin) {
      throw new Error('Invalid plugin: Can not read plugin.');
    }
    if (!plugin.type) {
      throw new Error('Invalid plugin: missing "type".');
    }
    switch (plugin.type) {
      case PluginType.ASSET: {
        if (!(plugin instanceof AssetPlugin)) {
          throw new Error(`Invalid plugin: plugin with type "${PluginType.ASSET}" must be constructed from class AssetPlugin.`);
        }
        break;
      }
      default:
        break;
    }
  }

  loadPlugin(plugin) {
    this.validatePlugin(plugin);
    this.plugins.push(plugin);
  }

  getPlugins(type = undefined) {
    if (!type) {
      return this.plugins;
    }
    return this.plugins.filter((plugin) => plugin.type === type);
  }
}

export default new Plugins();
