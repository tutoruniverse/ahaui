import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from 'components/Tooltip';
import { act } from 'react-dom/test-utils';
import Overlay from '../index';

describe('Trigger', () => {
  jest.useFakeTimers();
  const mockHandleClick = jest.fn();

  test('toggles overlay.trigger with no delay', () => {
    const { getByText, queryByText } = render(
      <Overlay.Trigger
        trigger={['hover', 'click', 'focus']}
        placement="top"
        defaultShow={false}
        delay={0}
        hoverOverlay
        overlay={() => (
          <Tooltip id="testing-tooltip">
            Tooltip Text
          </Tooltip>
        )}
      >
        <button type="button" onClick={mockHandleClick}>Toggle Overlay</button>
      </Overlay.Trigger>,
    );

    const triggerOverlay = getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();

    // It should support all given triggers
    act(() => {
      userEvent.hover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      userEvent.unhover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();

    act(() => {
      userEvent.click(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).toBeInTheDocument();
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  test('toggles overlay.trigger with default triggers', () => {
    const { getByText, queryByText } = render(
      <Overlay.Trigger
        placement="top"
        defaultShow={false}
        delay={0}
        hoverOverlay
        overlay={() => (
          <Tooltip id="testing-tooltip">
            Tooltip Text
          </Tooltip>
        )}
      >
        <button type="button">Toggle Overlay</button>
      </Overlay.Trigger>,
    );

    const triggerOverlay = getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();

    // It should be default support hover event
    act(() => {
      userEvent.hover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      userEvent.unhover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  test('toggles overlay.trigger with delay', () => {
    const { getByText, queryByText } = render(
      <Overlay.Trigger
        trigger={['hover', 'click', 'focus']}
        placement="top"
        defaultShow={false}
        delay={1000}
        hoverOverlay
        overlay={() => (
          <Tooltip id="testing-tooltip">
            Tooltip Text
          </Tooltip>
        )}
      >
        <button type="button">Toggle Overlay</button>
      </Overlay.Trigger>,
    );

    const triggerOverlay = getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();

    // It should wait for setTimeout to finish counting before showing/hiding
    act(() => {
      userEvent.hover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    expect(queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      userEvent.unhover(triggerOverlay);
    });
    expect(queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    expect(queryByText('Tooltip Text')).not.toBeInTheDocument();
  });
});
