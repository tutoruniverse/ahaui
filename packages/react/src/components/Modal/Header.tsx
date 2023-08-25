import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import useEventCallback from '@restart/hooks/useEventCallback';
import Icon from 'components/Icon';
import ModalContext from './Context';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children?: React.ReactNode;
  /** Specify whether the Component should contain a close button */
  closeButton?: boolean;
  /** A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically be propagated up to the parent Modal onHide. */
  onHide?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  (
    {
      className,
      children,
      closeButton = false,
      onHide,
      ...props
    } : ModalHeaderProps,
    ref : React.ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useContext(ModalContext);
    const [closeHover, setCloseHover] = useState(false);
    const handleClick = useEventCallback(() => {
      context?.onHide?.();
      onHide?.();
    });

    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          'Modal-header u-positionRelative u-backgroundWhite u-paddingHorizontalMedium u-paddingTopLarge u-paddingBottomSmall',
          className && className,
        )}
      >
        {children}
        {closeButton && (
        <button
          type="button"
          className="Modal-close u-positionAbsolute u-backgroundTransparent u-borderNone u-cursorPointer u-paddingTiny u-lineHeightReset"
          onMouseEnter={() => setCloseHover((closeHover) => !closeHover)}
          onMouseLeave={() => setCloseHover((closeHover) => !closeHover)}
          onClick={handleClick}
          data-testid="modal-close-button"
          aria-label="Close modal"
        >
          <Icon
            name="close"
            className={classNames(
              closeHover ? 'u-opacityReset' : 'u-opacityHalf',
            )}
            data-testid="close-button-icon"
          />
        </button>
        )}
      </div>
    );
  });

const ModalHeaderWithDisplayName = Object.assign(Header, {
  displayName: 'Header',
});

export default ModalHeaderWithDisplayName;
