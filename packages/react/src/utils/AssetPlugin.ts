import { PluginType } from 'constants/common';

class AssetPlugin {
  type: string;
  prefix: string;
  assets: Record<string, any>;

  constructor({
    prefix,
    assets,
  }: {
    prefix: 'avatar' | 'logo' | 'emptyState';
    assets: Record<string, any>;
  }) {
    this.type = PluginType.ASSET;
    this.validateAssets(assets);
    this.prefix = prefix;
    this.assets = assets;
  }

  validateAssets(assets: Record<string, any>) {
    if (!assets) {
      throw new Error('Invalid plugin: missing "assets".');
    }
    if (typeof assets !== 'object') {
      throw new Error(
        'Invalid plugin: assets must be an object of key-value pairs: key is the asset name and value is asset url.',
      );
    }
  }

  getAsset(): undefined;
  getAsset(assetName: string): any;
  getAsset(prefix: string, assetName: string): any;
  getAsset(...args: string[]) {
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
