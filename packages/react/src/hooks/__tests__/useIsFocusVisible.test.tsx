import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import useIsFocusVisible, { teardown as teardownFocusVisible } from '../useIsFocusVisible';
import useForkRef from '../useForkRef';

const SimpleButton = React.forwardRef<HTMLElement>((props, ref) => {
  const {
    isFocusVisible,
    onBlurVisible: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    handleBlurVisible();
    if (!isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <button
      type="button"
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      Hello
    </button>
  );
});

const SimpleInput = React.forwardRef<HTMLElement>((props, ref) => {
  const {
    isFocusVisible,
    onBlurVisible: handleBlurVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const handleRef = useForkRef(focusVisibleRef, ref!);

  const [isLocalFocusVisible, setIsLocalFocusVisible] = React.useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    handleBlurVisible();
    if (!isFocusVisible(event)) {
      setIsLocalFocusVisible(false);
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (isFocusVisible(event)) {
      setIsLocalFocusVisible(true);
    }
  };

  return (
    <input
      ref={handleRef}
      className={isLocalFocusVisible ? 'focus-visible' : ''}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

const simulatePointerDevice = () => {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(document.body);
};

const focusElementAfterFireAKeyBoard = (element: HTMLElement, {
  key,
  isMultipleKeyPress = false,
}: {
  key: string;
  isMultipleKeyPress?: boolean;
}) => {
  act(() => {
    element.blur();
    if (isMultipleKeyPress) {
      userEvent.keyboard(`{${key}}{f}`);
    } else {
      userEvent.keyboard(`{${key}}`);
    }
    element.focus();
  });
};

describe('useIsFocusVisible', () => {
  beforeEach(() => {
    // isolate test from previous component test that use the polyfill in the document scope
    teardownFocusVisible(document);
  });

  describe('should handle focus correctly', () => {
    let rootElement: HTMLDivElement;
    let secondRootElement: HTMLButtonElement;
    beforeEach(() => {
      rootElement = document.createElement('div');
      secondRootElement = document.createElement('button');
      document.body.appendChild(rootElement);
      document.body.appendChild(secondRootElement);
    });

    it('should set focus state correctly with button element', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      render(
        <SimpleButton ref={buttonRef} />,
        {
          container: rootElement,
        },
      );
      simulatePointerDevice();

      const { current: button } = buttonRef;
      if (button?.nodeName !== 'BUTTON') {
        throw new Error('missing button');
      }

      expect(button.classList.contains('focus-visible')).toEqual(false);

      act(() => {
        button.focus();
      });
      expect(button.classList.contains('focus-visible')).toEqual(false);

      // Multiple key press containing special keyboard won't trigger focus
      act(() => {
        button.blur();
        focusElementAfterFireAKeyBoard(button, {
          key: 'Meta',
          isMultipleKeyPress: true,
        });
      });
      expect(button.classList.contains('focus-visible')).toEqual(false);

      secondRootElement.focus();

      act(() => {
        button.blur();
        focusElementAfterFireAKeyBoard(button, {
          key: 'Tab',
        });
      });
      expect(button.classList.contains('focus-visible')).toEqual(true);
    });

    it('should set focus state correctly with input element', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(
        <SimpleInput ref={inputRef} />,
        {
          container: rootElement,
        },
      );
      simulatePointerDevice();

      const { current: input } = inputRef;
      if (input?.nodeName !== 'INPUT') {
        throw new Error('missing input');
      }

      expect(input.classList.contains('focus-visible')).toEqual(false);

      act(() => {
        input.focus();
      });
      expect(input.classList.contains('focus-visible')).toEqual(true);
    });

    it('should be able to focus on an element after blur it and re-focus', () => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      render(
        <SimpleButton ref={buttonRef} />,
        {
          container: rootElement,
        },
      );
      simulatePointerDevice();

      const { current: button } = buttonRef;
      if (button?.nodeName !== 'BUTTON') {
        throw new Error('missing button');
      }

      expect(button.classList.contains('focus-visible')).toEqual(false);

      // Override the document's visibilityState to be 'hidden',
      // this is relevant to a tab that is previously selected
      Object.defineProperty(document, 'visibilityState', {
        value: 'hidden',
        writable: true,
      });

      // Trigger the visibilitychange event to mock for a tab re-focusing event
      const visibilityChangeEvent = new Event('visibilitychange');
      document.dispatchEvent(visibilityChangeEvent);

      // Expect focus status
      act(() => {
        button.focus();
      });
      expect(button.classList.contains('focus-visible')).toEqual(true);
    });
  });
});
