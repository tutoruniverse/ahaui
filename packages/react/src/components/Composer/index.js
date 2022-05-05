import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextareaAutoSize from 'react-textarea-autosize';
import Icon from 'components/Icon';
import Overlay from 'components/Overlay';
import Tooltip from 'components/Tooltip';

const propTypes = {
  /**
   * A set of input props passed directly to `react-textarea-autosize`'s component.
   */
  inputProps: PropTypes.object,
  /**
   * A set of AttachButton props
   */
  attachButtonProps: PropTypes.object,
  /** Disable the Attach button to render */
  disabledAttachButton: PropTypes.bool,
  /** Custom tooltip of the attach button  */
  tooltipAttachButton: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  /**
   * A set of SendButton props
   */
  sendButtonProps: PropTypes.object,
  /** Manually set the visual state of the attach button to :active */
  sendButtonActive: PropTypes.bool,
  /** Disable the Send button to render */
  disabledSendButton: PropTypes.bool,
  /** Custom tooltip of the send button  */
  tooltipSendButton: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  /** Custom sendButton Icon */
  sendButtonIcon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Set it will disabled `inputProps` */
  children: PropTypes.any,
};
const defaultProps = {
  inputProps: {},
  attachButtonProps: {},
  disabledAttachButton: false,
  disabledSendButton: true,
  sendButtonProps: {},
  sendButtonActive: false,
  sendButtonIcon: 'send',
};

const Composer = React.forwardRef(({ className, children, sendButtonIcon, iconLeft, label, number, inputProps, disabledAttachButton, tooltipAttachButton, attachButtonProps, sendButtonProps, disabledSendButton, sendButtonActive, tooltipSendButton, as: Component = 'div', ...props }, ref) => (
  <Component
    ref={ref}
    {...props}
    className={classNames(
      'Composer',
      'u-flex u-alignItemsEnd u-borderTop u-paddingTiny',
      className && className,
    )}
  >
    {!disabledAttachButton && (

    <div className="u-flexShrink0 u-marginRightTiny">
      {tooltipAttachButton ? (
        <Overlay.Trigger
          placement="top-start"
          overlay={props => (
            <Tooltip id="tooltip-attachButton" {...props}>
              {typeof (tooltipAttachButton) === 'function'
                ? tooltipAttachButton()
                : tooltipAttachButton}
            </Tooltip>
          )}
        >
          <div
            {...attachButtonProps}
            className={classNames(
              'hover:u-backgroundPrimary hover:u-textWhite u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-cursorPointer',
              attachButtonProps.className && attachButtonProps.className,
            )}
            style={{
              width: 42,
              height: 42,
              ...attachButtonProps.style,
            }}
          >
            <Icon
              name="attach"
            />
          </div>
        </Overlay.Trigger>
      ) : (
        <div
          {...attachButtonProps}
          className={classNames(
            'hover:u-backgroundPrimary hover:u-textWhite u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-cursorPointer',
            attachButtonProps.className && attachButtonProps.className,
          )}
          style={{
            width: 42,
            height: 42,
            ...attachButtonProps.style,
          }}
        >
          <Icon
            name="attach"
          />
        </div>
      )}
    </div>
    )}
    {children || (
    <TextareaAutoSize
      {...inputProps}
      className={classNames(
        'u-widthFull u-paddingVerticalExtraSmall u-border u-borderTransparent u-textPlaceholder',
        inputProps.className && inputProps.className,
      )}
      style={{
        resize: 'none',
        ...inputProps.style,
      }}
    />
    )}
    {!disabledSendButton && (
      tooltipSendButton ? (
        <Overlay.Trigger
          placement="top-end"
          overlay={props => (
            <Tooltip id="tooltip-sendButton" {...props}>
              {typeof (tooltipSendButton) === 'function'
                ? tooltipSendButton()
                : tooltipSendButton}
            </Tooltip>
          )}
        >
          <div
            {...sendButtonProps}
            className={classNames(
              'u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-flexShrink0 u-marginLeftTiny',
              sendButtonActive ? 'hover:u-backgroundPrimary hover:u-textWhite u-textPrimary u-cursorPointer' : 'u-textLight u-cursorNotAllow u-pointerEventsNone',
              sendButtonProps.className && sendButtonProps.className,
            )}
            style={{
              width: 42,
              height: 42,
              ...sendButtonProps.style,
            }}
          >
            {typeof (sendButtonIcon) === 'function'
              ? sendButtonIcon()
              : <Icon name={sendButtonIcon} /> }
          </div>
        </Overlay.Trigger>
      ) : (
        <div
          {...sendButtonProps}
          className={classNames(
            'u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-flexShrink0 u-marginLeftTiny',
            sendButtonActive ? 'hover:u-backgroundPrimary hover:u-textWhite u-textPrimary u-cursorPointer' : 'u-textLight u-cursorNotAllow u-pointerEventsNone',
            sendButtonProps.className && sendButtonProps.className,
          )}
          style={{
            width: 42,
            height: 42,
            ...sendButtonProps.style,
          }}
        >
          {typeof (sendButtonIcon) === 'function'
            ? sendButtonIcon()
            : <Icon name={sendButtonIcon} /> }
        </div>
      )
    )}
  </Component>
));

Composer.displayName = 'Composer';
Composer.defaultProps = defaultProps;
Composer.propTypes = propTypes;
export default Composer;
