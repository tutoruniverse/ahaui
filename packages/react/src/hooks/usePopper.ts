//fork react-overlays/src/usePopper.js
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { dequal } from 'dequal';
import useSafeState from '@restart/hooks/useSafeState';
import * as Popper from '@popperjs/core';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import computeStyles from '@popperjs/core/lib/modifiers/computeStyles';
import eventListeners from '@popperjs/core/lib/modifiers/eventListeners';
import flip from '@popperjs/core/lib/modifiers/flip';
import hide from '@popperjs/core/lib/modifiers/hide';
import offset from '@popperjs/core/lib/modifiers/offset';
import popperOffsets from '@popperjs/core/lib/modifiers/popperOffsets';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import { popperGenerator } from '@popperjs/core/lib/popper-base';

// For the common JS build we will turn this file into a bundle with no imports.
// This is b/c the Popper lib is all esm files, and would break in a common js only environment
export const createPopper = popperGenerator({
  defaultModifiers: [
    hide,
    popperOffsets,
    computeStyles,
    eventListeners,
    offset,
    flip,
    preventOverflow,
    arrow,
  ],
});

export enum PopperDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum PopperPlacement {
  AUTO = 'auto',
  AUTO_START = 'auto-start',
  AUTO_END = 'auto-end',
  TOP = 'top',
  TOP_START = 'top-start',
  TOP_END = 'top-end',
  RIGHT = 'right',
  RIGHT_START = 'right-start',
  RIGHT_END = 'right-end',
  BOTTOM = 'bottom',
  BOTTOM_START = 'bottom-start',
  BOTTOM_END = 'bottom-end',
  LEFT = 'left',
  LEFT_START = 'left-start',
  LEFT_END = 'left-end',
}

const disabledApplyStylesModifier = {
  name: 'applyStyles',
  enabled: false,
  phase: 'afterWrite',
  fn: () => undefined,
};

// In order to satisfy the current usage of options, including undefined
type OptionsWithUndefined<T extends Popper.Obj | undefined> = T extends Popper.Obj ? T : Popper.Obj;

// until docjs supports type exports...
export type Modifier<Name, Options extends Popper.Obj | undefined> = Popper.Modifier<
  Name,
  OptionsWithUndefined<Options>
>;

export type Options = Popper.Options;
export type Instance = Popper.Instance;
export type Placement = Popper.Placement | PopperPlacement;
export type VirtualElement = Popper.VirtualElement;
export type State = Popper.State;

export type OffsetValue = [number | null | undefined, number | null | undefined];
export type OffsetFunction = (details: {
  popper: Popper.Rect;
  reference: Popper.Rect;
  placement: Placement;
}) => OffsetValue;

export type Offset = OffsetFunction | OffsetValue;

export type ModifierMap = Record<string, Partial<Modifier<any, any>>>;
export type Modifiers = Popper.Options['modifiers'] | Record<string, Partial<Modifier<any, any>>>;

export type UsePopperOptions = Omit<Options, 'modifiers' | 'placement' | 'strategy'> & {
  enabled?: boolean;
  placement?: Options['placement'];
  strategy?: Options['strategy'];
  modifiers?: Options['modifiers'];
};

export interface UsePopperState {
  placement: Placement;
  update: () => void;
  forceUpdate: () => void;
  attributes: Record<string, Record<string, any>>;
  styles: Record<string, Partial<CSSStyleDeclaration>>;
  state?: State;
}
export type Config = {
  flip?: boolean;
  fixed?: boolean;
  alignEnd?: boolean;
  enabled?: boolean;
  containerPadding?: number;
  arrowElement?: Element | null;
  enableEvents?: boolean;
  offset?: Offset;
  placement?: Placement;
  popperConfig?: UsePopperOptions;
};

export function toModifierMap(modifiers: Modifiers | undefined) {
  const result: Modifiers = {};

  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }

  // eslint-disable-next-line no-unused-expressions
  modifiers?.forEach((m) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    result[m.name!] = m;
  });
  return result;
}

export function toModifierArray(map: Modifiers | undefined = {}): any {
  if (Array.isArray(map)) return map;
  return Object.keys(map).map((k) => {
    map[k].name = k;
    return map[k];
  });
}

export function mergeOptionsWithPopperConfig({
  enabled,
  enableEvents,
  placement,
  flip,
  offset,
  fixed,
  containerPadding,
  arrowElement,
  popperConfig = {},
}: Config): UsePopperOptions {
  const modifiers = toModifierMap(popperConfig.modifiers);

  return {
    ...popperConfig,
    placement,
    enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray({
      ...modifiers,
      eventListeners: {
        enabled: !!enableEvents,
        options: modifiers.eventListeners?.options,
      },
      preventOverflow: {
        ...modifiers.preventOverflow,
        options: containerPadding
          ? {
              padding: containerPadding,
              ...modifiers.preventOverflow?.options,
            }
          : modifiers.preventOverflow?.options,
      },
      offset: {
        options: {
          offset,
          ...modifiers.offset?.options,
        },
      },
      arrow: {
        ...modifiers.arrow,
        enabled: !!arrowElement,
        options: {
          ...modifiers.arrow?.options,
          element: arrowElement,
        },
      },
      flip: {
        enabled: !!flip,
        ...modifiers.flip,
      },
    }),
  };
}


