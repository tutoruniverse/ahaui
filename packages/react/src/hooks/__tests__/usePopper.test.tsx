import React from 'react';
import usePopper from 'hooks/usePopper';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import createPopperConfig from 'utils/createPopperConfig';
import type { PopperOptions } from 'utils/createPopperConfig';
import * as Popper from '@popperjs/core';

describe('usePopper', () => {
  let referenceElement: HTMLDivElement;
  let popperElement: HTMLDivElement;

  let mockDestroy: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockSetOptions: jest.Mock;

  const TestingComponent = ({
    referenceElement,
    popperElement,
    popperOptions = { eventsEnabled: true },
  }: {
    referenceElement: HTMLElement;
    popperElement: HTMLElement;
    popperOptions?: PopperOptions;
  }) => {
    usePopper(referenceElement, popperElement, createPopperConfig(popperOptions));

    return <div>testing component</div>;
  };

  beforeEach(() => {
    referenceElement = document.createElement('div');
    popperElement = document.createElement('div');

    mockDestroy = jest.fn();
    mockUpdate = jest.fn();
    mockSetOptions = jest.fn();

    // @ts-ignore
    // since we need to mock the createPopper method
    Popper.createPopper = jest.fn(() => ({
      destroy: mockDestroy,
      update: mockUpdate,
      setOptions: mockSetOptions,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have initial state correctly', () => {
    // Render usePopper hook
    const {
      result: {
        current: popperState,
      },
    } = renderHook(() => usePopper(referenceElement, popperElement, createPopperConfig({
      eventsEnabled: true,
    })));

    // Expect initial state
    expect(typeof popperState.update).toEqual('function');
    expect(popperState.placement).toEqual('bottom');
    expect(popperState.outOfBoundaries).toEqual(false);
    expect(popperState.arrowStyles).toEqual({});
    expect(popperState.styles).toEqual({
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '0',
      pointerEvents: 'none',
    });
    expect(Popper.createPopper).toBeCalledTimes(1);

    act(() => {
      // Should handle update correctly;
      popperState.update();
      expect(mockSetOptions).toBeCalledTimes(0);
      expect(mockUpdate).toBeCalledTimes(1);
    });
  });

  it('should not update popper options on modifier changed or enabled equal false ', () => {
    const { rerender } = render(
      <TestingComponent
        referenceElement={referenceElement}
        popperElement={popperElement}
        popperOptions={{
          eventsEnabled: false,
        }}
      />,
    );

    rerender(
      <TestingComponent
        referenceElement={referenceElement}
        popperElement={popperElement}
        popperOptions={{
          enabled: false,
          eventsEnabled: false,
        }}
      />,
    );
    // It should call setOptions method on enabled is equal false
    expect(mockSetOptions).toBeCalledTimes(0);
  });

  it('should handle Popper correctly', () => {
    const { rerender, unmount } = render(
      <TestingComponent
        referenceElement={referenceElement}
        popperElement={popperElement}
        popperOptions={{
          enabled: false,
          eventsEnabled: false,
        }}
      />,
    );
    // It should not construct popperjs on enabled = false
    expect(Popper.createPopper).toBeCalledTimes(0);

    rerender(
      <TestingComponent
        referenceElement={referenceElement}
        popperElement={popperElement}
        popperOptions={{
          eventsEnabled: true,
        }}
      />,
    );
    // It should construct popperjs on enabled = true
    expect(Popper.createPopper).toBeCalledTimes(1);

    rerender(
      <TestingComponent
        referenceElement={referenceElement}
        popperElement={popperElement}
        popperOptions={{
          placement: 'top',
          eventsEnabled: true,
        }}
      />,
    );
    // It should update popper option on config changes
    expect(mockSetOptions).toBeCalledTimes(1);

    act(() => {
      unmount();
    });
    // It should call destroy method on component unmounting
    expect(mockDestroy).toBeCalledTimes(1);
  });
});
