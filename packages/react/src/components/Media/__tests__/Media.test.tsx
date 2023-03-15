import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import Media, { aspectRatios, AspectRatioEnum } from '..';

describe('components/Media', () => {
  const mediaRef = createRef<HTMLEmbedElement>();

  const setup = (props = {}) => {
    const { container } = render(<Media {...props} ref={mediaRef} />);

    const mediaWrapper = screen.getByTestId('media-wrapper');

    expect(mediaWrapper).toHaveClass('Media');

    // Check if we can pass ref
    expect(mediaRef.current).toBeTruthy();
    expect(mediaRef.current).toHaveClass('Media-item');

    return container;
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      const container = setup();

      const mediaWrapper = screen.getByTestId('media-wrapper');

      // Check if component has default props set
      expect(mediaWrapper).toHaveClass(aspectRatios.wide);
      expect(container.querySelector('embed')).toBeTruthy();
    });
  });

  describe('Render with passing props', () => {
    it.each([...Object.values(AspectRatioEnum)])('should render with aspectRatio = "%s"', (aspectRatio) => {
      setup({ aspectRatio });

      const mediaWrapper = screen.getByTestId('media-wrapper');

      expect(mediaWrapper).toHaveClass(aspectRatios[aspectRatio]);
    });

    it.each(['img', 'iframe'])('should render with %s type', (as) => {
      const container = setup({ as });

      expect(container.querySelector(as)).toBeTruthy();
    });

    it('should render with width and height props', () => {
      setup({ width: 400, height: 300 });

      const mediaWrapper = screen.getByTestId('media-wrapper');

      expect(mediaWrapper.style.width).toEqual('400px');
      expect(mediaWrapper.style.height).toEqual('300px');
    });
  });
});
