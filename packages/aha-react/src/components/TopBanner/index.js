import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { elementType } from 'prop-types-extra';
import Icon from 'components/Icon';
import Fade from 'components/Fade';

const propTypes = {
  /** Sets image shape as background. */
  bgImage: PropTypes.node,
  /**
   * Renders a properly aligned dismiss button, as well as
   * adding extra horizontal padding to the TopBanner.
   * @default false
   */
  dismissible: PropTypes.bool,
  /**
   * Controls the visual state of the TopBanner.
   * @controllable onClose
   * */
  show: PropTypes.bool,
  /** Callback fired when TopBanner is closed. */
  onClose: PropTypes.func,
  /** A `react-transition-group` Transition component used to animate the TopBanner on dismissal. */
  transition: elementType,
};

const defaultProps = {
  show: true,
  transition: Fade,
};
const controllables = {
  show: 'onClose',
};

const TopBanner = React.forwardRef((uncontrolledProps, ref) => {
  const {
    className,
    bgImage,
    children,
    dismissible,
    onClose,
    show,
    transition: Transition,
    ...props } = useUncontrolled(uncontrolledProps, controllables);
  const [dismissButtonHover, setDismissButtonHover] = useState(false);
  const handleClose = useEventCallback((e) => {
    onClose(false, e);
  });
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'TopBanner',
        'u-positionRelative u-overflowHidden u-flex u-cursorPointer u-alignItemsCenter u-paddingVerticalTiny',
        className && className,
      )}
    >
      {bgImage && (
      <div className="TopBanner-background u-positionAbsolute u-positionCenter">
        <img src={bgImage} alt="" />
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

TopBanner.displayName = 'TopBanner';
TopBanner.defaultProps = defaultProps;
TopBanner.propTypes = propTypes;
export default TopBanner;