const ariaDescribedByModifier: Modifier<
  'ariaDescribedBy',
  Record<string, never>
> = {
  name: 'ariaDescribedBy',
  enabled: true,
  phase: 'afterWrite',
  effect:
    ({ state }) =>
    () => {
      const { reference, popper } = state.elements;
      if ('removeAttribute' in reference) {
        const ids = (reference.getAttribute('aria-describedby') || '')
          .split(',')
          .filter((id) => id.trim() !== popper.id);

        if (!ids.length) reference.removeAttribute('aria-describedby');
        else reference.setAttribute('aria-describedby', ids.join(','));
      }
    },
  fn: ({ state }) => {
    const { popper, reference } = state.elements;

    const role = popper.getAttribute('role')?.toLowerCase();

    if (popper.id && role === 'tooltip' && 'setAttribute' in reference) {
      const ids = reference.getAttribute('aria-describedby');
      if (ids && ids.split(',').indexOf(popper.id) !== -1) {
        return;
      }

      reference.setAttribute(
        'aria-describedby',
        ids ? `${ids},${popper.id}` : popper.id,
      );
    }
  },
};
const EMPTY_MODIFIERS = [] as any;
/**
 * Position an element relative some reference element using Popper.js
 *
 * @param referenceElement
 * @param popperElement
 * @param {object}      options
 * @param {object=}     options.modifiers Popper.js modifiers
 * @param {boolean=}    options.enabled toggle the popper functionality on/off
 * @param {string=}     options.placement The popper element placement relative to the reference element
 * @param {string=}     options.strategy the positioning strategy
 * @param {boolean=}    options.eventsEnabled have Popper listen on window resize events to reposition the element
 * @param {function=}   options.onCreate called when the popper is created
 * @param {function=}   options.onUpdate called when the popper is updated
 *
 * @returns {UsePopperState} The popper state
 */
export function usePopper(
  referenceElement: VirtualElement | null | undefined,
  popperElement: HTMLElement | null | undefined,
  {
    enabled = true,
    placement = PopperPlacement.BOTTOM,
    strategy = 'absolute',
    modifiers = EMPTY_MODIFIERS,
    ...config
  }: UsePopperOptions = {}
): UsePopperState {
  const prevModifiers = useRef<UsePopperOptions['modifiers']>(modifiers);
  const popperInstanceRef = useRef<Instance>();

  const update = useCallback(() => {
    popperInstanceRef.current?.update();
  }, []);

  const forceUpdate = useCallback(() => {
    popperInstanceRef.current?.forceUpdate();
  }, []);

  const [popperState, setState] = useSafeState(
    useState<UsePopperState>({
      placement,
      update,
      forceUpdate,
      attributes: {},
      styles: {
        popper: {},
        arrow: {},
      },
    }),
  );

  const updateModifier = useMemo<Modifier<'updateStateModifier', any>>(
    () => ({
      name: 'updateStateModifier',
      enabled: true,
      phase: 'write',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        const styles: UsePopperState['styles'] = {};
        const attributes: UsePopperState['attributes'] = {};

        Object.keys(state.elements).forEach((element) => {
          styles[element] = state.styles[element];
          attributes[element] = state.attributes[element];
        });

        setState({
          state,
          styles,
          attributes,
          update,
          forceUpdate,
          placement: state.placement,
        });
      },
    }),
    [update, forceUpdate, setState],
  );

  const nextModifiers = useMemo(() => {
    if (!dequal(prevModifiers.current, modifiers)) {
      prevModifiers.current = modifiers;
    }
    return prevModifiers.current!;
  }, [modifiers]);

  useEffect(() => {
    if (!popperInstanceRef.current || !enabled) return;

    popperInstanceRef.current.setOptions({
      placement,
      strategy,
      modifiers: [
        ...nextModifiers,
        updateModifier,
        disabledApplyStylesModifier,
      ],
    });
  }, [strategy, placement, updateModifier, enabled, nextModifiers]);


  useEffect(() => {
    if (!enabled || referenceElement == null || popperElement == null) {
      return undefined;
    }

    popperInstanceRef.current = createPopper(referenceElement, popperElement, {
      ...config,
      placement,
      strategy,
      modifiers: [...nextModifiers, ariaDescribedByModifier, updateModifier],
    });

    return () => {
      if (popperInstanceRef.current != null) {
        popperInstanceRef.current.destroy();
        popperInstanceRef.current = undefined;

        setState((s) => ({
          ...s,
          attributes: {},
          styles: { popper: {} },
        }));
      }
    };
    // This is only run once to _create_ the popper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, referenceElement, popperElement]);

  return popperState;
}
