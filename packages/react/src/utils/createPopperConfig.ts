import * as Popper from '@popperjs/core';
import { PopperConfig, Modifier } from 'hooks/usePopper';

export type Modifiers =
  | Popper.Options['modifiers']
  | Record<string, Partial<Modifier<any, any>>>;

type OffsetValue = [
  number | null | undefined,
  number | null | undefined,
];
type OffsetFunction = (details: {
  popper: Popper.Rect;
  reference: Popper.Rect;
  placement: Popper.Placement;
}) => OffsetValue;

export type Offset = OffsetFunction | OffsetValue;

export type PopperOptions = {
  flip?: boolean;
  fixed?: boolean;
  alignEnd?: boolean;
  enabled?: boolean;
  containerPadding?: number;
  arrowElement?: Element | null;
  eventsEnabled?: boolean;
  offset?: Offset;
  placement?: Popper.Placement;
  popperConfig?: Omit<PopperConfig, 'modifiers'> & { modifiers?: Modifiers };
};

export function toModifierMap(modifiers: Modifiers | undefined) {
  const result: Modifiers = {};

  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }

  // eslint-disable-next-line no-unused-expressions
  modifiers?.forEach((m) => {
    result[m.name] = m;
  });
  return result;
}

export function toModifierArray(map: Modifiers | undefined = {}) {
  if (Array.isArray(map)) return map;
  return Object.keys(map).map((k) => {
    // eslint-disable-next-line no-param-reassign
    map[k].name = k;
    return map[k];
  });
}

// Working as an adapter that transforms options into Popper config
export default function createPopperConfig({
  enabled,
  eventsEnabled,
  placement,
  flip,
  offset,
  fixed,
  containerPadding,
  arrowElement,
  popperConfig = {},
}: PopperOptions): PopperConfig {
  const modifiers = toModifierMap(popperConfig.modifiers);

  return {
    ...popperConfig,
    placement,
    enabled,
    strategy: fixed ? 'fixed' : popperConfig.strategy,
    modifiers: toModifierArray({
      ...modifiers,
      eventListeners: {
        enabled: eventsEnabled,
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
          offset: offset || [0, 10],
          ...modifiers.offset?.options,
        },
      },
      arrow: {
        ...modifiers.arrow,
        enabled: !!arrowElement,
        options: {
          // 4.8px is equal to the length of rounded border,
          // we don't want the arrow the be rendered right in the rounded place
          padding: 4.8,
          ...modifiers.arrow?.options,
          element: arrowElement,
        },
      },
      flip: {
        enabled: !!flip,
        ...modifiers.flip,
        options: containerPadding
          ? {
            padding: containerPadding,
            ...modifiers.flip?.options,
          }
          : modifiers.flip?.options,
      },
    }),
  };
}
