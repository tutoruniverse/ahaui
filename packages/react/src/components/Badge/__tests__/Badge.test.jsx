import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Badge, { variantsClassName } from '..';

describe('components/Badge', () => {
  const badgeRef = createRef();

  const setup = (props = {}) => {
    render(<Badge {...props} ref={badgeRef} />);

    // Check if we can pass ref
    expect(badgeRef.current).toBeTruthy();
    expect(badgeRef.current).toHaveClass('Badge');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      // Check if component has default props set
      expect(badgeRef.current?.className).toContain(
        variantsClassName.default,
      );
    });
  });

  describe('Render with passing props', () => {
    it.each([...Object.keys(variantsClassName)])(
      'should render with variant = "%s"',
      (variant) => {
        setup({ variant });

        expect(badgeRef.current?.className).toContain(
          variantsClassName[variant],
        );
      },
    );

    it.each([...Object.keys(variantsClassName)])(
      'should render with variant = "%s" and textClassName',
      (variant) => {
        const textClassName = 'u-textAccent';
        setup({ textClassName, variant });

        if (variant === 'primary' || variant === 'primary_subtle') {
          expect(badgeRef.current?.className).toContain(
            variantsClassName[variant],
          );
          expect(badgeRef.current?.className).toContain(
            textClassName,
          );
        } else {
          expect(badgeRef.current?.className).toContain(
            variantsClassName[variant],
          );
        }
      },
    );
  });
});
