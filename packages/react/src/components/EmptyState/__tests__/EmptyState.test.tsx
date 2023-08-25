import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { EmptyState } from 'index';
import AssetPlugin from 'utils/AssetPlugin';
import Plugins from 'utils/Plugins';
import { EmptyStateProps } from '..';

describe('components/EmptyState', () => {
  const assets = {
    logo: 'logo',
  };

  const plugin = new AssetPlugin({
    prefix: 'emptyState',
    assets,
  });

  Plugins.loadPlugin(plugin);

  const childrenRef = createRef<HTMLDivElement>();
  const emptyStateRef = createRef<HTMLDivElement>();
  const setup = (props?: EmptyStateProps<'div'>) => render(<EmptyState {...(props || {})} ref={emptyStateRef} />);

  const children = (<div ref={childrenRef}>Children</div>);

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      expect(() => setup()).not.toThrow();
      expect(emptyStateRef.current?.className).toContain('EmptyState');
    });
  });

  describe('Render with passing props', () => {
    it('should render with src', () => {
      const src = 'https://wwww.example.com';
      expect(() => setup({ src })).not.toThrow();
      expect(emptyStateRef.current?.className).toContain('EmptyState');
    });

    it('should render with name and without src', () => {
      const name = 'logo';
      expect(() => setup({ name })).not.toThrow();
      expect(emptyStateRef.current?.className).toContain('EmptyState');
    });

    it('should render with className', () => {
      const className = 'example';
      expect(() => setup({ className })).not.toThrow();
      expect(emptyStateRef.current?.className).toContain('EmptyState');
      expect(emptyStateRef.current?.className).toContain('example');
    });

    it('should render with children', () => {
      expect(() => setup({ children })).not.toThrow();
      expect(emptyStateRef.current?.className).toContain('EmptyState');
      expect(childrenRef.current).toBeTruthy();
    });
  });

  describe('Render EmptyState heading', () => {
    it('should render EmptyState heading', () => {
      expect(() => render(<EmptyState.Heading />)).not.toThrow();
    });
  });

  describe('Render EmptyState description', () => {
    it('should render EmptyState description', () => {
      expect(() => render(<EmptyState.Description />)).not.toThrow();
    });
  });
});
