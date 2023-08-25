import React from 'react';
import classNames from 'classnames';
import { VariantColorsEnum, VariantColors, AsProp, AhaRefForwardingComponent } from 'types/common';

export type VariantClassName = Extract<VariantColors,
  | 'black'
  | 'white'
  | 'primary'
  | 'primary_subtle'
  | 'information'
  | 'information_subtle'
  | 'accent'
  | 'accent_subtle'
  | 'warning'
  | 'warning_subtle'
  | 'positive'
  | 'positive_subtle'
  | 'negative'
  | 'negative_subtle'
>;

export type VariantTextClassName = Extract<VariantClassName, 'primary' | 'primary_subtle' | 'accent' | 'accent_subtle'>;

export const variantsTextClassName = {
  [VariantColorsEnum.primary]: 'u-textWhite hover:u-textWhite',
  [VariantColorsEnum.primary_subtle]: 'u-textPrimary hover:u-textPrimary',
  [VariantColorsEnum.accent]: 'u-textWhite hover:u-textWhite ',
  [VariantColorsEnum.accent_subtle]: 'u-textDark hover:u-textDark ',
};

export const variantsClassName = {
  [VariantColorsEnum.black]: 'u-textWhite hover:u-textWhite u-backgroundDarker',
  [VariantColorsEnum.white]: 'u-textGray hover:u-textGray u-backgroundWhite',
  [VariantColorsEnum.primary]: 'u-textWhite hover:u-textWhite u-backgroundPrimary',
  [VariantColorsEnum.primary_subtle]: 'u-textDark hover:u-textDark u-backgroundPrimaryLighter',
  [VariantColorsEnum.information]: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  [VariantColorsEnum.information_subtle]: 'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  [VariantColorsEnum.accent]: 'u-backgroundAccent',
  [VariantColorsEnum.accent_subtle]: 'u-backgroundAccentLighter',
  [VariantColorsEnum.warning]: 'u-textDark hover:u-textDark u-backgroundWarning',
  [VariantColorsEnum.warning_subtle]: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  [VariantColorsEnum.positive]: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  [VariantColorsEnum.positive_subtle]: 'u-textDark hover:u-textDark u-backgroundPositiveLighter',
  [VariantColorsEnum.negative]: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  [VariantColorsEnum.negative_subtle]: 'u-textDark hover:u-textDark u-backgroundNegativeLighter',
};

type TextClassName = string | string[];

export interface TagProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * The visual style of the tag
   * @default 'primary'
   * */
  variant?: VariantClassName;

  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`, `accent`, `accent_subtle` */
  textClassName?: TextClassName;
}

const containTextClassNameVariants = [
  'primary',
  'primary_subtle',
  'accent',
  'accent_subtle',
];

export const checkIsVariantTextClassName = (variant: VariantClassName): variant is VariantTextClassName => containTextClassNameVariants.includes(variant);

const getVariantTextClassName = (variant: VariantClassName, textClassName: TextClassName): TextClassName => {
  if (checkIsVariantTextClassName(variant)) {
    return textClassName || variantsTextClassName[variant];
  }
  return '';
};

export const Tag: AhaRefForwardingComponent<React.ElementType, TagProps> = React.forwardRef(
  (
    {
      className,
      textClassName = '',
      variant = VariantColorsEnum.primary,
      as,
      ...props
    }: TagProps,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const Component = as || 'span';
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'Tag',
          'u-flexInline u-alignItemsCenter u-textCenter u-textNoWrap u-roundedMedium u-text200 hover:u-textDecorationNone',
          variant && variantsClassName[variant],
          getVariantTextClassName(variant, textClassName),
          className && className,
        )}
      />
    );
  });

const TagWithDisplayName = Object.assign(Tag, {
  displayName: 'Tag',
});

export default TagWithDisplayName;
