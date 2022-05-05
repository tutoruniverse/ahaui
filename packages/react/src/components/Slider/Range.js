import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Range as RangeBase } from 'rc-slider';

const propTypes = {
  variant: PropTypes.oneOf([
    'primary',
    'accent',
    'warning',
    'positive',
    'negative',
  ]),
};

const Range = React.forwardRef(({ variant, tipFormatter, tipProps, ...props }, ref) => (
  <RangeBase
    ref={ref}
    {...props}
    prefixCls="Slider"
    className={classNames(
      'u-positionRelative u-widthFull u-paddingVerticalTiny u-marginBottomLarge',
      variant && `Slider--${variant}`
    )}
  />
));

Range.displayName = 'Slider.Range';
Range.propTypes = propTypes;
Range.defaultProps = {};
export default Range;
