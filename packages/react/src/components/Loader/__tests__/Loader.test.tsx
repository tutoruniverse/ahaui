import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { SizeMapping } from 'constants/common';
import { ComponentSizeEnum } from 'types/common';
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
      ComponentSizeEnum.extraSmall,
      ComponentSizeEnum.small,
      ComponentSizeEnum.medium,
      ComponentSizeEnum.large,
    ])('should render with size="%s"', (size) => {
      const className = 'className';
      setup({ size, className });

      expect(loaderRef.current).toHaveStyle({ width: `${SizeMapping[size]}px`, height: `${SizeMapping[size]}px` });
      expect(loaderRef.current).toHaveClass(['medium', 'large'].includes(size) ? 'u-borderMedium' : 'u-borderSmall');
      expect(loaderRef.current).toHaveClass(className);
    });

    it('should render with duration', () => {
      setup({ duration: 100 });
      expect(loaderRef.current).toHaveStyle({ animationDuration: '100ms' });
    });
  });
});
