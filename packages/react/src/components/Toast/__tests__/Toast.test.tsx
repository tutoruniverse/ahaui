import { act, fireEvent, render, screen } from '@testing-library/react';
import React, { createRef } from 'react';
import userEvent from '@testing-library/user-event';
import ToastContainer, {
  DEFAULT_TOAST_CONTAINER_ID,
  PositionEnum,
  ToastEmitter,
  ToastEmitterEnum,
  ToastProps,
  toast,
} from '..';

jest.useFakeTimers();

const TOAST_ID = 'toast-id';

describe('component/Toast', () => {
  const toastContainerRef = createRef<HTMLDivElement>();

  const getToastInnerContainer = () => toastContainerRef.current?.children[0];
  const getToast = (idx = 0) => getToastInnerContainer()?.children[idx];
  const getToastCloseButton = () => screen.queryByTestId('toast-close-button');
  const getToastProgressBar = () => screen.queryByRole('progressbar');

  const emitToast = ({
    method = ToastEmitterEnum.success,
    id,
  }: {
    method: ToastEmitter,
    id?: string,
  }) => {
    act(() => {
      toast[method](() => (<div>content</div>), {
        toastId: id && TOAST_ID,
        containerId: DEFAULT_TOAST_CONTAINER_ID,
      });
      jest.runAllTimers();
    });
  };

  const renderToastContainer = (props: ToastProps = {}) => {
    render(<ToastContainer ref={toastContainerRef} {...props} />);
  };

  const setup = ({
    toastProps = {},
    toastMethod = ToastEmitterEnum.success,
  }: {
    toastProps?: ToastProps,
    toastMethod?: ToastEmitter,
  } = {}) => {
    renderToastContainer(toastProps);
    emitToast({
      method: toastMethod,
      id: TOAST_ID,
    });
    fireEvent.focus(window); // Trigger animation in toast
  };

  function triggerAnimationEnd(node: HTMLElement | null) {
    if (!node) return;
    fireEvent.animationEnd(node);

    jest.runAllTimers();
  }

  describe('toast', () => {
    it.each(Object.values(ToastEmitterEnum))('should emit %s toast successfully', (method) => {
      setup({
        toastMethod: method,
      });
      expect(getToast()).toHaveClass(`Toastify__toast--${method}`);
    });

    it('should dismiss toast successfully', () => {
      setup({
        toastMethod: 'success',
      });

      act(() => {
        toast.dismiss(TOAST_ID);
        jest.runAllTimers();
        triggerAnimationEnd(screen.queryByText('content'));
      });

      expect(getToastInnerContainer()).toBeFalsy();
    });

    it('should toast multiple times successfully', () => {
      renderToastContainer();
      Object.values(ToastEmitterEnum).forEach((method) => emitToast({ method }));

      expect(getToastInnerContainer()?.children).toHaveLength(4);
      // Newest toast on top
      Object.values(ToastEmitterEnum).reverse().forEach((method, idx) => {
        expect(getToast(idx)).toHaveClass(`Toastify__toast--${method}`);
      });
    });
  });

  describe('ToastContainer', () => {
    it('should render successfully without passing props', () => {
      setup();
      // Container
      expect(toastContainerRef.current).toHaveClass('Toastify');
      expect(toastContainerRef.current?.id).toEqual(DEFAULT_TOAST_CONTAINER_ID);
      expect(getToastInnerContainer()).toBeInTheDocument();
      // Progress bar
      expect(getToastProgressBar()).toHaveStyle({
        animationPlayState: 'running',
        animationDuration: '5000ms',
      });
      // Close button
      const closeButton = getToastCloseButton() as HTMLElement;
      expect(closeButton).toHaveClass('Toastify__close-button');
      act(() => { // Click to dismiss toast
        userEvent.click(closeButton);
        jest.runAllTimers();
        triggerAnimationEnd(screen.queryByText('content'));
      });
      expect(getToastInnerContainer()).toBeFalsy();
    });

    it('should dismiss the toast after clicking on it', () => {
      setup();

      const toastMessage = getToast() as HTMLElement;
      act(() => {
        userEvent.click(toastMessage);
        jest.runAllTimers();
        triggerAnimationEnd(screen.queryByText('content'));
      });
      expect(getToastInnerContainer()?.children.length).toBeFalsy();
    });

    it.each(Object.values(PositionEnum))('should render with position="%s"', (position) => {
      setup({ toastProps: {
        position,
      } });
      expect(getToastInnerContainer()).toHaveClass(`Toastify__toast-container--${position}`);
    });

    it('should render with dismissible=false', () => {
      setup({ toastProps: {
        dismissible: false,
      } });
      expect(getToastCloseButton()).toBeFalsy();
    });

    it('should render with hideProgressBar=true', () => {
      setup({ toastProps: {
        hideProgressBar: true,
      } });
      expect(getToastProgressBar()).toBeFalsy();
    });
  });
});
