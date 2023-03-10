//fork react-overlays/src/usePopper.js
import { useCallback, useEffect, useRef, useState } from 'react';
import PopperJS from 'popper.js';
import type { Placement, Modifiers } from 'popper.js';
import type { GenericFunction } from 'types/common';

type PopperStyles = Partial<CSSStyleDeclaration>;

type ArrowStyles = Partial<CSSStyleDeclaration>;

export interface UsePopperOptions {
  enabled?: boolean;
  placement?: Placement;
  positionFixed?: boolean;
  eventsEnabled?: boolean;
  modifiers?: Modifiers;
}

interface PopperState {
  placement: Placement;
  scheduleUpdate: GenericFunction;
  outOfBoundaries: boolean;
  styles: PopperStyles;
  arrowStyles: ArrowStyles;
}

const initialPopperStyles: PopperStyles = {
  position: 'absolute',
  top: '0',
  left: '0',
  opacity: '0',
  pointerEvents: 'none',
};

const initialArrowStyles: ArrowStyles = {};

/**
 * Position an element relative some reference element using Popper.js
 *
 * @param {HTMLElement} referenceElement The element
 * @param {HTMLElement} popperElement
 * @param {Object}      options
 * @param {Object}      options.modifiers Popper.js modifiers
 * @param {Boolean}     options.enabled toggle the popper functionality on/off
 * @param {String}      options.placement The popper element placement relative to the reference element
 * @param {Boolean}     options.positionFixed use fixed positioning
 * @param {Boolean}     options.eventsEnabled have Popper listen on window resize events to reposition the element
 */

export default function usePopper(
  referenceElement: HTMLElement | PopperJS.ReferenceObject,
  popperElement: HTMLElement,
  {
    enabled = true,
    placement = 'bottom',
    positionFixed = false,
    eventsEnabled = true,
    modifiers = {},
  }: UsePopperOptions = {},
) {
  const popperInstanceRef = useRef<PopperJS | null>(null);

  const hasArrow = !!(modifiers.arrow && modifiers.arrow.element);

  const scheduleUpdate = useCallback(() => {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.scheduleUpdate();
    }
  }, []);

  const [state, setState] = useState<PopperState>({
    placement,
    scheduleUpdate,
    outOfBoundaries: false,
    styles: initialPopperStyles,
    arrowStyles: initialArrowStyles,
  });

  // A placement difference in state means popper determined a new placement
  // apart from the props value. By the time the popper element is rendered with
  // the new position Popper has already measured it, if the place change triggers
  // a size change it will result in a misaligned popper. So we schedule an update to be sure.
  useEffect(() => {
    scheduleUpdate();
  }, [state.placement, scheduleUpdate]);

  /** Toggle Events */
  useEffect(() => {
    if (popperInstanceRef.current) {
      // eslint-disable-next-line no-unused-expressions
      eventsEnabled
        ? popperInstanceRef.current.enableEventListeners()
        : popperInstanceRef.current.disableEventListeners();
    }
  }, [eventsEnabled]);

  useEffect(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    const arrow = modifiers.arrow && {
      ...modifiers.arrow,
      element: modifiers.arrow.element,
    };

    popperInstanceRef.current = new PopperJS(referenceElement, popperElement, {
      placement,
      positionFixed,
      modifiers: {
        ...modifiers,
        arrow,
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn(data) {
            setState({
              scheduleUpdate,
              styles: {
                // TODO: [Leo] will comeback with version migration
                // @ts-ignore
                position: data.offsets.popper.position,
                ...data.styles,
              },
              arrowStyles: data.arrowStyles,
              outOfBoundaries: data.hide,
              placement: data.placement,
            });
            return data;
          },
        },
      },
    });

    return () => {
      if (popperInstanceRef.current !== null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = null;
      }
    };
    // intentionally NOT re-running on new modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    placement,
    positionFixed,
    referenceElement,
    popperElement,
    hasArrow,
  ]);

  return state;
}