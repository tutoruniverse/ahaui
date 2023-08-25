import React, { createRef } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { setupWithUserEvent } from 'utils/test';
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
      jest.advanceTimersByTime(100);
    });
  };

  const renderToastContainer = (props: ToastProps = {}) => setupWithUserEvent(render(<ToastContainer ref={toastContainerRef} autoDismiss={1000} {...props} />));

  const setup = ({
    toastProps = {},
    toastMethod = ToastEmitterEnum.success,
  }: {
    toastProps?: ToastProps,
    toastMethod?: ToastEmitter,
  } = {}) => {
    const setupResult = renderToastContainer(toastProps);
    emitToast({
      method: toastMethod,
      id: TOAST_ID,
    });
    fireEvent.focus(window); // Trigger animation in toast
    return setupResult;
  };

  const triggerAnimationEnd = (node: HTMLElement | null) => {
    if (!node) return;
    fireEvent.animationEnd(node);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
  };

  describe('toast', () => {
    it.each(Object.values(ToastEmitterEnum))('should emit %s toast successfully', (method) => {
      setup({
        toastMethod: method,
      });
      expect(getToast()).toHaveClass(`Toastify__toast--${method}`);
    });

    it('should dismiss toast successfully', async () => {
      setup({
        toastMethod: 'success',
      });

      await act(() => {
        toast.dismiss(TOAST_ID);
        jest.advanceTimersByTime(1000);
      });

      triggerAnimationEnd(screen.queryByText('content'));

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
    it('should render successfully without passing props', async () => {
      const { user } = setup();
      // Container
      expect(toastContainerRef.current).toHaveClass('Toastify');
      expect(toastContainerRef.current?.id).toEqual(DEFAULT_TOAST_CONTAINER_ID);

      expect(getToastInnerContainer()).toBeInTheDocument();
      // Progress bar
      expect(getToastProgressBar()).toHaveStyle({
        animationPlayState: 'running',
        animationDuration: '1000ms',
      });
      // Close button
      const closeButton = getToastCloseButton() as HTMLElement;
      expect(closeButton).toHaveClass('Toastify__close-button');
      // Click to dismiss toast
      await user.click(closeButton);

      act(() => {
        triggerAnimationEnd(screen.queryByText('content'));
      });
      expect(getToastInnerContainer()).toBeFalsy();
    });

    it('should dismiss the toast after clicking on it', async () => {
      const { user } = setup();

      const toastMessage = getToast() as HTMLElement;
      await user.click(toastMessage);

      await act(() => {
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
