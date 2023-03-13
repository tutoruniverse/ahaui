import { PluginType } from 'constants/common';
import { EnumToUnion } from 'types/common';
import AssetPlugin from './AssetPlugin';
import PluginArray from './PluginArray';

type Plugin = AssetPlugin;

class Plugins {
  plugins: PluginArray<Plugin>;

  constructor() {
    this.plugins = new PluginArray<Plugin>();
  }

  validatePlugin(plugin?: Plugin) {
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

  loadPlugin(plugin: Plugin) {
    this.validatePlugin(plugin);
    this.plugins.push(plugin);
  }

  getPlugins(type?: EnumToUnion<PluginType>) {
    if (!type) {
      return this.plugins;
    }

    return this.plugins.filter((plugin) => plugin.type === type) as PluginArray<Plugin>;
  }
}

export default new Plugins();
