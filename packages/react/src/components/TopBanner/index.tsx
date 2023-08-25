import React, { useState } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import Icon from 'components/Icon';
import Fade, { FadeProps } from 'components/Fade';
import { Transition } from 'react-transition-group';
import { AhaRefForwardingComponent } from 'types/common';

export interface TopBannerProps extends React.HTMLAttributes<HTMLElement> {
  /** Sets image shape as background. */
  bgImage?: string;

  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the TopBanner.
   */
  dismissible?: boolean;

  /** Controls the visual state of the TopBanner. */
  show?: boolean;

  /** Callback fired when TopBanner is closed. */
  onClose?: (show: false, e: React.MouseEvent) => void;

  /** A `react-transition-group` Transition component used to animate the TopBanner on dismissal. */
  transition?: React.ForwardRefExoticComponent<Pick<FadeProps, string | number> & React.RefAttributes<Transition<HTMLElement | undefined>>>;
}

const controllable = {
  show: 'onClose',
} as const;

export const TopBanner: AhaRefForwardingComponent<React.ElementType, TopBannerProps> = React.forwardRef(
  (
    props : TopBannerProps,
    ref : React.ForwardedRef<HTMLDivElement>,
  ) => {
    const defaultValues = { transition: Fade };
    const uncontrolledProps = { ...defaultValues, ...props };

    const {
      className,
      bgImage,
      children,
      dismissible,
      onClose,
      transition,
      show = true,
      ...otherProps
    } = useUncontrolled<TopBannerProps>(
      uncontrolledProps,
      controllable,
    );

    const [dismissButtonHover, setDismissButtonHover] = useState(false);

    const handleClose: React.MouseEventHandler = useEventCallback((e) => {
      onClose?.(false, e);
    });

    const handleDismissButtonHover = () => {
      setDismissButtonHover((dismissButtonHover) => !dismissButtonHover);
    };

    if (!show) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...otherProps}
        data-testid="TopBanner"
        className={classNames(
          'TopBanner',
          'u-positionRelative u-overflowHidden u-flex u-cursorPointer u-alignItemsCenter u-paddingVerticalTiny',
          className && className,
        )}
      >
        {bgImage && (
          <div className="TopBanner-background u-positionAbsolute u-positionCenter" data-testid="TopBanner-background">
            <img src={bgImage} alt="" data-testid="TopBanner-background-image" />
          </div>
        )}

        <div className="u-positionRelative u-flexGrow1 u-alignSelfCenter u-textCenter">
          {children}
        </div>

        {dismissible && (
          <div
            data-testid="TopBanner-button"
            className="TopBanner-button u-marginHorizontalSmall"
            onMouseEnter={handleDismissButtonHover}
            onMouseLeave={handleDismissButtonHover}
            onClick={handleClose}
          >
            <Icon
              data-testid="top-banner-button-icon"
              name="close"
              size="tiny"
              className={classNames(
                dismissButtonHover ? 'u-opacityReset' : 'u-opacityHalf',
              )}
            />
          </div>
        )}
      </div>
    );
  });

const TopBannerWithDisplayName = Object.assign(TopBanner, {
  displayName: 'TopBanner',
});

export default TopBannerWithDisplayName;
