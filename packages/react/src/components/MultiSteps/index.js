import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './Item';

const propTypes = {
  /**
   * Defines the current active step index.
   * @controllable onChange
   * */
  current: PropTypes.number,
  /** Custom current label */
  currentLabel: PropTypes.string,
  /**
   * Callback fired when the current active step changes.
   * @controllable current
   * */
  onChange: PropTypes.func,
  /** Define direction of the MultiSteps */
  direction: PropTypes.oneOf([
    'horizontal',
    'vertical',
  ]),
  /**
   * The MultiSteps visual variant
   */
  variant: PropTypes.oneOf([
    'primary',
    'accent',
    'positive',
    'warning',
    'negative',
    'white',
  ]),
};

const defaultProps = {
  direction: 'horizontal',
  variant: 'primary',
};

const MultiSteps = React.forwardRef(({ className, current, currentLabel, children, variant, direction, onChange, as: Component = 'div', ...props }, ref) => {
  const numChildren = React.Children.count(children);
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    return React.cloneElement(
      child, ({
        className: direction !== 'vertical' && `u-size${numChildren / numChildren}of${numChildren}`,
        style: direction === 'vertical' ? { height: `calc(100% * 1/${numChildren})` } : null,
        isLast: index === numChildren - 1,
        isCompleted: index < current,
        isActive: index === current,
        step: index + 1,
        onClick: () => onChange(index),
        currentLabel,
        direction,
        variant,
      })
    );
  });
  return (
    <Component
      ref={ref}
      {...props}
      className={classNames(
        'MultiSteps',
        'u-flex u-text200 u-fontMedium',
        direction === 'vertical' && 'u-flexColumn MultiSteps--vertical',
        className && className
      )}
    >
      {modifiedChildren}
    </Component>
  );
});

MultiSteps.displayName = 'MultiSteps';
MultiSteps.defaultProps = defaultProps;
MultiSteps.propTypes = propTypes;
MultiSteps.Item = Item;
export default MultiSteps;
