import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useRootClose from 'hooks/useRootClose';
import type { MouseEvents } from 'hooks/useRootClose';
import userEvent from '@testing-library/user-event';
import { render, fireEvent } from '@testing-library/react';

describe('useRootClose', () => {
  let renderRoot: HTMLDivElement;
  let myDiv: () => Element | null;
  let root: Element & { ontouchstart: any } | null;

  const Wrapper = ({
    onRootClose,
    event: clickTrigger,
    disabled = false,
    children,
  }: {
    onRootClose: jest.Mock;
    event?: MouseEvents;
    disabled?: boolean;
    children: JSX.Element | string;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    useRootClose(ref, onRootClose, {
      clickTrigger,
      disabled,
    });

    return (
      <div ref={ref} id="my-div">
        {children}
      </div>
    );
  };

  beforeEach(() => {
    renderRoot = document.createElement('div');

    // Mock for mobileSafariHackListeners
    root = document.querySelector('#root');
    if (root) {
      root.ontouchstart = () => { };
    } else {
      document.ontouchstart = () => { };
    }

    document.body.appendChild(renderRoot);

    myDiv = () => renderRoot.querySelector('#my-div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(renderRoot);
    document.body.removeChild(renderRoot);
  });

  describe.each([
    undefined,
    'click',
  ] as (undefined | MouseEvents)[])('using default event', (event) => {
    it('should close when clicked outside', () => {
      const handleRootClose = jest.fn();

      render(<Wrapper onRootClose={handleRootClose} event={event}>hello there</Wrapper>, { container: renderRoot });

      const currentDiv = myDiv();
      if (currentDiv) {
        userEvent.click(currentDiv);

        expect(handleRootClose).not.toHaveBeenCalled();

        userEvent.click(document.body);

        expect(handleRootClose).toHaveBeenCalled();
      }
    });

    it('should not close when disabled', () => {
      const handleRootClose = jest.fn();

      render(<Wrapper onRootClose={handleRootClose} event={event} disabled>hello there</Wrapper>, { container: renderRoot });

      const currentDiv = myDiv();
      if (currentDiv) {
        userEvent.click(currentDiv);

        expect(handleRootClose).not.toHaveBeenCalled();

        userEvent.click(document.body);

        expect(handleRootClose).not.toHaveBeenCalled();
      }
    });

    it('should close when inside another RootCloseWrapper', () => {
      const handleInnerRootClose = jest.fn();
      const handleOuterRootClose = jest.fn();

      render(
        <Wrapper onRootClose={handleOuterRootClose} event={event}>
          <div>
            <div id="my-div">hello there</div>
            <Wrapper onRootClose={handleInnerRootClose} event={event}>
              <div id="my-other-div">hello there</div>
            </Wrapper>
          </div>
        </Wrapper>,
        { container: renderRoot },
      );

      const currentDiv = myDiv();
      if (currentDiv) {
        userEvent.click(currentDiv);

        expect(handleOuterRootClose).not.toHaveBeenCalled();
        expect(handleInnerRootClose).toHaveBeenCalled();
      }
    });
  });

  describe('using keyup event', () => {
    it('should close when escape keyup', () => {
      const handleRootClose = jest.fn();

      render(<Wrapper onRootClose={handleRootClose}>hello there</Wrapper>);

      fireEvent.keyDown(document.body, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });

      expect(handleRootClose).not.toHaveBeenCalled();

      fireEvent.keyUp(document.body, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });

      expect(handleRootClose).toHaveBeenCalledTimes(1);
    });

    it('should close when inside another RootCloseWrapper', () => {
      const handleInnerRootClose = jest.fn();
      const handleOuterRootClose = jest.fn();

      render(
        <Wrapper onRootClose={handleOuterRootClose}>
          <div>
            <div id="my-div">hello there</div>
            <Wrapper onRootClose={handleInnerRootClose}>
              <div id="my-other-div">hello there</div>
            </Wrapper>
          </div>
        </Wrapper>,
      );

      fireEvent.keyUp(document.body, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });

      expect(handleInnerRootClose).toHaveBeenCalledTimes(1);
    });
  });
});
