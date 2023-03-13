import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useEventCallback from '@restart/hooks/useEventCallback';
import Icon from 'components/Icon';
import ModalContext from './Context';

const propTypes = {
  /** Specify whether the Component should contain a close button */
  closeButton: PropTypes.bool,
  /** A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically be propagated up to the parent Modal onHide. */
  onHide: PropTypes.func,
};

const defaultProps = {
  closeButton: false,
};

const Header = React.forwardRef(({ className, children, closeButton, onHide, ...props }, ref) => {
  const context = useContext(ModalContext);
  const [closeHover, setCloseHover] = useState(false);
  const handleClick = useEventCallback(() => {
    if (context) context.onHide();
    if (onHide) onHide();
  });

  return (
    <div
      ref={ref}
      {...props}
      className="Modal-header u-positionRelative u-backgroundWhite u-paddingHorizontalMedium u-paddingTopLarge u-paddingBottomSmall"
    >
      {children}
      {closeButton && (
        <button
          type="button"
          className="Modal-close u-positionAbsolute u-backgroundTransparent u-borderNone u-cursorPointer u-paddingTiny u-lineHeightReset"
          onMouseEnter={() => setCloseHover(closeHover => !closeHover)}
          onMouseLeave={() => setCloseHover(closeHover => !closeHover)}
          onClick={handleClick}
          data-testid="modal-close-button"
          aria-label="Close modal"
        >
          <Icon
            name="close"
            className={classNames(
              closeHover ? 'u-opacityReset' : 'u-opacityHalf',
            )}
          />
        </button>
      )}
    </div>
  );
});

Header.displayName = 'ModalHeader';
Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default Header;
