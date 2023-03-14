import { render } from '@testing-library/react';
import { PluginType } from 'constants/common';
import React, { createRef } from 'react';
import AssetPlugin from 'utils/AssetPlugin';
import Plugins from 'utils/Plugins';
import Logo from '..';

describe('components/Logo', () => {
  const ref = createRef<HTMLDivElement>();

  // Setups
  const plugin = new AssetPlugin({
    prefix: 'logo',
    assets: {
      myLogo: 'logoPath',
    },
  });

  Plugins.loadPlugin(plugin);

  // Prop that needed to test other props
  const src = 'logoPath';


  const setup = (props = {}) => {
    render(<Logo ref={ref} {...props} />);

    expect(ref.current).toBeTruthy();
  };

  describe('Render Logo without passing props', () => {
    it('should render', () => {
      setup();

      expect(ref.current).toHaveClass('Logo');
      expect(ref.current?.firstChild).toBeFalsy();
    });
  });

  describe('Render Logo with passing props', () => {
    it('should render with name', () => {
      const name = 'myLogo';
      setup({
        name,
      });

      const src = plugin.getAsset('myLogo');

      expect(src).toBe('logoPath');

      expect(ref.current?.firstChild).toBeTruthy();
      expect(ref.current?.firstChild).toHaveAttribute('src', src);
      expect(ref.current?.firstChild).toHaveAttribute('alt', 'Logo');
    });

    it('should render with src', () => {
      setup({
        src,
      });

      expect(ref.current?.firstChild).toBeTruthy();
      expect(ref.current?.firstChild).toHaveAttribute('src', src);
      expect(ref.current?.firstChild).toHaveAttribute('alt', 'Logo');
    });

    it('should render with alt', () => {
      const alt = 'alt';

      setup({
        alt,
        src,
      });

      expect(ref.current?.firstChild).toHaveAttribute('alt', alt);
    });

    it('should render with width and height', () => {
      const height = 20;
      const width = 40;
      const src = 'logoPath';

      setup({
        height,
        width,
        src,
      });

      expect(ref.current?.firstChild).toHaveAttribute(
        'height',
        height.toString(),
      );

      expect(ref.current?.firstChild).toHaveAttribute(
        'width',
        width.toString(),
      );
    });
  });
});
