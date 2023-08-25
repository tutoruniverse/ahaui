import * as React from 'react';
import { render, fireEvent, RenderHookResult, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SetupWithUserEvent, setupWithUserEvent } from 'utils/test';
import { teardown as teardownFocusVisible, focusTriggersKeyboardModality } from '../useIsFocusVisible';
import SimpleButton from '../mocks/SimpleButton';
import SimpleInput from '../mocks/SimpleInput';
import SimpleTextarea from '../mocks/SimpleTextarea';
import SimpleContentEditable from '../mocks/SimpleContentEditable';
import SimpleDiv from '../mocks/SimpleDiv';

jest.useFakeTimers();

const simulatePointerDevice = () => {
  // first focus on a page triggers focus visible until a pointer event
  // has been dispatched
  fireEvent.pointerDown(document.body);
};

const focusElementAfterFireAKeyBoard = async (
  user: SetupWithUserEvent<RenderHookResult<any, any>>['user'],
  element: HTMLElement,
  {
    key,
    isMultipleKeyPress = false,
  }: {
    key: string;
    isMultipleKeyPress?: boolean;
  },
) => {
  await act(async () => {
    element.blur();
    if (isMultipleKeyPress) {
      await user.keyboard(`{${key}>}f{/${key}}`);
    } else {
      await user.keyboard(`{${key}}`);
    }
    element.focus();
  });
};

const spyDocumentVisibilityState = jest.spyOn(document, 'visibilityState', 'get');

