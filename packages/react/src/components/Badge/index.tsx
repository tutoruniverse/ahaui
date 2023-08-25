import React from 'react';
import classNames from 'classnames';
import { EnumToUnion, AsProp, AhaRefForwardingComponent } from 'types/common';

export enum BadgeVariantEnum {
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

type BadgeVariantType = EnumToUnion<BadgeVariantEnum>;

export interface BadgeProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  className?: string;
  /** The Badge visual variant */
  variant?: BadgeVariantType;
  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`  */
  textClassName?: string | string[];
}

const variantsTextClassName: Partial<Record<BadgeVariantType, string>> = {
  [BadgeVariantEnum.primary]: 'u-textWhite hover:u-textWhite',
  [BadgeVariantEnum.primary_subtle]: 'u-textPrimary hover:u-textPrimary',
};

export const variantsClassName: Record<BadgeVariantType, string> = {
  [BadgeVariantEnum.default]: 'u-textGray hover:u-textGray u-backgroundUltraLight',
  [BadgeVariantEnum.white]: 'u-texDark hover:u-texDark u-backgroundWhite',
  [BadgeVariantEnum.black]: 'u-textWhite hover:u-textWhite u-backgroundBlack',
  [BadgeVariantEnum.primary]: 'u-backgroundPrimary',
  [BadgeVariantEnum.primary_subtle]: 'u-backgroundPrimaryLighter',
  [BadgeVariantEnum.information]: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  [BadgeVariantEnum.information_subtle]: 'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  [BadgeVariantEnum.warning]: 'u-textDark hover:u-textDark u-backgroundWarning',
  [BadgeVariantEnum.warning_subtle]: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  [BadgeVariantEnum.positive]: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  [BadgeVariantEnum.positive_subtle]: 'u-textPositive hover:u-textPositive u-backgroundPositiveLighter',
  [BadgeVariantEnum.negative]: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  [BadgeVariantEnum.negative_subtle]: 'u-textNegative hover:u-textNegative u-backgroundNegativeLighter',
};

const getTextClassName = (variant: BadgeVariantType, textClassName?: string | string[]) => {
  if (Object.keys(variantsTextClassName).includes(variant)) {
    return textClassName || variantsTextClassName[variant];
  }
  return undefined;
};

export const Badge: AhaRefForwardingComponent<React.ElementType, BadgeProps> = React.forwardRef(
  (
    {
      className,
      textClassName,
      variant = BadgeVariantEnum.default,
      as,
      ...props
    }: BadgeProps,
    ref: React.ForwardedRef<HTMLSpanElement>,
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

const BadgeWithDisplayName = Object.assign(Badge, {
  displayName: 'Badge',
});

export default BadgeWithDisplayName;
