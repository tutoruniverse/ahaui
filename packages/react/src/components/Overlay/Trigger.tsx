import { contains } from 'dom-helpers';
import React, { cloneElement, useState, useRef, ReactElement } from 'react';
import warning from 'warning';
import type { AhaRefForwardingComponent, GenericFunction } from 'types/common';
import type { Placement } from 'hooks/usePopper';
import type { PopperConfigBeforeTransformation } from 'utils/createPopperConfig';
import OverlayBase, { OverlayChildrenProps, OverlayProps } from './Base';

type Delay = number | {
  show: number;
  hide: number;
}
const normalizeDelay = (delay: Delay) => ((delay && typeof delay === 'object') ? delay : { show: delay, hide: delay });

type Trigger = 'hover' | 'click' | 'focus' | Array<'hover' | 'click' | 'focus'>;

export interface OverlayTriggerProps extends Omit<OverlayProps, 'children' | 'target'> {
  children: ReactElement;
  /**
   * Specify which action or actions trigger Overlay visibility
   * @type {'hover' | 'click' |'focus' | Array<'hover' | 'click' |'focus'>}
   */
  trigger?: Trigger;

  /**
   * Specify where the overlay element is positioned in relation to the target element
   */
  placement?: Placement;

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   * @default 0
   */
  delay?: Delay;

  /**
   * If true, also register hover events to overlay. Must use with delay.hide and hover trigger.
   */
  hoverOverlay?: boolean;

  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultShow?: boolean;

  /**
   * An element or text to overlay next to the target.
   */
  overlay: ((value: OverlayChildrenProps) => React.ReactNode) | string;

  /**
   * A Popper.js config object passed to the the underlying popper instance.
   */
  popperConfig?: PopperConfigBeforeTransformation;

  // Overridden props from `<Overlay>`.
  /**
   * Ref to an element to where the overlay is positioned relative.
   */
  targetRef?: React.RefObject<HTMLElement>;
}

const Trigger: AhaRefForwardingComponent<React.ElementType, OverlayTriggerProps> = React.forwardRef(
  (
    {
      trigger = ['hover', 'focus'] as Trigger,
      overlay,
      delay = 0,
      children,
      defaultShow,
      popperConfig = {},
      hoverOverlay = false,
      targetRef = undefined,
      ...props
    }: OverlayTriggerProps,
    ref: React.ForwardedRef<HTMLElement>,
  ) => {
    const triggerRef = useRef(ref);
    const [show, setShow] = useState(!!defaultShow);
    const [showTimer, setShowTimer] = useState<NodeJS.Timeout | null>(null);
    const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
    const child = React.Children.only(children);
    const getChildProps = () => React.Children.only(children).props;

    const handleShow = () => {
      const delayState = normalizeDelay(delay);
      if (delayState.show === 0) {
        setShow(true);
      } else {
        setShowTimer(setTimeout(() => {
          setShow(true);
        }, delayState.show));
      }
    };
    const handleHide = () => {
      const delayState = normalizeDelay(delay);
      if (delayState.hide === 0) {
        setShow(false);
      } else {
        setHideTimer(setTimeout(() => {
          setShow(false);
        }, delayState.hide));
      }
    };

    const handleClick = (e: React.MouseEvent) => {
      const { onClick } = getChildProps();
      setShow(!show);
      onClick?.(e);
    };

    const handleMouseOverOut = (handler: () => void, e: React.MouseEvent, relatedNative: 'fromElement' | 'toElement') => {
      const target = e.currentTarget;
      const related = e.relatedTarget
      //@ts-ignore
      || e.nativeEvent[relatedNative];

      if ((!related || related !== target) && !contains(target, related)) {
        const isShow = (relatedNative === 'fromElement');
        if (isShow) {
          hideTimer && clearTimeout(hideTimer);
          setHideTimer(null);
        } else {
          showTimer && clearTimeout(showTimer);
          setShowTimer(null);
        }
        handler();
      }
    };
    const handleMouseOver = (e: React.MouseEvent) => handleMouseOverOut(handleShow, e, 'fromElement');
    const handleMouseOut = (e: React.MouseEvent) => handleMouseOverOut(handleHide, e, 'toElement');
    const triggerProps: Record<string, GenericFunction> = {};
    const overlayProps: Record<string, GenericFunction> = {};

    const triggers = ([] as Array<string>).concat(trigger);
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
        <OverlayBase
          {...props}
          popperConfig={{
            ...popperConfig,
            modifiers: {
              ...popperConfig.modifiers,
            } as any,
          }}
          show={show}
          onHide={handleHide}
          target={targetRef ? targetRef.current : triggerRef.current as React.RefObject<HTMLElement>}
        >
          {(props) => (typeof overlay === 'function' ? overlay({ ...props, ...overlayProps }) : overlay)}
        </OverlayBase>
      </>
    );
  });

const OverlayTriggerWithDisplayName = Object.assign(Trigger, {
  displayName: 'OverlayTrigger',
});

export default OverlayTriggerWithDisplayName;
