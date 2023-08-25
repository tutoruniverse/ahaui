import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from 'components/Tooltip';
import { act } from 'react-dom/test-utils';
import Overlay from '../index';
import * as CreatePopperConfig from '../../../utils/createPopperConfig';

const spyCreatePopperConfig = jest.spyOn(CreatePopperConfig, 'default') as jest.MockedFunction<typeof CreatePopperConfig.default>;

describe('components/Overlay/Base', () => {
  let triggerOnHidden: () => void;
  let mockOnExited: jest.Mock;
  const target = document.createElement('div');

  beforeEach(() => {
    mockOnExited = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = (props = {}) => {
    const Transition = ({ children, onExited }: any) => {
      triggerOnHidden = () => onExited();

      return (
        <div>
          Transition Text
          {children}
        </div>
      );
    };

    const Component = (props = {}) => (
      <Overlay
        target={target}
        show
        rootClose
        onExited={mockOnExited}
        transition={Transition}
        {...props}
      >
        {props => (
          <Tooltip
            {...props}
            id="testing-tooltip"
          >
            Tooltip Text
          </Tooltip>
        )}
      </Overlay>
    );

    const { rerender } = render(<Component {...props} />);
    const newRerender = (props = {}) => rerender(<Component {...props} />);

    return { rerender: newRerender };
  };

  it('should renders with required props', () => {
    // Render component
    const { rerender } = setup();

    // Expect default rendering
    expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')?.parentElement).not.toHaveClass('u-opacityNone');

    expect(screen.queryByText('Transition Text')).toBeInTheDocument();

    // Test onExited
    act(() => {
      triggerOnHidden();
    });

    expect(mockOnExited).toBeCalledTimes(1);

    // Should still render transition component
    rerender({
      show: false,
    });

    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')?.parentElement).toHaveClass('u-opacityNone');

    expect(screen.queryByText('Transition Text')).toBeInTheDocument();
  });

  it('should render none when no container existed', () => {
    // Mocking so that no container existed
    jest.mock('dom-helpers/ownerDocument', () => jest.fn(() => ({
      body: null,
    })));

    // Render components
    setup({
      // should return null container so that overlay will use our mocked dom-helpers/ownerDocument
      container: () => null,
    });

    // Should not render anything
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    expect(screen.queryByText('Transition Text')).not.toBeInTheDocument();
  });

  it('should create correct popper config for the overlay', () => {
    // Render components
    setup({
      placement: 'top',
      containerPadding: 12,
      flip: true,
    });

    // Expect default rendering
    expect(spyCreatePopperConfig.mock.calls[0][0]).toMatchObject({
      placement: 'top',
      containerPadding: 12,
      flip: true,
    });
  });
});
