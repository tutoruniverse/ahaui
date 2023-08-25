import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
import Composer, { ComposerProps } from '..';

describe('components/Composer', () => {
  let mockHandleOnChange: jest.Mock;
  let mockHandleSendButtonClick: jest.Mock;
  let mockHandleAttachButtonClick: jest.Mock;
  const composerRef = React.createRef<HTMLDivElement>();

  beforeEach(() => {
    mockHandleOnChange = jest.fn();
    mockHandleSendButtonClick = jest.fn();
    mockHandleAttachButtonClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props = {}) => {
    const SimpleComposer = (composerProps: ComposerProps) => {
      const {
        sendButtonProps,
        attachButtonProps,
        inputProps,
      } = composerProps;

      return (
        <Composer
          {...composerProps}
          inputProps={{
            ...inputProps,
            'data-testid': 'input-test-id',
          }}
          sendButtonProps={{
            ...sendButtonProps,
            'data-testid': 'send-button-test-id',
          }}
          attachButtonProps={{
            ...attachButtonProps,
            'data-testid': 'attach-button-test-id',
          }}
          data-testid="composer-test-id"
          ref={composerRef}
        />
      );
    };

    const { rerender, ...helpers } = setupWithUserEvent(render(<SimpleComposer {...props} />));

    expect(composerRef.current).toBeTruthy();

    return {
      ...helpers,
      rerender: (newProps = {}) => rerender(<SimpleComposer {...newProps} />),
    };
  };

  it('should render Composer without passing props', () => {
    render(<Composer data-testid="composer-test-id" />);
    expect(document.querySelector('.Composer')?.children).toHaveLength(3);
  });

  it('should render and handle Composer correctly with default props', async () => {
    //Render component
    const { user } = setup({
      value: 'Testing Input',
      onChange: mockHandleOnChange,
      sendButtonProps: {
        onClick: mockHandleSendButtonClick,
      },
      attachButtonProps: {
        onClick: mockHandleAttachButtonClick,
      },
    });

    expect(screen.queryByTestId('composer-test-id')).toBeInTheDocument();
    expect(screen.queryByTestId('input-test-id')).toBeInTheDocument();
    expect(screen.queryByTestId('send-button-test-id')).toBeInTheDocument();
    expect(screen.queryByTestId('attach-button-test-id')).toBeInTheDocument();

    // Active
    expect(screen.queryByTestId('attach-button-test-id')).toHaveClass('u-cursorPointer');
    expect(screen.queryByTestId('send-button-test-id')).toHaveClass('u-cursorPointer');

    // Expect default rendering
    expect(screen.queryByTestId('composer-test-id')).toHaveAttribute('value', 'Testing Input');

    // Test handling
    await user.type(screen.getByTestId('input-test-id'), 'testing text');
    expect(mockHandleOnChange.mock.calls[0][0].target.value).toEqual('testing text');

    await user.click(screen.getByTestId('send-button-test-id'));
    expect(mockHandleSendButtonClick).toBeCalledTimes(1);

    await user.click(screen.getByTestId('attach-button-test-id'));
    expect(mockHandleAttachButtonClick).toBeCalledTimes(1);
  });

  it('should render and handle compose correctly with given props', () => {
    // Render component
    setup({
      value: '',
      onChange: mockHandleOnChange,
      sendButtonIcon: () => (<div>Send Button</div>),
      sendButtonActive: false,
      inputProps: {
        className: 'Input',
      },
      sendButtonProps: {
        className: 'SendButton',
      },
      attachButtonProps: {
        className: 'AttachButton',
      },
    });

    // Expect default rendering
    expect(screen.queryByTestId('input-test-id')).toHaveClass('Input');
    expect(screen.queryByTestId('attach-button-test-id')).toHaveClass('AttachButton');
    expect(screen.queryByText('Send Button')).toBeInTheDocument();
    expect(screen.queryByTestId('send-button-test-id')).toHaveClass('SendButton u-cursorNotAllow u-pointerEventsNone');
  });

  it('should render and handle Composer correctly with tooltip as string', async () => {
    // Render component
    const { user } = setup({
      value: '',
      onChange: mockHandleOnChange,
      className: 'Composer',
      tooltipSendButton: 'tooltip-send-button',
      inputProps: {
        className: 'Input',
      },
      sendButtonProps: {
        className: 'SendButton',
      },
      tooltipAttachButton: 'tooltip-attach-button',
      attachButtonProps: {
        className: 'AttachButton',
      },
    });

    // Expect default rendering
    expect(screen.queryByTestId('composer-test-id')).toHaveClass('Composer');
    expect(screen.queryByTestId('input-test-id')).toHaveClass('Input');
    expect(screen.queryByTestId('send-button-test-id')).toHaveClass('SendButton');
    expect(screen.queryByTestId('attach-button-test-id')).toHaveClass('AttachButton');

    // Test tooltip
    await user.hover(screen.getByTestId('attach-button-test-id'));
    await waitFor(() => expect(screen.queryByText('tooltip-attach-button')).toBeInTheDocument());

    await user.hover(screen.getByTestId('send-button-test-id'));
    await waitFor(() => expect(screen.queryByText('tooltip-send-button')).toBeInTheDocument());

    await user.unhover(screen.getByTestId('attach-button-test-id'));
    await user.unhover(screen.getByTestId('send-button-test-id'));

    await waitFor(() => expect(screen.queryByText('tooltip-attach-button')).not.toBeInTheDocument());
    expect(screen.queryByText('tooltip-send-button')).not.toBeInTheDocument();
  });

  it('should render and handle Composer correctly with tooltip as a function', async () => {
    // Render component
    const { user } = setup({
      value: '',
      onChange: mockHandleOnChange,
      className: 'Composer',
      tooltipSendButton: () => 'tooltip-send-button',
      inputProps: {
        className: 'Input',
      },
      sendButtonProps: {
        className: 'SendButton',
      },
      tooltipAttachButton: () => 'tooltip-attach-button',
      attachButtonProps: {
        className: 'AttachButton',
      },
      sendButtonIcon: () => (<div>Send Button</div>),
    });

    // Expect default rendering
    expect(screen.queryByText('Send Button')).toBeInTheDocument();

    // Test tooltip
    await user.hover(screen.getByTestId('attach-button-test-id'));
    await waitFor(() => expect(screen.queryByText('tooltip-attach-button')).toBeInTheDocument());

    await user.hover(screen.getByTestId('send-button-test-id'));
    await waitFor(() => expect(screen.queryByText('tooltip-send-button')).toBeInTheDocument());
  });

  it('should render Composer correctly with not actived send button', () => {
    // without tooltip
    const { rerender } = setup({
      value: '',
      onChange: mockHandleOnChange,
      className: 'Composer',
      sendButtonActive: false,
    });

    expect(screen.getByTestId('send-button-test-id')).toHaveClass('u-cursorNotAllow');

    // with tooltip
    rerender({
      value: '',
      onChange: mockHandleOnChange,
      className: 'Composer',
      tooltipSendButton: 'tooltip-send-button',
      sendButtonActive: false,
    });

    expect(screen.getByTestId('send-button-test-id')).toHaveClass('u-cursorNotAllow');
  });

  it('should render disabled Composer correctly', () => {
    setup({
      value: '',
      disabledAttachButton: true,
      disabledSendButton: true,
      inputProps: {
        disabled: true,
      },
    });

    expect(screen.queryByTestId('composer-test-id')).toBeInTheDocument();
    expect(screen.queryByTestId('send-button-test-id')).not.toBeInTheDocument();
    expect(screen.queryByTestId('attach-button-test-id')).not.toBeInTheDocument();
    expect(screen.queryByTestId('input-test-id')).toBeInTheDocument();
    expect(screen.queryByTestId('input-test-id')).toBeDisabled();
  });
});
