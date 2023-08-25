import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import Badge, { BadgeProps, BadgeVariantEnum, variantsClassName } from '..';

describe('components/Badge', () => {
  const badgeRef = createRef<HTMLDivElement>();

  const setup = (props?: BadgeProps<'div'>) => {
    render(<Badge ref={badgeRef} {...(props || {})} />);

    // Check if we can pass ref
    expect(badgeRef.current).toBeTruthy();
    expect(badgeRef.current).toHaveClass('Badge');
  };

  describe('Render without passing props', () => {
    it('should render with default props', () => {
      setup();

      // Check if component has default props set
      expect(badgeRef.current?.className).toContain(variantsClassName.default);
    });
  });

  describe('Render with passing props', () => {
    it.each([
      BadgeVariantEnum.primary,
      BadgeVariantEnum.primary_subtle,
    ])('should render with variant = "%s"', (variant) => {
      setup({ variant });

      expect(badgeRef.current?.className).toContain(variantsClassName[variant]);
    });

    it.each(
      Object.values(BadgeVariantEnum),
    )('should render with variant = "%s" and textClassName', (variant) => {
      const textClassName = 'u-textAccent';
      const className = 'className';
      setup({ textClassName, variant, className });

      if ([BadgeVariantEnum.primary, BadgeVariantEnum.primary_subtle].includes(variant)) {
        expect(badgeRef.current?.className).toContain(
          variantsClassName[variant],
        );
        expect(badgeRef.current?.className).toContain(textClassName);
      } else {
        expect(badgeRef.current?.className).toContain(variantsClassName[variant]);
      }

      expect(badgeRef.current?.className).toContain(className);
    });
  });
});
