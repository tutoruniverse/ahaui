import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from 'components/Tooltip';
import { act } from 'react-dom/test-utils';
import Overlay from '../index';
import type { TransitionType } from '../Base';

describe('Overlay component', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with required props', () => {
    const target = document.createElement('div');
    let testOnHidden: any;

    const mockTransition = ({ children, onExited }: any) => {
      testOnHidden = () => onExited();

      return (
        <div>
          {children}
        </div>
      );
    };

    const mockOnExited = jest.fn();
    const { getByText } = render(
      <Overlay
        target={target}
        placement="top"
        show
        rootClose
        onExited={mockOnExited}
        transition={mockTransition as unknown as TransitionType}
      >
        {props => (
          <Tooltip
            id="date-selector-tooltip"
            className="u-shadowLarge"
            {...props}
          >
            Tooltip testing text
          </Tooltip>
        )}
      </Overlay>,
    );
    expect(getByText('Tooltip testing text')).toBeInTheDocument();

    testOnHidden();
    expect(mockOnExited).toBeCalledTimes(1);
  });

  test('Should render Transition even when show is false', async () => {
    const target = document.createElement('div');
    const mockTransition = ({ children }: any) => (
      <div>
        Transition testing text
        {children}
      </div>
    );
    const { queryByText, rerender } = render(
      <Overlay
        target={target}
        placement="top"
        show
        rootClose
        transition={mockTransition as unknown as TransitionType}
      >
        {props => (
          <Tooltip
            id="date-selector-tooltip"
            className="u-shadowLarge"
            {...props}
          >
            testing text
          </Tooltip>
        )}
      </Overlay>,
    );

    act(() => {
      rerender(
        <Overlay
          target={target}
          placement="top"
          show={false}
          rootClose
          transition={mockTransition as unknown as TransitionType}
        >
          {props => (
            <Tooltip
              id="date-selector-tooltip"
              className="u-shadowLarge"
              {...props}
            >
              Tooltip testing text
            </Tooltip>
          )}
        </Overlay>,
      );
    });

    expect(queryByText('Tooltip testing text')).toBeInTheDocument();
    expect(queryByText('Tooltip testing text')?.parentElement).toHaveClass('u-opacityNone');

    expect(queryByText('Transition testing text')).toBeInTheDocument();
  });

  test('Should render none when no container existed', () => {
    // mocking so that no container existed
    jest.mock('dom-helpers/ownerDocument', () => jest.fn(() => ({
      body: null,
    })));

    const target = document.createElement('div');
    const mockTransition = ({ children }: any) => (
      <div>
        Transition testing text
        {children}
      </div>
    );
    const { queryByText } = render(
      <Overlay
        target={target}
        placement="top"
        show
        rootClose
        transition={mockTransition as unknown as TransitionType}
        container={() => null}
      >
        {props => (
          <Tooltip
            id="date-selector-tooltip"
            className="u-shadowLarge"
            {...props}
          >
            Tooltip testing text
          </Tooltip>
        )}
      </Overlay>,
    );
    expect(queryByText('Tooltip testing text')).not.toBeInTheDocument();
    expect(queryByText('Transition testing text')).not.toBeInTheDocument();
  });
});
