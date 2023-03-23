import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useMergedRefs from '@restart/hooks/useMergedRefs';

import usePopper from 'hooks/usePopper';
import type { Placement, PopperConfig, State } from 'hooks/usePopper';
import useRootClose from 'hooks/useRootClose';
import type { RootCloseOptions } from 'hooks/useRootClose';
import useWaitForDOMRef from 'hooks/useWaitForDOMRef';
import type { DOMContainer } from 'hooks/useWaitForDOMRef';

import createPopperConfig from 'utils/createPopperConfig';

interface TransitionCallbacks {
  onEnter?(node: HTMLElement, isAppearing: boolean): any;
  onEntered?(node: HTMLElement, isAppearing: boolean): any;
  onEntering?(node: HTMLElement, isAppearing: boolean): any;
  onExit?(node: HTMLElement): any;
  onExited?(node: HTMLElement): any;
  onExiting?(node: HTMLElement): any;
}

interface OverlayBaseProps extends TransitionCallbacks {
  /**
   * Enables the Popper.js `flip` modifier, allowing the Overlay to
   * automatically adjust it's placement in case of overlap with the viewport or toggle.
   */
  flip?: boolean;
  /**
   * Specify where the overlay element is positioned in relation to the target element
   */
  placement?: Placement;
  /**
   * Control how much space there is between the edge of the boundary element and overlay.
   * A convenience shortcut to setting `popperConfig.modfiers.preventOverflow.padding`
   */
  containerPadding?: number;
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   */
  popperConfig?: PopperConfig;
  /**
   * A DOM Element, Ref to an element, or function that returns either. The `container` will have the Portal children
   * appended to it.
   */
  container?: DOMContainer;
  /**
   * A DOM Element, Ref to an element, or function that returns either. The `target` element is where
   * the overlay is positioned relative to.
   */
  target: DOMContainer;
  /**
   * Set the visibility of the Overlay
   * @default false
   */
  show?: boolean;
  /**
   * A `react-transition-group@2.0.0` `<Transition/>` component
   * used to animate the overlay as it changes visibility.
   */
  transition?: React.ComponentType<
    { in?: boolean; appear?: boolean } & TransitionCallbacks
  >;
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide?: (e: Event) => void;
  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose?: boolean;
  /**
   * Specify disabled for disable RootCloseWrapper
   */
  rootCloseDisabled?: boolean;
  /**
   * Specify event for toggling overlay
   */
  rootCloseEvent?: RootCloseOptions['clickTrigger'];
  /**
   * A render prop that returns an element to overlay and position. See
   * the [react-popper documentation](https://github.com/FezVrasta/react-popper#children) for more info.
  */
  children: (value: {
    show: boolean;
    placement: Placement;
    update: () => void;
    outOfBoundaries: boolean;
    styleTooltip: React.CSSProperties;
    state?: State;
    ref: React.RefCallback<HTMLElement>;
    arrowProps: Record<string, any> & {
      ref: React.RefCallback<HTMLElement>;
      style: React.CSSProperties;
    };
  }) => React.ReactNode;
}

const defaultProps = {
  popperConfig: {},
  containerPadding: 8,
  flip: false,
};
const OverlayBase = React.forwardRef<HTMLElement, OverlayBaseProps>((props, outerRef) => {
  const {
    flip,
    placement,
    containerPadding,
    popperConfig = {},
    transition: Transition,
  } = props;
  const [rootElement, attachRef] = useCallbackRef<HTMLElement>();
  const [arrowElement, attachArrowRef] = useCallbackRef<Element>();
  const mergedRef = useMergedRefs<HTMLElement | null>(attachRef, outerRef);

  const container = useWaitForDOMRef(props.container);
  const target = useWaitForDOMRef(props.target);

  const [exited, setExited] = useState(!props.show);

  const { styles, arrowStyles, ...popper } = usePopper(target, rootElement, createPopperConfig({
    placement: placement || 'bottom',
    containerPadding: containerPadding || 8,
    eventsEnabled: !!props.show,
    arrowElement,
    flip: !!flip,
    popperConfig,
  }));

  if (props.show) {
    if (exited) setExited(false);
  } else if (!props.transition && !exited) {
    setExited(true);
  }
  const handleHidden: TransitionCallbacks['onExited'] = (...args) => {
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
    show: !!props.show,
    styleTooltip: styles as React.CSSProperties,
    ref: mergedRef,
    arrowProps: {
      style: arrowStyles as React.CSSProperties,
      ref: attachArrowRef,
    },
  });
  if (Transition) {
    const { onExit, onExiting, onEnter, onEntering, onEntered } = props;

    child = (
      <Transition
        in={props.show}
        appear
        onExit={onExit}
        onExiting={onExiting}
        onExited={handleHidden}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
      >
        {child}
      </Transition>
    );
  }

  return container ? ReactDOM.createPortal(child, container) : null;
});

OverlayBase.displayName = 'Overlay';
OverlayBase.defaultProps = defaultProps;
export default OverlayBase;
