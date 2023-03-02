import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * Loader size variants
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['extraSmall', 'small', 'medium', 'large']),
  /** Set the duration of the animation skeleton */
  duration: PropTypes.number,
};

const defaultProps = {
  duration: 2000,
};

const sizes = {
  extraSmall: 12,
  small: 16,
  medium: 32,
  large: 64,
};

const Loader = React.forwardRef(({ className, size, duration, ...props }, ref) => {
  const styles = {
    width: sizes[size] || sizes.medium,
    height: sizes[size] || sizes.medium,
    animationDuration: `${duration}ms`,
  };
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'Loader',
        'u-roundedInfinity u-border u-borderTopPrimary u-inlineBlock u-spin',
        (size === 'small' || size === 'extraSmall') ? 'u-borderSmall' : 'u-borderMedium',
        className && className
      )}
      style={styles}
    />

  );
});

Loader.displayName = 'Loader';
Loader.defaultProps = defaultProps;
Loader.propTypes = propTypes;
export default Loader;
