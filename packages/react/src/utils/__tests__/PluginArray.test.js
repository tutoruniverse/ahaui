import AssetPlugin from 'utils/AssetPlugin';
import PluginArray from 'utils/PluginArray';

describe('utils/PluginArray.js', () => {
  it('traverseCall methods should run', () => {
    const plugins = new PluginArray();

    const plugin1 = new AssetPlugin({
      prefix: 'plugin1',
      assets: {
        test: 'test',
      },
    });

    const plugin2 = new AssetPlugin({
      prefix: 'plugin2',
      assets: {
        test: 'test',
      },
    });

    const mockInstanceGetAsset1 = jest.spyOn(plugin1, 'getAsset');

    const mockInstanceGetAsset2 = jest.spyOn(plugin2, 'getAsset');

    const params = ['plugin1', 'test'];

    plugins.push(plugin1, plugin2);
    const results = plugins.traverseCall('getAsset', ...params);

    expect(mockInstanceGetAsset1).toBeCalled();
    expect(mockInstanceGetAsset1).toBeCalledWith(...params);
    expect(mockInstanceGetAsset2).toBeCalled();
    expect(mockInstanceGetAsset2).toBeCalledWith(...params);

    expect(results).toStrictEqual([plugin1.getAsset(...params), plugin2.getAsset(...params)]);
  });

  it('traverseCall method should throw error', () => {
    const plugins = new PluginArray();

    const plugin1 = new AssetPlugin({
      prefix: 'plugin1',
      assets: {
        test: 'test',
      },
    });

    const plugin2 = new AssetPlugin({
      prefix: 'plugin2',
      assets: {
        test: 'test',
      },
    });

    const params = ['plugin1', 'test'];

    plugins.push(plugin1, plugin2);
    expect(() => plugins.traverseCall('getRandom', ...params))
      .toThrowError('Invalid plugin: One plugin does not have method with name "getRandom".');
  });
});
