import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SliderBase from 'rc-slider';
import Range from './Range';
import Handle from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';

const propTypes = {
  /**
   * The Slider visual variant
   * @default 'primary'
   */
  variant: PropTypes.oneOf([
    'primary',
    'accent',
    'warning',
    'positive',
    'negative',
  ]),
  /** @private */
  vertical: PropTypes.bool,
};

const Slider = React.forwardRef(({ vertical, variant, ...props }, ref) => (
  <SliderBase
    ref={ref}
    {...props}
    vertical={vertical}
    prefixCls="Slider"
    className={classNames(
      'u-positionRelative',
      vertical ? 'u-heightFull u-paddingHorizontalTiny' : 'u-widthFull u-paddingVerticalTiny u-marginBottomLarge',
      variant && `Slider--${variant}`
    )}
  />
));

Slider.displayName = 'Slider';
Slider.propTypes = propTypes;
Slider.defaultProps = {};
Slider.Handle = Handle;
Slider.Range = Range;
Slider.createSliderWithTooltip = createSliderWithTooltip;
export default Slider;
