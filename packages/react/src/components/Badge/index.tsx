import React from 'react';
import classNames from 'classnames';
import { PolymorphicRef, PolymorphicComponentPropsWithRef } from 'types/common';

enum VariantEnum {
  default = 'default',
  white = 'white',
  black = 'black',
  primary = 'primary',
  primary_subtle = 'primary_subtle',
  warning = 'warning',
  warning_subtle = 'warning_subtle',
  positive = 'positive',
  positive_subtle = 'positive_subtle',
  information = 'information',
  information_subtle = 'information_subtle',
  negative = 'negative',
  negative_subtle = 'negative_subtle',
}

type Variant = keyof typeof VariantEnum;

type BadgeProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
T,
{
  className?: string;
  /** The Badge visual variant */
  variant: Variant;
  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`  */
  textClassName?: string | string[];
}
>;

const variantsTextClassName = {
  [VariantEnum.primary]: 'u-textWhite hover:u-textWhite',
  [VariantEnum.primary_subtle]: 'u-textPrimary hover:u-textPrimary',
};

export const variantsClassName = {
  [VariantEnum.default]: 'u-textGray hover:u-textGray u-backgroundUltraLight',
  [VariantEnum.white]: 'u-texDark hover:u-texDark u-backgroundWhite',
  [VariantEnum.black]: 'u-textWhite hover:u-textWhite u-backgroundBlack',
  [VariantEnum.primary]: 'u-backgroundPrimary',
  [VariantEnum.primary_subtle]: 'u-backgroundPrimaryLighter',
  [VariantEnum.information]: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  [VariantEnum.information_subtle]: 'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  [VariantEnum.warning]: 'u-textDark hover:u-textDark u-backgroundWarning',
  [VariantEnum.warning_subtle]: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  [VariantEnum.positive]: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  [VariantEnum.positive_subtle]: 'u-textPositive hover:u-textPositive u-backgroundPositiveLighter',
  [VariantEnum.negative]: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  [VariantEnum.negative_subtle]: 'u-textNegative hover:u-textNegative u-backgroundNegativeLighter',
};

const getTextClassName = (variant: Variant, textClassName?: string | string[]) => {
  if (
    variant === VariantEnum.primary
    || variant === VariantEnum.primary_subtle
  ) {
    return textClassName || variantsTextClassName[variant];
  }
  return undefined;
};

const Badge = React.forwardRef(
  <T extends React.ElementType>(
    {
      className,
      textClassName,
      variant = VariantEnum.default,
      as,
      ...props
    }: BadgeProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Component = as || 'span';

    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'Badge',
          'u-inlineBlock u-textCenter u-text200 u-fontMedium u-textNoWrap u-roundedInfinity hover:u-textDecorationNone',
          variant && variantsClassName[variant],
          getTextClassName(variant, textClassName),
          className && className,
        )}
      />
    );
  });

export default Badge;
