import React from 'react';
import classNames from 'classnames';
import {
  AhaRefForwardingComponent,
  AsProp,
  EnumToUnion,
  VariantColors,
  VariantColorsEnum,
} from 'types/common';

enum LineEnum {
  solid = 'solid',
  dashed = 'dashed',
}

type Line = EnumToUnion<LineEnum>;

export type SeparatorVariant = Extract<'light' | 'lighter' | 'primary' | 'positive' | 'negative' | 'gray', VariantColors>

export interface SeparatorProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * Custom label.
   */
  label?: string;
  /**
   * The `Separator` visual variant.
   * @default 'light'
   */
  variant?: SeparatorVariant;
  /**
   * Solid or dashed line.
   * @default 'solid'
   */
  lineType?: Line;
}

export const variantsClassName = {
  [VariantColorsEnum.light]: {
    label: 'u-textLight hover:u-textLight',
    line: 'u-borderLight',
  },
  [VariantColorsEnum.lighter]: {
    label: 'u-textLight hover:u-textLight',
    line: 'u-borderUltraLight',
  },
  [VariantColorsEnum.primary]: {
    label: 'u-textPrimary hover:u-textPrimary',
    line: 'u-borderPrimary',
  },
  [VariantColorsEnum.positive]: {
    label: 'u-textPositive hover:u-textPositive',
    line: 'u-borderPositive',
  },
  [VariantColorsEnum.negative]: {
    label: 'u-textNegative hover:u-textNegative',
    line: 'u-borderNegative',
  },
  [VariantColorsEnum.gray]: {
    label: 'u-textGray hover:u-textGray',
    line: 'u-borderGray',
  },
};

export const Separator: AhaRefForwardingComponent<React.ElementType, SeparatorProps> = React.forwardRef(
  (
    {
      className,
      label,
      lineType = LineEnum.solid,
      variant = VariantColorsEnum.light,
      as,
      ...props
    }: SeparatorProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const lineClass = classNames(
      'Separator-line u-border u-sizeFill',
      'u-border u-borderRightNone u-borderBottomNone u-borderLeftNone',
      variant && variantsClassName[variant].line,
      lineType === 'dashed' && 'u-borderDashed',
    );

    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Separator',
          'u-flex u-justifyContentBetween u-widthFull u-alignItemsCenter',
          className && className,
        )}
      >
        <div className={lineClass} />
        {label && (
        <>
          <div className={classNames(
            'Separator-label',
            'u-flexShrink0 u-paddingHorizontalExtraSmall u-fontMedium',
            variant && variantsClassName[variant].label,
          )}
          >
            {label}
          </div>
          <div className={lineClass} />
        </>
        )}
      </Component>
    );
  });

const SeparatorWithDisplayName = Object.assign(Separator, {
  displayName: 'Separator',
});

export default SeparatorWithDisplayName;
