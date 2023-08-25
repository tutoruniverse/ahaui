import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useRootClose from 'hooks/useRootClose';
import { render, fireEvent } from '@testing-library/react';
import type { MouseEvents } from 'types/common';
import { setupWithUserEvent } from 'utils/test';

describe('hooks/useRootClose', () => {
  let renderRoot: HTMLDivElement;
  let myDiv: () => Element | null;
  let root: Element & { ontouchstart: any } | null;

  const Wrapper = ({
    onRootClose,
    children,
    props,
  }: {
    onRootClose: jest.Mock;
    props?: {
      clickTrigger?: MouseEvents;
      disabled?: boolean;
    }
    children: JSX.Element | string;
  }) => {
    const ref = useRef<HTMLDivElement>(null);

    useRootClose(ref, onRootClose, props);

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
  ] as (undefined | MouseEvents)[])('using default event', (clickTrigger) => {
    it('should close when clicked outside', async () => {
      const handleRootClose = jest.fn();

      const { user } = setupWithUserEvent(render(<Wrapper onRootClose={handleRootClose} props={{ clickTrigger }}>hello there</Wrapper>, { container: renderRoot }));

      const currentDiv = myDiv();
      if (currentDiv) {
        await user.click(currentDiv);

        expect(handleRootClose).not.toHaveBeenCalled();

        await user.click(document.body);

        expect(handleRootClose).toHaveBeenCalled();
      }
    });

    it('should not close when disabled', async () => {
      const handleRootClose = jest.fn();

      const { user } = setupWithUserEvent(render(<Wrapper onRootClose={handleRootClose} props={{ clickTrigger, disabled: true }}>hello there</Wrapper>, { container: renderRoot }));

      const currentDiv = myDiv();
      if (currentDiv) {
        await user.click(currentDiv);

        expect(handleRootClose).not.toHaveBeenCalled();

        await user.click(document.body);

        expect(handleRootClose).not.toHaveBeenCalled();
      }
    });

    it('should close when inside another RootCloseWrapper', async () => {
      const handleInnerRootClose = jest.fn();
      const handleOuterRootClose = jest.fn();

      const { user } = setupWithUserEvent(render(
        <Wrapper onRootClose={handleOuterRootClose} props={{ clickTrigger }}>
          <div>
            <div id="my-div">hello there</div>
            <Wrapper onRootClose={handleInnerRootClose} props={{ clickTrigger }}>
              <div id="my-other-div">hello there</div>
            </Wrapper>
          </div>
        </Wrapper>,
        { container: renderRoot },
      ));

      const currentDiv = myDiv();
      if (currentDiv) {
        await user.click(currentDiv);

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

    it('should not close when not escape keyup', () => {
      const handleRootClose = jest.fn();

      render(<Wrapper onRootClose={handleRootClose}>hello there</Wrapper>);

      fireEvent.keyUp(document.body, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13,
      });

      expect(handleRootClose).not.toHaveBeenCalled();
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
