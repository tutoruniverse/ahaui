import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { SizeMapping } from 'constants/common';
import { ComponentSize } from 'types/common';
import Loader from '..';

describe('components/Loader', () => {
  const loaderRef = createRef<HTMLDivElement>();

  const setup = (props = {}) => {
    render(<Loader {...props} ref={loaderRef} />);

    expect(loaderRef.current).toBeTruthy();
    expect(loaderRef.current).toHaveClass('Loader');
    expect(loaderRef.current).toHaveClass('u-spin');
    expect(loaderRef.current).toHaveClass('u-roundedInfinity');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      expect(loaderRef.current).toHaveStyle({ width: `${SizeMapping.medium}px`, height: `${SizeMapping.medium}px` });
      expect(loaderRef.current).toHaveStyle({ animationDuration: '2000ms' });
      expect(loaderRef.current).toHaveClass('u-borderMedium');
    });
  });

  describe('Render with passing props', () => {
    it.each([
      'extraSmall',
      'small',
      'medium',
      'large',
    ] as ComponentSize[])('should render with size="%s"', (size) => {
      setup({ size });

      expect(loaderRef.current).toHaveStyle({ width: `${SizeMapping[size]}px`, height: `${SizeMapping[size]}px` });
      expect(loaderRef.current).toHaveClass(['medium', 'large'].includes(size) ? 'u-borderMedium' : 'u-borderSmall');
    });

    it('should render with duration', () => {
      setup({ duration: 100 });
      expect(loaderRef.current).toHaveStyle({ animationDuration: '100ms' });
    });
  });
});
