import createPopperConfig, { toModifierMap, toModifierArray } from 'utils/createPopperConfig';
import type { Modifiers } from 'utils/createPopperConfig';
import type { Placement } from '@popperjs/core';

describe('utils/createPopperConfig/toModifierMap', () => {
  it('should return an empty object if no modifiers are provided', () => {
    expect(toModifierMap(undefined)).toEqual({});
  });

  it('should return the modifiers as a map with their name as the key', () => {
    const modifiers = [
      { name: 'modifier1', value: 'value1' },
      { name: 'modifier2', value: 'value2' },
    ];

    const expectedMap = {
      modifier1: { name: 'modifier1', value: 'value1' },
      modifier2: { name: 'modifier2', value: 'value2' },
    };

    expect(toModifierMap(modifiers)).toEqual(expectedMap);
  });

  it('should return the same object if a map is provided instead of an array', () => {
    const modifiers = {
      modifier1: { name: 'modifier1', value: 'value1' },
      modifier2: { name: 'modifier2', value: 'value2' },
    };

    expect(toModifierMap(modifiers)).toEqual(modifiers);
  });

  it('should return an empty object if an empty array is provided', () => {
    expect(toModifierMap([])).toEqual({});
  });
});

describe('utils/createPopperConfig/toModifierArray', () => {
  it('should return an empty array if no map is provided', () => {
    expect(toModifierArray()).toEqual([]);
  });

  it('should return the same array if an array is provided', () => {
    const modifiers = [
      { name: 'modifier1', value: 'value1' },
      { name: 'modifier2', value: 'value2' },
    ];

    expect(toModifierArray(modifiers)).toEqual(modifiers);
  });

  it('should convert the map into an array of modifiers', () => {
    const map = {
      modifier1: { name: 'modifier1', value: 'value1' },
      modifier2: { name: 'modifier2', value: 'value2' },
    };

    const expectedArray = [
      { name: 'modifier1', value: 'value1' },
      { name: 'modifier2', value: 'value2' },
    ];

    expect(toModifierArray(map)).toEqual(expectedArray);
  });

  it('should set the name property of each modifier to the key of the corresponding map entry', () => {
    const map = {
      modifier1: { value: 'value1' },
      modifier2: { value: 'value2' },
    } as Modifiers;

    const expectedArray = [
      { name: 'modifier1', value: 'value1' },
      { name: 'modifier2', value: 'value2' },
    ];

    expect(toModifierArray(map)).toEqual(expectedArray);
  });
});

describe('utils/createPopperConfig', () => {
  const defaultPopperOptions = {
    enabled: true,
    eventsEnabled: true,
    placement: 'bottom' as Placement,
    flip: true,
    fixed: false,
    containerPadding: 10,
    arrowElement: null,
    popperConfig: {},
  };

  it('should return the default Popper config', () => {
    const popperConfig = createPopperConfig(defaultPopperOptions);

    expect(popperConfig).toEqual({
      ...defaultPopperOptions.popperConfig,
      enabled: true,
      placement: 'bottom',
      strategy: undefined,
      modifiers: toModifierArray({
        eventListeners: {
          enabled: true,
        },
        preventOverflow: {
          options: {
            padding: 10,
          },
        },
        offset: {
          options: {
            offset: [0, 10],
          },
        },
        arrow: {
          enabled: false,
          options: {
            padding: 4.8,
            element: null,
          },
        },
        flip: {
          enabled: true,
          options: {
            padding: 10,
          },
        },
      }),
    });
  });

  it('should return a Popper config with custom options', () => {
    const popperConfig = createPopperConfig({
      ...defaultPopperOptions,
      fixed: true,
      containerPadding: 20,
      arrowElement: document.createElement('div'),
    });

    expect(popperConfig).toEqual({
      ...defaultPopperOptions.popperConfig,
      placement: 'bottom',
      enabled: true,
      strategy: 'fixed',
      modifiers: toModifierArray({
        eventListeners: {
          enabled: true,
        },
        preventOverflow: {
          options: {
            padding: 20,
          },
        },
        offset: {
          options: {
            offset: [0, 10],
          },
        },
        arrow: {
          enabled: true,
          options: {
            padding: 4.8,
            element: document.createElement('div'),
          },
        },
        flip: {
          enabled: true,
          options: {
            padding: 20,
          },
        },
      }),
    });
  });
});
