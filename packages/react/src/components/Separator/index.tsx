import React from 'react';
import classNames from 'classnames';
import {
  EnumToUnion,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
  VariantColors,
  VariantColorsEnum,
} from 'types/common';

enum LineEnum {
  solid = 'solid',
  dashed = 'dashed',
}

type Line = EnumToUnion<LineEnum>;

export type SeparatorVariant = Extract<'light' | 'lighter' | 'primary' | 'positive' | 'negative' | 'gray', VariantColors>

interface SeparatorBasicProps {
  /**
   * Custom label.
   */
  label?: string,
  /**
   * The `Separator` visual variant.
   * @default 'light'
   */
  variant?: SeparatorVariant,
  /**
   * Solid or dashed line.
   * @default 'solid'
   */
  lineType?: Line,
}

type SeparatorProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, SeparatorBasicProps>
type SeparatorComponent = <T extends React.ElementType = 'div'>(props: SeparatorProps<T>) => React.ReactElement | null;

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

const Separator: SeparatorComponent = React.forwardRef(
  <T extends React.ElementType>(
    {
      className,
      label,
      lineType = LineEnum.solid,
      variant = VariantColorsEnum.light,
      as,
      ...props
    }: SeparatorProps<T>,
    ref: PolymorphicRef<T>) => {
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

export default Separator;
