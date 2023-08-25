import AssetPlugin from 'utils/AssetPlugin';
import Plugins from 'utils/Plugins';
import PluginArray from 'utils/PluginArray';
import { PluginType } from 'constants/common';

describe('utils/Plugins', () => {
  const prefix = 'logo';
  const assets = {
    myLogo: 'pathToImage',
    foobar: 'https://foo.bar/image.jpg',
  };

  const plugin1 = new AssetPlugin({
    prefix,
    assets,
  });

  const plugin2 = new AssetPlugin({
    prefix,
    assets,
  });

  const plugin3 = 'string';

  const pluginManagement = Plugins;

  describe('Create instance', () => {
    it('should run class constructor', () => {
      expect(pluginManagement.plugins).toBeInstanceOf(PluginArray);
    });
  });

  describe("Run instance's methods", () => {
    it('should run loadPlugin', () => {
      const mockInstanceLoadPlugin = jest.spyOn(pluginManagement, 'loadPlugin');

      const mockInstanceValidatePlugin = jest.spyOn(
        pluginManagement,
        'loadPlugin',
      );

      pluginManagement.loadPlugin(plugin1);
      pluginManagement.loadPlugin(plugin2);
      expect(() => pluginManagement.loadPlugin(plugin3)).toThrow();

      expect(mockInstanceLoadPlugin).toBeCalledTimes(3);

      expect(mockInstanceValidatePlugin).toBeCalledTimes(3);
    });

    it('should run getPlugins', () => {
      const mockInstanceGetPlugins = jest.spyOn(pluginManagement, 'getPlugins');

      const plugin4 = {
        type: 'test',
        assets: {
          test: 'test',
        },
      };

      pluginManagement.loadPlugin(plugin4);

      const result1 = pluginManagement.getPlugins(PluginType.ASSET);

      expect(mockInstanceGetPlugins).toBeCalled();
      expect(mockInstanceGetPlugins).toBeCalledWith(PluginType.ASSET);

      expect(result1).toStrictEqual(new PluginArray(plugin1, plugin2));

      const result2 = pluginManagement.getPlugins();
      expect(result2).toStrictEqual(pluginManagement.plugins);
    });

    it('should handle no plugin error ', () => {
      try {
        pluginManagement.loadPlugin(null);
      } catch (err) {
        expect(err.message).toBe('Invalid plugin: Can not read plugin.');
      }
    });

    it('should handle plugin type error ', () => {
      try {
        pluginManagement.loadPlugin({ type: undefined });
      } catch (err) {
        expect(err.message).toBe('Invalid plugin: missing "type".');
      }

      try {
        pluginManagement.loadPlugin({ type: PluginType.ASSET });
      } catch (err) {
        expect(err.message).toBe(`Invalid plugin: plugin with type "${PluginType.ASSET}" must be constructed from class AssetPlugin.`);
      }
    });
  });
});
