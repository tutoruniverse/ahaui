import React from 'react';
import { ToastContainer as ToastContainerBase, toast as toastBase } from 'react-toastify';
import Icon from 'components/Icon';
import { EnumToUnion } from 'types/common';

export enum ToastEmitterEnum {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export type ToastEmitter = EnumToUnion<ToastEmitterEnum>;

export enum PositionEnum {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  TOP_CENTER = 'top-center',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_CENTER = 'bottom-center',
}

type Position = EnumToUnion<PositionEnum>;

export const DEFAULT_TOAST_CONTAINER_ID = 'DEFAULT_TOAST_CONTAINER_ID';

export interface ToastProps extends React.RefAttributes<HTMLDivElement> {
  /**
   * One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
   * @default 'top-right'
   */
  position?: Position;
  /**
   * Delay in ms to close the toast. If set to false, the notification needs to be closed manually
   * @default 5000
   */
  autoDismiss?: false | number;
  /**
   * Renders a properly aligned dismiss button
   * @default true
   */
  dismissible?: boolean;
  /**
   * Display or not the progress bar below the toast(remaining time)
   * @default false
   */
  hideProgressBar?: boolean;
}

type ToastComponent = (props: ToastProps) => React.ReactElement | null;

const ToastContainer: ToastComponent = React.forwardRef((
  {
    position = PositionEnum.TOP_RIGHT,
    dismissible = true,
    autoDismiss = 5000,
    hideProgressBar = false,
    ...props
  }: ToastProps,
  ref: React.ForwardedRef<HTMLDivElement>) => (
    <ToastContainerBase
      hideProgressBar={hideProgressBar}
      containerId={DEFAULT_TOAST_CONTAINER_ID}
      enableMultiContainer={false}
      ref={ref}
      autoClose={autoDismiss}
      position={position}
      closeOnClick
      pauseOnHover
      newestOnTop
      bodyClassName="u-text200"
      closeButton={dismissible ? ({ closeToast }: { closeToast: React.MouseEventHandler}) => (
        <Icon
          data-testid="toast-close-button"
          onClick={closeToast}
          name="close"
          size="extraSmall"
          className="Toastify__close-button u-flexShrink0"
        />
      ) : false}
      theme="colored"
      icon={false}
      {...props}
    />
));

export const toast = toastBase;
export default ToastContainer;
