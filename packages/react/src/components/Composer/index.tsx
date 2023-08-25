import React from 'react';
import classNames from 'classnames';
import TextareaAutoSize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import Icon, { IconNameEnum, IconName } from 'components/Icon';
import Overlay from 'components/Overlay';
import Tooltip from 'components/Tooltip';
import { AhaRefForwardingComponent, AsProp, PlacementEnum } from 'types/common';

export interface ComposerProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * A set of input props passed directly to `react-textarea-autosize`'s component.
   */
  inputProps?: TextareaAutosizeProps & {
    'data-testid'?: string;
    ref?: React.Ref<HTMLTextAreaElement>;
  };
  /**
   * A set of AttachButton props
   */
  attachButtonProps?: React.HTMLAttributes<HTMLDivElement> & {
    'data-testid'?: string;
  };
  /**
   * Disable the Attach button to render
   * @default false
   */
  disabledAttachButton?: boolean;
  /**
   * Custom tooltip of the attach button
   */
  tooltipAttachButton?: string | (() => React.ReactNode);
  /**
   * A set of SendButton props
   */
  sendButtonProps?: React.HTMLAttributes<HTMLDivElement> & {
    'data-testid'?: string;
  };
  /**
   * Manually set the visual state of the attach button to :active
   * @default true
   */
  sendButtonActive?: boolean;
  /**
   * Disable the Send button to render
   * @default false
   */
  disabledSendButton?: boolean;
  /**
   * Custom tooltip of the send button
   */
  tooltipSendButton?: string | (() => React.ReactNode);
  /**
   * Custom sendButton Icon
   * @default 'send'
   */
  sendButtonIcon?: IconName | (() => React.ReactNode);
}

const Composer: AhaRefForwardingComponent<React.ElementType, ComposerProps> = React.forwardRef(
  (
    {
      className,
      children,
      inputProps = {},
      attachButtonProps = {},
      disabledAttachButton = false,
      tooltipAttachButton,
      sendButtonProps = {},
      sendButtonActive = true,
      sendButtonIcon = IconNameEnum.send,
      disabledSendButton = false,
      tooltipSendButton,
      as,
      ...props
    }: ComposerProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    return (
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
                defaultShow={false}
                placement={PlacementEnum.topStart}
                overlay={(props) => (
                  <Tooltip {...props} id="tooltip-attachButton">
                    {typeof tooltipAttachButton === 'function'
                      ? tooltipAttachButton()
                      : tooltipAttachButton}
                  </Tooltip>
                )}
                delay={{
                  show: 200,
                  hide: 1,
                }}
              >
                <div
                  {...attachButtonProps}
                  className={classNames(
                    'hover:u-backgroundPrimary hover:u-textWhite u-roundedMedium u-flex u-alignItemsCenter u-justifyContentCenter u-cursorPointer withOverlay',
                    attachButtonProps.className && attachButtonProps.className,
                  )}
                  style={{
                    width: 42,
                    height: 42,
                    ...attachButtonProps.style,
                  }}
                >
                  <Icon
                    name={IconNameEnum.attach}
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
                  name={IconNameEnum.attach}
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
              inputProps.disabled && 'u-backgroundNeutral30',
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
              defaultShow={false}
              placement={PlacementEnum.topEnd}
              overlay={(props) => (
                <Tooltip {...props} id="tooltip-sendButton">
                  {typeof tooltipSendButton === 'function'
                    ? tooltipSendButton()
                    : tooltipSendButton}
                </Tooltip>
              )}
              delay={{
                show: 200,
                hide: 1,
              }}
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
                {typeof sendButtonIcon === 'function'
                  ? sendButtonIcon()
                  : <Icon name={sendButtonIcon} />}
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
              {typeof sendButtonIcon === 'function'
                ? sendButtonIcon()
                : <Icon name={sendButtonIcon} />}
            </div>
          )
        )}
      </Component>
    );
  });

const ComposerWithDisplayName = Object.assign(Composer, {
  displayName: 'Composer',
});

export default ComposerWithDisplayName;
