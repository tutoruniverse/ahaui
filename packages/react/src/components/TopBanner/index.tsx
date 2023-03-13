import React, { useState } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import Icon from 'components/Icon';
import Fade from 'components/Fade';

type TopBannerProps = {
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
  onClose?: (...args: unknown[]) => void;
  /** A `react-transition-group` Transition component used to animate the TopBanner on dismissal. */
  transition?: JSX.Element;
  className?: string;
  children?: React.ReactElement;
};

const TopBanner = React.forwardRef(
  (
    props : TopBannerProps,
    ref : React.ForwardedRef<HTMLDivElement>,
  ) => {
    const defaultValues = { show: 'true', transition: Fade };
    const uncontrolledProps = { ...defaultValues, ...props } as TopBannerProps;

    const {
      className,
      bgImage,
      children,
      dismissible,
      onClose,
      ...otherProps
    } = useUncontrolled(
      uncontrolledProps,
      {
        show: 'onClose',
      },
    );

    const [dismissButtonHover, setDismissButtonHover] = useState(false);

    const handleClose = useEventCallback((e) => {
      onClose && onClose(false, e);
    });

    return (
      <div
        ref={ref}
        {...otherProps}
        className={classNames(
          'TopBanner',
          'u-positionRelative u-overflowHidden u-flex u-cursorPointer u-alignItemsCenter u-paddingVerticalTiny',
          className && className,
        )}
        data-testid="TopBanner"
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
          className="TopBanner-button u-marginHorizontalSmall"
          onMouseEnter={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onMouseLeave={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onClick={handleClose}
          data-testid="TopBanner-button"
        >
          <Icon
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

export default TopBanner;
