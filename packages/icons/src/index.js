import { AssetPlugin } from '@ahaui/react';
import { requireAllSVGs } from './utils/svg';

const Icons = [
  ...requireAllSVGs('Action'),
  ...requireAllSVGs('Alert'),
  ...requireAllSVGs('File'),
  ...requireAllSVGs('Navigation'),
  ...requireAllSVGs('Shopping'),
  ...requireAllSVGs('Social'),
  ...requireAllSVGs('Time'),
  ...requireAllSVGs('User'),
];

const createIconAssetsPlugin = () => {
  const IconAssetsPlugin = new AssetPlugin({
    prefix: 'icon',
    assets: Icons.reduce((finalResult, currentItem) => {
      if (
        currentItem
        && currentItem.path
        && currentItem.metadata
        && currentItem.metadata.name
      ) {
        return {
          ...finalResult,
          [currentItem.metadata.name]: currentItem.path,
        };
      }
      return finalResult;
    }, {}),
  });
  return IconAssetsPlugin;
};

export default {
  Icons,
  createIconAssetsPlugin,
};
