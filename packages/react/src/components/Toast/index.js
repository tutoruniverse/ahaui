import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer as ToastContainerBase, toast as toastBase } from 'react-toastify';
import Icon from 'components/Icon';

const propTypes = {
  /**
   * One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
   */
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'top-center',
    'bottom-left',
    'bottom-right',
    'bottom-center',
  ]),
  /**
   * Delay in ms to close the toast. If set to false, the notification needs to be closed manually
   */
  autoDismiss: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),
  /** Renders a properly aligned dismiss button */
  dismissible: PropTypes.bool,
  /**
   * Display or not the progress bar below the toast(remaining time)
   */
  hideProgressBar: PropTypes.bool,
};

const defaultProps = {
  position: 'top-right',
  autoDismiss: 5000,
  dismissible: true,
  hideProgressBar: false,
};

const ToastContainer = React.forwardRef(({ position, dismissible, autoDismiss, ...props }, ref) => (
  <ToastContainerBase
    ref={ref}
    {...props}
    autoClose={autoDismiss}
    position={position}
    closeOnClick
    pauseOnHover
    newestOnTop
    bodyClassName="u-text200"
    closeButton={dismissible ? ({ closeToast }) => <Icon onClick={closeToast} name="close" size="tiny" className="Toastify__close-button u-flexShrink0" /> : false}
  />
));
export const toast = toastBase;
ToastContainer.displayName = 'ToastContainer';
ToastContainer.defaultProps = defaultProps;
ToastContainer.propTypes = propTypes;
export default ToastContainer;
