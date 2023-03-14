import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/Icon';

const propTypes = {
  /** The Counter visual variant */
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'accent',
    'information',
    'warning',
    'positive',
    'negative',
    'white',
  ]),
  /** Custom label  */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Custom number  */
  number: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** The icon to display. The name can get from Component `Icon` */
  iconLeft: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
};

const defaultProps = {
  iconLeft: 'time',
  variant: 'secondary',
};

const variantsClassName = {
  primary: {
    text: 'u-textPrimary',
    icon: 'u-textPrimary',
  },
  secondary: {
    text: 'u-textDark',
    icon: 'u-textGray',
  },
  accent: {
    text: 'u-textAccent',
    icon: 'u-textAccent',
  },
  warning: {
    text: 'u-textWarning',
    icon: 'u-textWarning',
  },
  information: {
    text: 'u-textInformation',
    icon: 'u-textInformation',
  },
  positive: {
    text: 'u-textPositive',
    icon: 'u-textPositive',
  },
  negative: {
    text: 'u-textNegative',
    icon: 'u-textNegative',
  },
  white: {
    text: 'u-textWhite',
    icon: 'u-textWhite',
  },
};

const Counter = React.forwardRef(({ className, children, iconLeft, label, number, variant, as: Component = 'div', ...props }, ref) => (
  <Component
    ref={ref}
    {...props}
    className={classNames(
      'Counter',
      'u-flex u-alignItemsCenter u-lineHeightReset',
      className && className
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
                variant ? variantsClassName[variant].icon : 'u-textGray'
              )}
              size="medium"
            />
          )
        }
      </span>
    )}

    {label && (
      typeof (label) === 'function'
        ? label()
        : (
          <span className={classNames(
            'u-text500',
            variant ? variantsClassName[variant].text : 'u-textDark'
          )}
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
            <span className={classNames(
              'u-text600 u-fontMedium',
              variant ? variantsClassName[variant].text : 'u-textDark'
            )}
            >
              {number}
            </span>
          )
        }
      </span>
    )}
    {children}
  </Component>
));


Counter.displayName = 'Counter';
Counter.defaultProps = defaultProps;
Counter.propTypes = propTypes;
export default Counter;
