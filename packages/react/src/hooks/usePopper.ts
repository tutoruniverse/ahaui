//fork react-overlays/src/usePopper.js
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import type { GenericFunction } from 'types/common';
import * as Popper from '@popperjs/core';

export type Options = Popper.Options;
export type Instance = Popper.Instance;
export type Placement = Popper.Placement;
export type VirtualElement = Popper.VirtualElement;
export type State = Popper.State;

type PopperStyles = Partial<CSSStyleDeclaration>;

type ArrowStyles = Partial<CSSStyleDeclaration>;

type OptionsWithUndefined<
  T extends Popper.Obj | undefined
> = T extends Popper.Obj ? T : Popper.Obj;

export type Modifier<
  Name,
  Options extends Popper.Obj | undefined
> = Popper.Modifier<Name, OptionsWithUndefined<Options>>;

export type PopperConfig = Omit<
  Options,
  'modifiers' | 'placement' | 'strategy'
> & {
  enabled?: boolean;
  placement?: Options['placement'];
  strategy?: Options['strategy'];
  modifiers?: Options['modifiers'];
};

export interface PopperState {
  placement: Placement;
  update: GenericFunction;
  outOfBoundaries: boolean;
  styles: PopperStyles;
  arrowStyles: ArrowStyles;
}

export interface UsePopperProps {
  placement: Placement;
  update: () => void;
  forceUpdate: () => void;
  attributes: Record<string, Record<string, any>>;
  styles: Record<string, Partial<CSSStyleDeclaration>>;
  state?: State;
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
 * @param {String}     options.strategy use fixed positioning
 * @param {Function}     options.onFirstUpdate function to be called on the first popper render
 */
export default function usePopper(
  referenceElement: HTMLElement | VirtualElement | null | undefined,
  popperElement: HTMLElement | null | undefined,
  {
    enabled = true,
    placement = 'bottom',
    strategy = 'absolute',
    modifiers = [],
  }: PopperConfig = {},
): PopperState {
  const popperInstanceRef = useRef<Instance | null>(null);

  const update = useCallback(() => {
    if (popperInstanceRef.current) {
      popperInstanceRef.current.update();
    }
  }, []);

  const [popperState, setPopperState] = useState<PopperState>({
    placement,
    update,
    outOfBoundaries: false,
    styles: initialPopperStyles,
    arrowStyles: initialArrowStyles,
  });

  const updateModifier = useMemo<Modifier<'updateStateModifier', any>>(
    () => ({
      name: 'updateStateModifier',
      enabled: true,
      phase: 'write',
      requires: ['computeStyles'],
      fn: (data: Popper.ModifierArguments<OptionsWithUndefined<Options>>) => {
        const { state } = data;

        setPopperState({
          update,
          styles: state.styles.popper,
          arrowStyles: state.styles.arrow,
          placement: state.placement,
          outOfBoundaries: state.attributes['data-popper-reference-hidden'] as unknown as boolean,
        });
      },
    }),
    [update, setPopperState],
  );

  // A placement difference in popperState means popper determined a new placement
  // apart from the props value. By the time the popper element is rendered with
  // the new position Popper has already measured it, if the place change triggers
  // a size change it will result in a misaligned popper. So we schedule an update to be sure.
  useEffect(() => {
    update();
  }, [popperState.placement, update]);

  /** Toggle Events */
  useEffect(() => {
    if (!popperInstanceRef.current || !enabled) return;
    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [...modifiers, updateModifier],
    });

    // intentionally NOT re-running on new modifiers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, placement, strategy, updateModifier]);

  /** Initiate Popper */
  useEffect(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    popperInstanceRef.current = Popper.createPopper(referenceElement, popperElement, {
      placement,
      strategy,
      modifiers: [...modifiers, updateModifier],
    });

    return () => {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = null;

        setPopperState((state) => ({
          ...state,
          styles: initialPopperStyles,
        }));
      }
    };

    // This is only run once to _create_ the popper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    enabled,
    referenceElement,
    popperElement,
  ]);

  return popperState;
}
