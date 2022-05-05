import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import { elementType } from 'prop-types-extra';
import createBlock from 'utils/createBlock';
import { messagesVariants } from 'constants/messages';
import Icon from 'components/Icon';
import Fade from 'components/Fade';
import Context from './Context';
import Title from './Title';

const propTypes = {
  /** The Message visual type */
  type: PropTypes.oneOf([
    'form',
    'system',
  ]),
  /**
   * The Message visual variant
   */
  variant: PropTypes.oneOf([
    'information',
    'positive',
    'warning',
    'negative',
  ]),
  /**
   * Renders a properly aligned dismiss button, as well as adding extra horizontal padding to the Message.
   * @default false
   * */
  dismissible: PropTypes.bool,
  /**
   * Controls the visual state of the Message.
   * @default true
   * @controllable onClose
   * */
  show: PropTypes.bool,
  /**
   * Callback fired when message is closed.
  * @controllable show
   * */
  onClose: PropTypes.func,
  /** A `react-transition-group` Transition component used to animate the Message on dismissal. */
  transition: elementType,
};

const defaultProps = {
  show: true,
  transition: Fade,
  type: 'form',
  variant: 'information',
};

const controllables = {
  show: 'onClose',
};
const Message = React.forwardRef((uncontrolledProps, ref) => {
  const {
    className,
    variant,
    type,
    children,
    dismissible,
    onClose,
    show,
    transition: Transition,
    ...props } = useUncontrolled(uncontrolledProps, controllables);
  const [dismissButtonHover, setDismissButtonHover] = useState(false);
  const variantOri = messagesVariants.find(item => item.type === type && item.id === variant);
  const context = useMemo(() => ({ variant, type }), [variant, type]);
  const handleClose = useEventCallback((e) => {
    onClose(false, e);
  });
  const alert = (
    <div
      ref={ref}
      role="alert"
      {...(Transition ? props : undefined)}
      {...props}
      className={classNames(
        'Message u-flex u-text200',
        (type !== 'system') && 'u-roundedMedium u-border',
        variantOri.className,
        variantOri.textClassName,
        className && className
      )}
    >
      {children}
      {dismissible && (
        <div
          onMouseEnter={() => setDismissButtonHover(dismissButtonHover => !dismissButtonHover)}
          onMouseLeave={() => setDismissButtonHover(dismissButtonHover => !dismissButtonHover)}
          onClick={handleClose}
          className={classNames(
            'Message-button u-marginRightSmall u-marginTopSmall',
            dismissButtonHover ? 'u-opacityReset' : 'u-opacityHalf',
            variantOri.textClassName
          )}
          data-testid="message-close"
          role="button"
          aria-label="dismiss alert"
        >
          <Icon name="close" size="tiny" />
        </div>
      )}
    </div>
  );
  if (!Transition) return show ? alert : null;

  return (
    <Context.Provider value={context}>
      <Transition unmountOnExit ref={ref} {...props} in={show}>
        {alert}
      </Transition>
    </Context.Provider>
  );
});
const Content = createBlock('Message-content');
const Container = createBlock('Message-container u-paddingSmall u-flexGrow1');
Message.Title = Title;
Message.Content = Content;
Message.Container = Container;
Message.displayName = 'Message';
Message.defaultProps = defaultProps;
Message.propTypes = propTypes;
export default Message;
