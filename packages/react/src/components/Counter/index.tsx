import React from 'react';
import classNames from 'classnames';
import Icon, { IconName } from 'components/Icon';
import { CounterVariantEnum as VariantEnum, type CounterVariant as Variant, PolymorphicComponentPropsWithRef, PolymorphicRef } from 'types/common';

type CounterProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
T,
{
   /** The Counter visual variant */
  variant?: Variant,
  /** Custom label  */
  label?: string | (() => React.ReactElement),
  /** Custom number  */
  number?: string | (() => React.ReactElement),
  /** The icon to display. The name can get from Component `Icon` */
  iconLeft?: IconName | (() => React.ReactElement),
}
>;

type CounterComponent = <T extends React.ElementType = 'div'>(props: CounterProps<T>) => React.ReactElement | null;

export const variantsClassName = {
  [VariantEnum.primary]: {
    text: 'u-textPrimary',
    icon: 'u-textPrimary',
  },
  [VariantEnum.secondary]: {
    text: 'u-textDark',
    icon: 'u-textGray',
  },
  [VariantEnum.accent]: {
    text: 'u-textAccent',
    icon: 'u-textAccent',
  },
  [VariantEnum.warning]: {
    text: 'u-textWarning',
    icon: 'u-textWarning',
  },
  [VariantEnum.information]: {
    text: 'u-textInformation',
    icon: 'u-textInformation',
  },
  [VariantEnum.positive]: {
    text: 'u-textPositive',
    icon: 'u-textPositive',
  },
  [VariantEnum.negative]: {
    text: 'u-textNegative',
    icon: 'u-textNegative',
  },
  [VariantEnum.white]: {
    text: 'u-textWhite',
    icon: 'u-textWhite',
  },
};

const Counter : CounterComponent = React.forwardRef(
  <T extends React.ElementType>(
    { className,
      children,
      iconLeft = 'time',
      label,
      number,
      variant = VariantEnum.secondary,
      as,
      ...props } : CounterProps<T>,
    ref: PolymorphicRef<T>) => {
    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Counter',
          'u-flex u-alignItemsCenter u-lineHeightReset',
          className && className,
        )}
      >
        {iconLeft && (
        <span className="u-marginRightTiny">
          {typeof (iconLeft) === 'function'
            ? iconLeft()
            : (
              <Icon
                name={iconLeft}
                className={classNames(
                  variant ? variantsClassName[variant].icon : 'u-textGray',
                )}
                size="medium"
                data-testid="icon-left"
              />
            )}
        </span>
        )}

        {label && (
          typeof (label) === 'function'
            ? label()
            : (
              <span
                className={classNames(
                  'u-text500',
                  variant ? variantsClassName[variant].text : 'u-textDark',
                )}
                data-testid="counter-label"
              >
                {label}
              </span>
            )
        )}
        {number && (
        <span className="u-marginHorizontalExtraSmall">
          {typeof (number) === 'function'
            ? number()
            : (
              <span
                className={classNames(
                  'u-text600 u-fontMedium',
                  variant ? variantsClassName[variant].text : 'u-textDark',
                )}
                data-testid="counter-number"
              >
                {number}
              </span>
            )}
        </span>
        )}
        {children}
      </Component>
    );
  });

export default Counter;
