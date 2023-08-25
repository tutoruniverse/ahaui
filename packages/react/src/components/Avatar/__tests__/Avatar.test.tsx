import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Plugins from 'utils/Plugins';
import AssetPlugin from 'utils/AssetPlugin';
import Avatar, { AvatarSizeEnum } from '..';


describe('components/Avatar', () => {
  const avatarRef = createRef<HTMLDivElement>();

  const assets = {
    happy: 'happy-avatar',
  };

  const plugin = new AssetPlugin({
    prefix: 'avatar',
    assets,
  });

  Plugins.loadPlugin(plugin);

  const setup = (props = {}) => {
    render(<Avatar {...props} ref={avatarRef} />);

    // Check if we can pass ref
    expect(avatarRef.current).toBeTruthy();
    expect(avatarRef.current).toHaveClass('Avatar');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();
      // Check if component has default props set
      expect(avatarRef.current).toHaveClass('Avatar--medium');
    });
  });

  describe('Render with passing props', () => {
    it('should render with className value', () => {
      const className = 'u-backgroundPrimaryLight u-text200';
      setup({ className });

      expect(avatarRef.current).toHaveClass(className);
    });

    it.each(Object.values(AvatarSizeEnum))('should render with size value = "%s"', (size) => {
      setup({ size });

      expect(avatarRef.current).toHaveClass(`Avatar--${size}`);
    });

    it('should render with height and width value', () => {
      const width = 100;
      const height = 200;
      setup({ width, height });

      expect(avatarRef.current?.style.width).toEqual(`${width}px`);
      expect(avatarRef.current?.style.height).toEqual(`${height}px`);
    });

    it('should render with src value', () => {
      const src = 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/uifaces/m-10.jpg';
      const defaultAlt = 'Avatar';
      setup({ src });

      const img = screen.queryByTestId('avatar-img') as HTMLImageElement;

      expect(img).toBeTruthy();
      expect(img.src).toEqual(src);

      expect(img.alt).toEqual(defaultAlt);
    });


    it('should render with name and src value', () => {
      const src = 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/uifaces/m-10.jpg';
      const name = 'avatar';
      setup({ src, name });

      const img = screen.queryByTestId('avatar-img') as HTMLImageElement;

      expect(img).toBeTruthy();
      expect(img.src).toEqual(src);
    });

    it('should render with name and without src value', () => {
      const name = 'happy';
      setup({ name });

      const img = screen.queryByTestId('avatar-img') as HTMLImageElement;
      const textElement = screen.queryByTestId('avatar-text') as HTMLDivElement;

      expect(textElement).not.toBeTruthy();
      expect(img).toBeTruthy();
      expect(img.src).toEqual(`${window.location.origin}/${assets[name]}`);
    });

    it('should render with text value', () => {
      const text = 'QH';
      setup({ text });

      const textElement = screen.queryByTestId('avatar-text') as HTMLDivElement;

      expect(textElement).toBeTruthy();
      expect(textElement.innerHTML).toContain(text);
    });

    it('should render with as value = "span"', () => {
      setup({ as: 'span' });

      expect(avatarRef.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render with src value when passing both src and text values', () => {
      const src = 'https://raw.githubusercontent.com/gotitinc/aha-assets/master/uifaces/m-10.jpg';
      const text = 'QH';
      setup({ src, text });

      const img = screen.queryByTestId('avatar-img') as HTMLImageElement;

      expect(img).toBeTruthy();
      expect(img.src).toEqual(src);
    });
  });
});
