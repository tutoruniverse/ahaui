import { contains } from 'dom-helpers';
import React, { cloneElement, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Overlay from './index';

const normalizeDelay = delay => ((delay && typeof delay === 'object') ? delay : { show: delay, hide: delay });
const triggerType = PropTypes.oneOf(['click', 'hover', 'focus']);
const propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Specify which action or actions trigger Overlay visibility
   * @type {'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}
   */
  trigger: PropTypes.oneOfType([triggerType, PropTypes.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      show: PropTypes.number,
      hide: PropTypes.number,
    }),
  ]),

  /**
   * If true, also register hover events to overlay. Must use with delay.hide and hover trigger.
   */
  hoverOverlay: PropTypes.bool,

  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultShow: PropTypes.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: PropTypes.oneOfType([PropTypes.func, PropTypes.element.isRequired]),

  /**
   * A Popper.js config object passed to the the underlying popper instance.
   */
  popperConfig: PropTypes.object,

  // Overridden props from `<Overlay>`.
  /**
   * @private
   */
  target: PropTypes.oneOf([null]),

  /**
   * @private
   */
  onHide: PropTypes.oneOf([null]),

  /**
   * @private
   */
  show: PropTypes.oneOf([null]),
};

const defaultProps = {
  popperConfig: {},
  trigger: ['hover', 'focus'],
  hoverOverlay: false,
};

const Trigger = React.forwardRef(({ trigger, overlay, delay, children, defaultShow, popperConfig, hoverOverlay,
  ...props }, ref) => {
  const triggerRef = useRef(ref);
  const [show, setShow] = useState(!!defaultShow);
  const [showTimer, setShowTimer] = useState(null);
  const [hideTimer, setHideTimer] = useState(null);
  const child = React.Children.only(children);
  const getChildProps = () => React.Children.only(children).props;

  const handleShow = () => {
    const delayState = normalizeDelay(delay);
    if (!delayState.show) {
      setShow(true);
    } else {
      setShowTimer(setTimeout(() => {
        setShow(true);
      }, delayState.show));
    }
  };
  const handleHide = () => {
    const delayState = normalizeDelay(delay);
    if (!delayState.hide) {
      setShow(false);
    } else {
      setHideTimer(setTimeout(() => {
        setShow(false);
      }, delayState.hide));
    }
  };

  const handleClick = (e) => {
    const { onClick } = getChildProps();
    setShow(!show);
    if (onClick) onClick(e);
  };

  const handleMouseOverOut = (handler, e, relatedNative) => {
    const target = e.currentTarget;
    const related = e.relatedTarget || e.nativeEvent[relatedNative];
    if ((!related || related !== target) && !contains(target, related)) {
      const isShow = (relatedNative === 'fromElement');
      if (isShow) {
        hideTimer && clearTimeout(hideTimer);
        setHideTimer(null);
      } else {
        showTimer && clearTimeout(showTimer);
        setShowTimer(null);
      }
      handler(e);
    }
  };
  const handleMouseOver = e => handleMouseOverOut(handleShow, e, 'fromElement');
  const handleMouseOut = e => handleMouseOverOut(handleHide, e, 'toElement');
  const triggerProps = {};
  const overlayProps = {};

  const triggers = trigger == null ? [] : [].concat(trigger);
  if (triggers.indexOf('click') !== -1) {
    triggerProps.onClick = handleClick;
  }

  if (triggers.indexOf('focus') !== -1) {
    triggerProps.onFocus = handleShow;
    triggerProps.onBlur = handleHide;
  }
  if (triggers.indexOf('hover') !== -1) {
    warning(
      triggers.length >= 1,
      'Specifying only the `"hover"` trigger limits the '
      + 'visibility of the overlay to just mouse users. Consider also '
      + 'including the `"focus"` trigger so that touch and keyboard only '
      + 'users can see the overlay as well.',
    );
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
    if (hoverOverlay) {
      overlayProps.onMouseOver = handleMouseOver;
      overlayProps.onMouseOut = handleMouseOut;
    }
  }

  return (
    <>
      {cloneElement(child, { ref: triggerRef, ...triggerProps })}
      <Overlay
        {...props}
        popperConfig={{
          ...popperConfig,
          modifiers: {
            ...popperConfig.modifiers,
          },
        }}
        show={show}
        onHide={handleHide}
        target={triggerRef.current}
      >
        {props => overlay({ ...props, ...overlayProps })}
      </Overlay>
    </>
  );
});
Trigger.displayName = 'OverlayTrigger';
Trigger.propTypes = propTypes;
Trigger.defaultProps = defaultProps;
export default Trigger;
