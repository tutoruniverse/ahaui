import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useMergedRefs from '@restart/hooks/useMergedRefs';

import usePopper from 'hooks/usePopper';
import type { Placement } from 'hooks/usePopper';
import useRootClose from 'hooks/useRootClose';
import type { RootCloseOptions } from 'hooks/useRootClose';
import useWaitForDOMRef from 'hooks/useWaitForDOMRef';
import type { DOMContainer } from 'hooks/useWaitForDOMRef';

import createPopperConfig, { PopperConfigBeforeTransformation } from 'utils/createPopperConfig';
import { AhaRefForwardingComponent, PlacementEnum } from 'types/common';
import { TooltipProps } from 'components/Tooltip';
import { TransitionProps } from 'react-transition-group/Transition';

export type OverlayChildrenProps = Omit<TooltipProps, 'id'>;

type TransitionCallbacks = Pick<
  TransitionProps,
  | 'onExit'
  | 'onExiting'
  | 'onExited'
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
>;

type OverlayChildren = (props: OverlayChildrenProps) => React.ReactNode;

export interface OverlayProps extends TransitionCallbacks {
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
  popperConfig?: PopperConfigBeforeTransformation;
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
  transition?: React.FC<Partial<TransitionProps>>;
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
  children: OverlayChildren;
}

const OverlayBase: AhaRefForwardingComponent<React.ElementType, OverlayProps, OverlayChildren> = React.forwardRef((
  props: OverlayProps,
  outerRef: React.ForwardedRef<HTMLElement>,
) => {
  const {
    flip = false,
    placement,
    containerPadding,
    popperConfig = {},
    transition: TransitionElement,
  } = props;
  const [rootElement, attachRef] = useCallbackRef<HTMLElement>();
  const [arrowElement, attachArrowRef] = useCallbackRef<HTMLDivElement>();
  const mergedRef = useMergedRefs<HTMLElement | null>(attachRef, outerRef);

  const container = useWaitForDOMRef(props.container);
  const target = useWaitForDOMRef(props.target);
  const [exited, setExited] = useState(!props.show);

  const { styles, arrowStyles, ...popper } = usePopper(target, rootElement, createPopperConfig({
    placement: placement || PlacementEnum.bottom,
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
  const handleHidden: TransitionCallbacks['onExit'] = (...args) => {
    setExited(true);

    props.onExited?.(...args);
  };

  const mountOverlay = props.show || !!(TransitionElement && !exited);

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
    styleTooltip: styles,
    ref: mergedRef,
    arrowProps: {
      style: arrowStyles,
      ref: attachArrowRef,
    },
  } as unknown as TooltipProps);

  if (TransitionElement) {
    const { onExit, onExiting, onEnter, onEntering, onEntered } = props;

    child = (
      <TransitionElement
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
      </TransitionElement>
    );
  }

  return container ? ReactDOM.createPortal(child, container) : null;
});

const OverlayBaseWithDisplayName = Object.assign(OverlayBase, {
  displayName: 'OverlayBase',
});

export default OverlayBaseWithDisplayName;
