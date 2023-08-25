import React, { useState, useMemo } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useEventCallback from '@restart/hooks/useEventCallback';
import createBlock from 'utils/createBlock';
import Icon from 'components/Icon';
import Fade from 'components/Fade';
import { messagesVariants } from 'constants/messages';
import Context, { MessageEnum, MessageType, MessageVariantEnum, MessageVariantType } from './Context';
import Title from './Title';

export interface MessageProps extends React.HTMLAttributes<HTMLElement> {
  /** The Message visual type */
  type?: MessageType;

  /**
   * The Message visual variant
   */
  variant?: MessageVariantType;

  /**
   * Renders a properly aligned dismiss button, as well as adding extra horizontal padding to the Message.
   * @default false
   * */
  dismissible?: boolean;

  /**
   * Controls the visual state of the Message.
   * @default true
   * @controllable onClose
   * */
  show?: boolean;

  /**
   * Callback fired when message is closed.
  * @controllable show
   * */
  onClose?: (show: false, e: React.MouseEvent) => void;

  /** A `react-transition-group` Transition component used to animate the Message on dismissal. */
  transition?: React.FC | null;

  /**
   * @default false
   */
  disabled?: boolean;
}

const controllables = {
  show: 'onClose',
} as const;

const Message = React.forwardRef(
  (
    uncontrolledProps: MessageProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      variant = MessageVariantEnum.information,
      type = MessageEnum.form,
      show = true,
      dismissible = false,
      transition: Transition = Fade,
      className,
      children,
      disabled, // to disable close button
      onClose,
      ...props
    } = useUncontrolled<MessageProps>(uncontrolledProps, controllables);

    const [dismissButtonHover, setDismissButtonHover] = useState(false);
    const variantOri = messagesVariants.find((item) => item.type === type && item.id === variant);
    const context = useMemo(() => ({ variant, type }), [variant, type]);

    const handleClose = useEventCallback((e) => {
      if (disabled) {
        return;
      }

      onClose?.(false, e);
    });

    const alert = (
      <div
        ref={ref}
        role="alert"
        {...(Transition ? props : {})}
        className={classNames(
          'Message u-flex u-text200',
          (type !== 'system') && 'u-roundedMedium u-border',
          variantOri?.className,
          variantOri?.textClassName,
          className && className,
        )}
      >
        {children}
        {dismissible && (
        <div
          onMouseEnter={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onMouseLeave={() => setDismissButtonHover((dismissButtonHover) => !dismissButtonHover)}
          onClick={handleClose}
          className={classNames(
            'Message-button u-marginRightSmall u-marginTopSmall',
            (!disabled && dismissButtonHover) ? 'u-opacityReset' : 'u-opacityHalf',
            disabled && 'u-cursorDefault',
            variantOri?.textClassName,
          )}
          data-testid="message-close"
          role="button"
          aria-disabled={disabled}
          aria-label="dismiss alert"
          style={{
            height: 'fit-content',
          }}
        >
          <Icon name="close" size="tiny" />
        </div>
        )}
      </div>
    );

    if (!Transition) {
      return show ? (
        <Context.Provider value={context}>
          {alert}
        </Context.Provider>
      ) : null;
    }

    return (
      <Context.Provider value={context}>
        <Transition unmountOnExit {...props} in={show}>
          {alert}
        </Transition>
      </Context.Provider>
    );
  });

const Content = createBlock('Message-content');
const Container = createBlock('Message-container u-paddingSmall u-flexGrow1');

const MessageComponent = Object.assign(Message, {
  Title,
  Content,
  Container,
  displayName: 'Message',
});

export default MessageComponent;
