import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /** Custom label */
  label: PropTypes.string,
  /**
   * The `Separator` visual variant
   */
  variant: PropTypes.oneOf([
    'light',
    'lighter',
    'primary',
    'positive',
    'negative',
    'gray',
  ]),
  lineType: PropTypes.oneOf([
    'solid',
    'dashed',
  ]),
};

const defaultProps = {
  variant: 'light',
  lineType: 'solid',
};

const variantsClassName = {
  light: {
    label: 'u-textLight hover:u-textLight',
    line: 'u-borderLight',
  },
  lighter: {
    label: 'u-textLight hover:u-textLight',
    line: 'u-borderUltraLight',
  },
  primary: {
    label: 'u-textPrimary hover:u-textPrimary',
    line: 'u-borderPrimary',
  },
  positive: {
    label: 'u-textPositive hover:u-textPositive',
    line: 'u-borderPositive',
  },
  negative: {
    label: 'u-textNegative hover:u-textNegative',
    line: 'u-borderNegative',
  },
  gray: {
    label: 'u-textGray hover:u-textGray',
    line: 'u-borderGray',
  },
};

const Separator = React.forwardRef(({ className, label, lineType, variant, as: Component = 'div', ...props }, ref) => {
  const lineClass = classNames(
    'Separator-line u-border u-sizeFill',
    'u-border u-borderRightNone u-borderBottomNone u-borderLeftNone',
    variant && variantsClassName[variant].line,
    lineType === 'dashed' && 'u-borderDashed'
  );
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
      <React.Fragment>
        <div className={classNames(
          'Separator-label',
          'u-flexShrink0 u-paddingHorizontalExtraSmall u-fontMedium',
          variant && variantsClassName[variant].label,
        )}
        >
          {label}
        </div>
        <div className={lineClass} />
      </React.Fragment>
      )}
    </Component>
  );
});

Separator.displayName = 'Separator';
Separator.defaultProps = defaultProps;
Separator.propTypes = propTypes;
export default Separator;
