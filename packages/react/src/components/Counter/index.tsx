import React from 'react';
import classNames from 'classnames';
import Icon, { IconName, IconNameEnum } from 'components/Icon';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

export enum CounterVariantEnum {
  primary='primary',
  secondary='secondary',
  accent='accent',
  information='information',
  warning='warning',
  positive='positive',
  negative='negative',
  white='white',
}

type CounterVariant = EnumToUnion<CounterVariantEnum>;

export interface CounterProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /** The Counter visual variant */
  variant?: CounterVariant;

  /** Custom label  */
  label?: string | (() => React.ReactElement);

  /** Custom number  */
  number?: string | (() => React.ReactElement);

  /** The icon to display. The name can get from Component `Icon` */
  iconLeft?: IconName | (() => React.ReactElement);
}

export const variantsClassName = {
  [CounterVariantEnum.primary]: {
    text: 'u-textPrimary',
    icon: 'u-textPrimary',
  },
  [CounterVariantEnum.secondary]: {
    text: 'u-textDark',
    icon: 'u-textGray',
  },
  [CounterVariantEnum.accent]: {
    text: 'u-textAccent',
    icon: 'u-textAccent',
  },
  [CounterVariantEnum.warning]: {
    text: 'u-textWarning',
    icon: 'u-textWarning',
  },
  [CounterVariantEnum.information]: {
    text: 'u-textInformation',
    icon: 'u-textInformation',
  },
  [CounterVariantEnum.positive]: {
    text: 'u-textPositive',
    icon: 'u-textPositive',
  },
  [CounterVariantEnum.negative]: {
    text: 'u-textNegative',
    icon: 'u-textNegative',
  },
  [CounterVariantEnum.white]: {
    text: 'u-textWhite',
    icon: 'u-textWhite',
  },
} as const;

const Counter: AhaRefForwardingComponent<React.ElementType, CounterProps> = React.forwardRef(
  (
    {
      className,
      children,
      iconLeft = IconNameEnum.time,
      label,
      number,
      variant = CounterVariantEnum.secondary,
      as,
      ...props
    }: CounterProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
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
            {typeof iconLeft === 'function'
              ? iconLeft()
              : (
                <Icon
                  data-testid="counter-icon-left"
                  name={iconLeft}
                  className={classNames(variant && variantsClassName[variant].icon)}
                  size="medium"
                />
              )}
          </span>
        )}

        {label && (
          typeof label === 'function'
            ? label()
            : (
              <span
                className={classNames(
                  'u-text500',
                  variant && variantsClassName[variant].text,
                )}
                data-testid="counter-label"
              >
                {label}
              </span>
            )
        )}

        {number != null && (
          <span className="u-marginHorizontalExtraSmall">
            {typeof number === 'function'
              ? number()
              : (
                <span
                  className={classNames(
                    'u-text600 u-fontMedium',
                    variant && variantsClassName[variant].text,
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

const CounterWithDisplayName = Object.assign(Counter, {
  displayName: 'Counter',
});

export default CounterWithDisplayName;