describe('hooks/useIsFocusVisible', () => {
  let rootElement: HTMLDivElement;
  let secondRootElement: HTMLButtonElement;

  beforeEach(() => {
    // isolate test from previous component test that use the polyfill in the document scope
    teardownFocusVisible(document);

    // Create root elements
    rootElement = document.createElement('div');
    secondRootElement = document.createElement('button');
    document.body.appendChild(rootElement);
    document.body.appendChild(secondRootElement);
    spyDocumentVisibilityState.mockReturnValue('visible');
  });

  it('should set focus state correctly with button element', async () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const { user, debug } = setupWithUserEvent(render(
      <SimpleButton ref={buttonRef} />,
      {
        container: rootElement,
      },
    ));
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
    await act(async () => {
      button.blur();
      await focusElementAfterFireAKeyBoard(
        user,
        button,
        {
          key: 'meta',
          isMultipleKeyPress: true,
        },
      );
    });

    expect(button.classList.contains('focus-visible')).toEqual(false);

    secondRootElement.focus();

    await act(async () => {
      button.blur();
      await focusElementAfterFireAKeyBoard(
        user,
        button,
        {
          key: 'Tab',
        },
      );
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

  it.each([
    ['visible', false],
    ['visible', true],
    ['hidden', false],
    ['hidden', true],
  ] as Array<['hidden' | 'visible', boolean]>,
  )('should be able to focus on an element after blur it and re-focus, with visible="%s" and focusRecently=%s', async (visibilityState, focusRecently) => {
    const textareaRef = React.createRef<HTMLTextAreaElement>();
    const { user } = setupWithUserEvent(render(
      <SimpleTextarea ref={textareaRef} />,
      {
        container: rootElement,
      },
    ));
    simulatePointerDevice();

    const { current: textarea } = textareaRef;
    if (textarea?.nodeName !== 'TEXTAREA') {
      throw new Error('missing textarea');
    }

    expect(textarea.classList.contains('focus-visible')).toEqual(false);

    // Focus
    act(() => {
      textarea.focus();
    });
    expect(textarea.classList.contains('focus-visible')).toEqual(true);

    // Blur
    act(() => {
      textarea.blur();
      if (focusRecently) {
        jest.advanceTimersByTime(50);
      } else {
        jest.runAllTimers();
      }
    });
    expect(textarea.classList.contains('focus-visible')).toEqual(false);

    // Override the document's visibilityState to be 'hidden',
    // this is relevant to a tab that is previously selected
    spyDocumentVisibilityState.mockReturnValue(visibilityState);

    // Trigger the visibilitychange event to mock for a tab re-focusing event
    const visibilityChangeEvent = new Event('visibilitychange');
    document.dispatchEvent(visibilityChangeEvent);

    // Re-focus
    await act(async () => {
      textarea.blur();
      await user.keyboard('{Tab}');
      textarea.focus();
      if (focusRecently) {
        jest.advanceTimersByTime(50);
      } else {
        jest.runAllTimers();
      }
    });

    expect(textarea.classList.contains('focus-visible')).toEqual(true);
  });

  it('should handle blur after focusing on an element', async () => {
    const buttonRef = React.createRef<HTMLButtonElement>();
    const { user } = setupWithUserEvent(render(
      <SimpleButton ref={buttonRef} />,
      {
        container: rootElement,
      },
    ));
    simulatePointerDevice();

    const { current: button } = buttonRef;
    if (button?.nodeName !== 'BUTTON') {
      throw new Error('missing button');
    }

    expect(button.classList.contains('focus-visible')).toEqual(false);

    await focusElementAfterFireAKeyBoard(
      user,
      button,
      {
        key: 'Tab',
      },
    );
    expect(button.classList.contains('focus-visible')).toEqual(true);

    act(() => {
      button.blur();
    });
    expect(button.classList.contains('focus-visible')).toEqual(false);
  });

  it('should handle focus and blur with textarea element', () => {
    const textareaRef = React.createRef<HTMLTextAreaElement>();

    render(
      <SimpleTextarea ref={textareaRef} />,
      {
        container: rootElement,
      },
    );

    simulatePointerDevice();

    const { current: textarea } = textareaRef;
    if (textarea?.nodeName !== 'TEXTAREA') {
      throw new Error('missing textarea');
    }

    expect(textarea.classList.contains('focus-visible')).toEqual(false);

    act(() => {
      textarea.focus();
    });
    expect(textarea.classList.contains('focus-visible')).toEqual(true);

    act(() => {
      textarea.blur();
    });
    expect(textarea.classList.contains('focus-visible')).toEqual(false);
  });

  it('should handle focus and blur with content editable element', async () => {
    const spanRef = React.createRef<HTMLSpanElement>();
    const { user } = setupWithUserEvent(render(
      <SimpleContentEditable ref={spanRef} />,
      {
        container: rootElement,
      },
    ));

    simulatePointerDevice();

    const { current: span } = spanRef;
    if (span?.nodeName !== 'SPAN') {
      throw new Error('missing span');
    }

    expect(span.classList.contains('focus-visible')).toEqual(false);

    await focusElementAfterFireAKeyBoard(
      user,
      span,
      {
        key: 'Tab',
      },
    );

    expect(span.classList.contains('focus-visible')).toEqual(true);
  });

  it('should not handle focus and blur for div element', () => {
    const divRef = React.createRef<HTMLDivElement>();
    render(
      <SimpleDiv ref={divRef} />,
      {
        container: rootElement,
      },
    );

    simulatePointerDevice();

    const { current: div } = divRef;
    if (div?.nodeName !== 'DIV') {
      throw new Error('missing div');
    }

    expect(div.classList.contains('focus-visible')).toEqual(false);

    act(() => {
      div.focus();
    });
    expect(div.classList.contains('focus-visible')).toEqual(false);

    act(() => {
      div.blur();
    });
    expect(div.classList.contains('focus-visible')).toEqual(false);
  });

  describe('focusTriggersKeyboardModality', () => {
    it('should return true for INPUT element and not readonly in the white list', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<input type="text" ref={inputRef} />);
      expect(focusTriggersKeyboardModality(inputRef.current as HTMLElement)).toEqual(true);
    });

    it('should return true for TEXTAREA element and not readonly', () => {
      const textareaRef = React.createRef<HTMLTextAreaElement>();
      render(<textarea ref={textareaRef} />);
      expect(focusTriggersKeyboardModality(textareaRef.current as HTMLElement)).toEqual(true);
    });

    it('should return true for editable element', () => {
      const divRef = React.createRef<HTMLDivElement>();
      render(<div contentEditable ref={divRef} />);

      // contenteditable not supported in jsdom
      // https://github.com/jsdom/jsdom/issues/1670
      Object.assign(divRef.current as HTMLElement, ({
        contentEditable: true,
        isContentEditable: true,
      }));

      expect(focusTriggersKeyboardModality(divRef.current as HTMLElement)).toEqual(true);
    });

    it('should return false for INPUT and readonly', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<input type="text" readOnly ref={inputRef} />);
      expect(focusTriggersKeyboardModality(inputRef.current as HTMLElement)).toEqual(false);
    });

    it('should return false for INPUT and not in the white list', () => {
      const inputRef = React.createRef<HTMLInputElement>();
      render(<input type="submit" readOnly ref={inputRef} />);
      expect(focusTriggersKeyboardModality(inputRef.current as HTMLElement)).toEqual(false);
    });

    it('should return false for TEXTAREA and readonly ', () => {
      const textAreaRef = React.createRef<HTMLTextAreaElement>();
      render(<textarea readOnly ref={textAreaRef} />);
      expect(focusTriggersKeyboardModality(textAreaRef.current as HTMLElement)).toEqual(false);
    });

    it('should return false for not editable element', () => {
      const spanRef = React.createRef<HTMLSpanElement>();
      render(<span ref={spanRef} />);
      expect(focusTriggersKeyboardModality(spanRef.current as HTMLElement)).toEqual(false);
    });
  });
});
