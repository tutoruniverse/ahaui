import { render } from '@testing-library/react';
import React, { createRef } from 'react';
import Skeleton, {
  VariantEnum,
} from '..';

describe('component/Skeleton', () => {
  const skeletonRef = createRef<HTMLDivElement>();
  const setup = (props = {}) => {
    render(<Skeleton ref={skeletonRef} {...props} />);

    expect(skeletonRef.current).toBeTruthy();
    expect(skeletonRef.current).toHaveClass('Skeleton');
  };

  describe('Render without passsing props', () => {
    it('should render successfully', () => {
      setup();

      expect(skeletonRef.current).not.toHaveClass('u-roundedCircle'); // text
      expect(skeletonRef.current).toHaveStyle({
        height: '16px',
        animationDuration: '2000ms',
      });
    });
  });

  describe('Render with passing props', () => {
    it.each(Object.keys(VariantEnum))('should render with variant="%s"', (variant) => {
      setup({ variant });

      if (variant === VariantEnum.text) {
        expect(skeletonRef.current).not.toHaveClass('u-roundedCircle');
      } else {
        expect(skeletonRef.current).toHaveClass('u-roundedCircle');
      }
    });

    it.each([
      ['number', { width: 100, height: 100 }, { width: '100px', height: '100px' }],
      ['string', { width: '100px', height: '100%' }, { width: '100px', height: '100%' }],
    ])('should render with width and height in %s', (_, props, style) => {
      setup(props);
      expect(skeletonRef.current).toHaveStyle(style);
    });

    it('should render with animationDuration', () => {
      setup({ duration: 1000 });
      expect(skeletonRef.current).toHaveStyle({
        animationDuration: '1000ms',
      });
    });

    it('should render with as', () => {
      setup({ as: 'img' });
      expect(skeletonRef.current).toBeInstanceOf(HTMLImageElement);
    });
  });
});
