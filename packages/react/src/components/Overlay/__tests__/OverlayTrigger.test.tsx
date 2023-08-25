import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Tooltip from 'components/Tooltip';
import { act } from 'react-dom/test-utils';
import * as UsePopper from 'hooks/usePopper';
import { setupWithUserEvent } from 'utils/test';
import Overlay from '../index';

const spyUsePopper = jest.spyOn(UsePopper, 'default');

describe('components/Overlay/Trigger', () => {
  let mockHandleClick: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockHandleClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const setup = ({ handleClick, ...props }: any = {}) => setupWithUserEvent(render(
    <>
      <Overlay.Trigger
        placement="top"
        defaultShow={false}
        delay={0}
        overlay={() => (
          <Tooltip id="testing-tooltip">
            Tooltip Text
          </Tooltip>
        )}
        {...props}
      >
        <div>
          <button type="button" onClick={handleClick}>Toggle Overlay</button>
        </div>
      </Overlay.Trigger>
      <div className="u-positionRelative">Other Element</div>
    </>,
  ));

  it('should toggle overlay.trigger with default triggers', async () => {
    // Render component
    const { user } = setup();

    // Expect default rendering
    const triggerOverlay = screen.getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();

    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // // It should support hover event by default
    await user.hover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    await user.unhover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  it('should toggle overlay.trigger with given trigger and has no delay', async () => {
    // Render components
    const { user } = setup({
      trigger: ['hover', 'click', 'focus'],
      hoverOverlay: true,
      handleClick: mockHandleClick,
    });

    // Expect default rendering
    const triggerOverlay = screen.getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    expect(mockHandleClick).toBeCalledTimes(0);

    // It should support all given triggers
    // Hover
    await user.hover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    await user.unhover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // Focus
    act(() => {
      triggerOverlay.focus();
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      triggerOverlay.blur();
    });
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // Click
    fireEvent.click(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
    expect(mockHandleClick).toBeCalledTimes(1);
  });

  it('should not toggle overlay.trigger with un-given trigger', async () => {
    // Render components
    const { user } = setup({
      trigger: ['click'],
    });

    // Expect default rendering
    const triggerOverlay = screen.getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // It should not support un-given triggers
    // Hover
    await user.hover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // Focus
    triggerOverlay.focus();
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  it.each([
    ['toggle', 'no element', () => undefined, true],
    ['toggle', 'the other element', () => screen.getByText('Other Element'), true],
    ['not toggle', 'the same element', () => screen.getByText('Toggle Overlay').parentElement, false],
    ['not toggle', 'the descendant element', () => screen.getByText('Toggle Overlay'), false],
  ])('should %s overlay.trigger with delay on hovering %s', async (_, __, getTarget, shouldToggle) => {
    // Render components
    const { user } = setup({
      delay: {
        show: 1000,
        hide: 500,
      },
    });

    // Expect default rendering
    const triggerOverlay = screen.getByText('Toggle Overlay');
    expect(triggerOverlay).toBeInTheDocument();
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    // It should wait for setTimeout before showing/hiding
    await user.hover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    await user.unhover(triggerOverlay);
    const relatedTarget = getTarget();
    if (relatedTarget !== null) {
      await user.pointer({ target: relatedTarget });
    }
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    if (shouldToggle) {
      expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    } else {
      expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
    }
  });

  it('should not show overlay.trigger within delay', async () => {
    const { user } = setup({
      delay: {
        show: 2000,
      },
    });

    const triggerOverlay = screen.getByText('Toggle Overlay');
    await user.hover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();

    await user.unhover(triggerOverlay);
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
  });

  it('should not hide overlay.trigger within delay', async () => {
    const { user } = setup({
      delay: {
        show: 0,
        hide: 2000,
      },
    });

    const triggerOverlay = screen.getByText('Toggle Overlay');
    await user.hover(triggerOverlay);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    await user.unhover(triggerOverlay);
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();

    await user.hover(triggerOverlay);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
  });

  it('should render overlay.trigger with overlay component', async () => {
    // Render components
    const { user } = setup({
      overlay: (<div>Tooltip Text</div>),
    });

    const triggerOverlay = screen.getByText('Toggle Overlay');
    await user.hover(triggerOverlay);
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
  });

  it('should render overlay.trigger with targetRef whose element having position relative', async () => {
    const targetRef = React.createRef<HTMLDivElement>(); // relative element
    Object.assign(targetRef, { current: document.createElement('div') });

    const { user } = setup({ targetRef });

    const triggerOverlay = screen.getByText('Toggle Overlay');

    await user.hover(triggerOverlay);
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByText('Tooltip Text')).toBeInTheDocument();
    expect(spyUsePopper.mock.calls[0][0]).toBe(targetRef.current);
  });
});
