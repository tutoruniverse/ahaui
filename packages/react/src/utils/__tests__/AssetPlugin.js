import AssetPlugin from 'utils/AssetPlugin';
import { PluginType } from 'constants/common';

describe('utils/AssetPlugin', () => {
  const prefix = 'logo';
  const assets = {
    myLogo: 'pathToImage',
    foobar: 'https://foo.bar/image.jpg',
  };

  const testAssetPlugin = new AssetPlugin({
    prefix,
    assets,
  });

  describe('Create instance', () => {
    it('should run class constructor', () => {
      expect(testAssetPlugin.type).toBe(PluginType.ASSET);
      expect(testAssetPlugin.prefix).toBe(prefix);
      expect(testAssetPlugin.assets).toBe(assets);
    });

    it('should throw error with incorrect format assets', () => {
      expect(() => new AssetPlugin({ prefix })).toThrow(
        'Invalid plugin: missing "assets".',
      );

      expect(() => new AssetPlugin({ prefix, assets: 'string' })).toThrow(
        'Invalid plugin: assets must be an object of key-value pairs: key is the asset name and value is asset url.',
      );
    });
  });

  describe('Run instance\'s methods', () => {
    it('should run getAsset', () => {
      const mockInstanceGetAsset = jest.spyOn(testAssetPlugin, 'getAsset');
      const getAssetName = 'myLogo';

      // Call with 2 arguments
      testAssetPlugin.getAsset(prefix, getAssetName);
      expect(mockInstanceGetAsset).toHaveBeenCalledTimes(1);
      expect(mockInstanceGetAsset).toHaveBeenCalledWith(prefix, getAssetName);
      expect(mockInstanceGetAsset).toHaveReturnedWith(
        testAssetPlugin.assets[getAssetName],
      );

      // Call with 1 argument
      testAssetPlugin.getAsset(getAssetName);
      expect(mockInstanceGetAsset).toHaveBeenCalledTimes(2);
      expect(mockInstanceGetAsset).toHaveBeenCalledWith(getAssetName);
      expect(mockInstanceGetAsset).toHaveReturnedWith(
        testAssetPlugin.assets[getAssetName],
      );

      // Call with no argument
      testAssetPlugin.getAsset();
      expect(mockInstanceGetAsset).toHaveBeenCalledTimes(3);
      expect(mockInstanceGetAsset).toHaveBeenCalledWith();
      expect(mockInstanceGetAsset).toHaveReturnedWith(undefined);

      mockInstanceGetAsset.mockClear();
    });
  });
});
