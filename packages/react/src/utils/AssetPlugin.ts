import { PluginType } from 'constants/common';

class AssetPlugin {
  constructor({
    prefix,
    assets,
  }) {
    this.type = PluginType.ASSET;
    this.validateAssets(assets);
    this.prefix = prefix;
    this.assets = assets;
  }

  validateAssets(assets) {
    if (!assets) {
      throw new Error('Invalid plugin: missing "assets".');
    }
    if (typeof assets !== 'object') {
      throw new Error('Invalid plugin: assets must be an object of key-value pairs: key is the asset name and value is asset url.');
    }
  }

  getAsset(...args) {
    if (args.length === 0) return undefined;
    if (args.length === 1) {
      const assetName = args[0];
      return this.assets[assetName];
    }
    if (args.length === 2) {
      const prefix = args[0];
      const assetName = args[1];
      if (prefix !== this.prefix) return undefined;
      return this.assets[assetName];
    }
    return undefined;
  }
}

export default AssetPlugin;
