import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import PopperJS from 'popper.js';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import usePopper from 'hooks/usePopper';
import useRootClose from 'hooks/useRootClose';
import useWaitForDOMRef from 'hooks/useWaitForDOMRef';

const propTypes = {
  /**
   * Set the visibility of the Overlay
   * @default false
   */
  show: PropTypes.bool,

  /**
   * Specify where the overlay element is positioned in relation to the target element
   * Refer to the [placement docs](https://popper.js.org/index.html#placements) for more info
   * @default 'top'
   */
  placement: PropTypes.oneOf(PopperJS.placements),

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: PropTypes.any,

  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container: PropTypes.any,

  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   * Refer to the [flip docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled) for more info
   * @default true
   */
  flip: PropTypes.bool,
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig: PropTypes.object,
  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
  */
  children: PropTypes.func.isRequired,
  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding: PropTypes.number,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: PropTypes.func,
  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: PropTypes.bool,

  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent: PropTypes.oneOf(['click', 'mousedown']),

  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled: PropTypes.bool,

  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition: PropTypes.elementType,
};
const defaultProps = {
  popperConfig: {},
  containerPadding: 8,
  flip: false,
};
const OverlayBase = React.forwardRef((props, outerRef) => {
  const {
    flip,
    placement,
    containerPadding,
    popperConfig = {},
    transition: Transition,
  } = props;
  const [rootElement, attachRef] = useCallbackRef();

  const [arrowElement, attachArrowRef] = useCallbackRef();
  const mergedRef = useMergedRefs(attachRef, outerRef);
  const container = useWaitForDOMRef(props.container);
  const target = useWaitForDOMRef(props.target);
  const [exited, setExited] = useState(!props.show);
  const { modifiers = {} } = popperConfig;
  const { styles, arrowStyles, ...popper } = usePopper(target, rootElement, {
    ...popperConfig,
    placement: placement || 'bottom',
    enableEvents: props.show,
    modifiers: {
      ...modifiers,
      preventOverflow: {
        padding: containerPadding || 8,
        ...modifiers.preventOverflow,
      },
      arrow: {
        ...modifiers.arrow,
        enabled: !!arrowElement,
        element: arrowElement,
      },
      flip: {
        enabled: !!flip,
        ...modifiers.preventOverflow,
      },
    },
  });
  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }
  const handleHidden = (...args) => {
    setExited(true);

    if (props.onExited) {
      props.onExited(...args);
    }
  };

  const mountOverlay = props.show || (Transition && !exited);

  useRootClose(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent,
  });

  if (!mountOverlay) {
    // Don't bother showing anything if we don't have to.
    return null;
  }

  let child = props.children({
    ...popper,
    show: props.show,
    styleTooltip: styles,
    ref: mergedRef,
    arrowProps: {
      style: arrowStyles,
      ref: attachArrowRef,
    },
  });
  if (Transition) {
    child = (
      <Transition
        in={props.show}
        appear
        onExited={handleHidden}
      >
        {child}
      </Transition>
    );
  }

  return container ? ReactDOM.createPortal(child, container) : null;
});

OverlayBase.displayName = 'Overlay';
OverlayBase.propTypes = propTypes;
OverlayBase.defaultProps = defaultProps;
export default OverlayBase;
