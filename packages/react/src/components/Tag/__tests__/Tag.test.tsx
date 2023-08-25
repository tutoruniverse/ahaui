import React, { createRef } from 'react';
import { render } from '@testing-library/react';
import { VariantColorsEnum } from 'types/common';
import Tag, { variantsClassName, variantsTextClassName, checkIsVariantTextClassName, VariantClassName, VariantTextClassName } from '..';

const variantForClassName = Object.keys(variantsClassName) as VariantClassName[];

describe('components/Tag', () => {
  const tagRef = createRef<HTMLDivElement>();

  const setup = (tagProps = {}) => {
    render(
      <Tag {...tagProps} ref={tagRef} />,
    );

    expect(tagRef.current).toBeTruthy();
    expect(tagRef.current).toHaveClass('Tag');
  };

  describe('Render tag without passing props', () => {
    it('should render tag', () => {
      setup();
      const variant = 'primary';

      // variant default value is "primary"
      const variantClassName = variantsClassName[variant];
      expect(tagRef.current).toHaveClass(variantClassName);


      // textClassName default value is empty string
      // so that following the condition in className of Tag
      // it will add variantsTextClassName[variant] instead of textClassName.
      const variantTextClassName = variantsTextClassName[variant];
      expect(tagRef.current).toHaveClass(variantTextClassName);
    });
  });

  describe('Render tag with passing props', () => {
    it.each(variantForClassName as VariantTextClassName[])('should render with variant="%s" and without textClassName', (variant) => {
      setup({ variant });

      const variantTextClassName = variantsTextClassName[variant];

      const variantClassName = variantsClassName[variant];

      // VariantTextClassName just can work if variant is:
      // primary, accent, primary_subtle, accent_subtle
      if (checkIsVariantTextClassName(variant)) {
        expect(tagRef.current).toHaveClass(variantTextClassName);
      } else {
        expect(variantTextClassName).toBeFalsy();
      }

      expect(tagRef.current).toHaveClass(variantClassName);
    });

    it.each(variantForClassName)('should render with variant="%s" and with textClassName ', (variant) => {
      const textClassName = 'u-backgroundRed';
      setup({ variant, textClassName });
      const variantClassName = variantsClassName[variant];

      expect(tagRef.current).toHaveClass(variantClassName);

      // If textClassName is passed in, variantTextClassName will not work
      // textClassName will just be used if variant is:
      // primary, accent, primary_subtle, accent_subtle
      if (checkIsVariantTextClassName(variant)) {
        // There is one case which variant = "primary" that variantClassName contains variantTextClassName so we will not check this case
        const variantTextClassName = variantsTextClassName[variant];
        if (variant !== VariantColorsEnum.primary) {
          expect(tagRef.current).not.toHaveClass(variantTextClassName);
        }
        expect(tagRef.current).toHaveClass(textClassName);
      }
    });

    it('should render with className', () => {
      const className = 'tagClassName';
      setup({ className });
      expect(tagRef.current).toHaveClass(className);
    });
  });
});
