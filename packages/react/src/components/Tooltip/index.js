import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Remove arrow
   */
  noArrow: PropTypes.bool,
  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * This is generally provided by the `Overlay` component positioning the tooltip
   */
  placement: PropTypes.oneOf([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * This is generally provided by the `Overlay` component positioning the tooltip
   * @type {{ ref: ReactRef, style: Object }}
   */
  arrowProps: PropTypes.shape({
    ref: PropTypes.any,
    style: PropTypes.object,
  }),
  /** The Tooltip visual variant */
  variant: PropTypes.oneOf(['white', 'black']),
  /** @private */
  scheduleUpdate: PropTypes.func,

  /** @private */
  outOfBoundaries: PropTypes.any,
};
const defaultProps = {
  placement: 'right',
  noArrow: false,
  variant: 'black',
};
const variantsClassName = {
  black: 'u-textWhite u-backgroundBlack',
  white: 'u-textDark u-backgroundWhite u-border',
};
const Tooltip = React.forwardRef(
  (
    {
      className,
      show,
      variant,
      children,
      noArrow,
      arrowProps,
      styleTooltip,
      placement,
      scheduleUpdate: _,
      outOfBoundaries: _1,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      {...props}
      style={styleTooltip}
      x-placement={placement}
      className={classNames(
        'Tooltip',
        variant && `Tooltip--${variant}`,
        'u-positionAbsolute u-zIndexTooltip u-roundedMedium',
        show
          ? 'u-opacityReset u-visibilityVisible'
          : 'u-opacityNone u-visibilityHidden',
        placement && `Tooltip--${placement}`,
        variant && variantsClassName[variant],
        className && className,
      )}
    >
      {!noArrow && (
        <div
          className={classNames('Tooltip-arrow', 'u-positionAbsolute')}
          {...arrowProps}
        />
      )}
      <div
        style={{ ...props.style }}
        className={classNames('Tooltip-body', 'u-text200 u-paddingExtraSmall')}
      >
        {children}
      </div>
    </div>
  ),
);

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = defaultProps;
Tooltip.propTypes = propTypes;
export default Tooltip;
