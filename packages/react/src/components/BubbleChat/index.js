import React, { useMemo } from 'react';
import PropTypes, { any } from 'prop-types';
import classNames from 'classnames';
import Avatar from 'components/Avatar';
import BubbleChatImage from './Image';
import Context from './Context';

const propTypes = {
  /**
   * The typing message
   * @default false
   * */
  isTyping: PropTypes.bool,
  /** The text message */
  text: PropTypes.any,
  /** The BubbleChat visual type */
  type: PropTypes.oneOf([
    'inbound',
    'outbound',
    'system',
  ]),
  /** The BubbleChat visual style */
  variant: PropTypes.oneOf([
    'light',
    'primary',
    'primaryLight',
    'dark',
    'transparentDark',
    'transparentLight',
  ]),
  /** The avatar to display. The name can get from Component `Avatar` or custom it by your sefl */
  avatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** The time of a text message */
  time: PropTypes.any,
  /** The list option using with type `system` */
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  /** Defines the current active option */
  currentOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /** Callback fired when the current active option changes. */
  onSelectOption: PropTypes.func,
  /** Disables the list of options */
  disabledOption: PropTypes.bool,
  /** Callback fired when click to the text content */
  onClickText: PropTypes.func,
  textClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /** Render actionBar after text content  */
  actionBar: any,
  /**  */
  actionBarClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

const defaultProps = {
  type: 'inbound',
};

const variantTextClassNames = {
  primary: 'u-textWhite',
  dark: 'u-textWhite',
  transparentDark: 'u-textWhite',
};

const variantClassNames = {
  primary: 'u-backgroundPrimary',
  primaryLight: 'u-backgroundPrimaryLight',
  light: 'u-backgroundLightest',
  dark: 'u-backgroundSemiDark',
  transparentDark: 'u-backgroundTransparent',
  transparentLight: 'u-backgroundTransparent',
};

const typeThemeClassNames = {
  inbound: 'u-roundedBottomRightNone',
  outbound: 'u-roundedBottomLeftNone',
  system: '',
};

const typeRadiusClassNames = {
  inbound: 'u-roundedExtraLarge u-roundedBottomRightNone',
  outbound: 'u-roundedExtraLarge u-roundedBottomLeftNone',
  system: 'u-roundedExtraLarge',
};

const BubbleChat = React.forwardRef(({ className, isTyping, text, type, variant, time, avatar, options, currentOption, onSelectOption, disabledOption, children, onClickText, actionBar, actionBarClassName, textClassName, ...props }, ref) => {
  let variantOri = variant;
  if (variant === undefined) {
    if (type === 'inbound') variantOri = 'primary';
    else if (type === 'outbound') variantOri = 'light';
    else if (type === 'system') variantOri = 'primaryLight';
  }

  const context = useMemo(() => ({ type }), [type]);

  const renderTime = () => (
    <>
      {/* Empty <div /> to occupy the bottom left corner of grid template */}
      {type !== 'inbound' && <div />}
      <div
        className={classNames(
          'BubbleChat-time',
          'u-text100 u-textLight u-marginTopTiny',
          (type === 'inbound' && children) && 'u-textRight'
        )}
        style={{
          ...(type === 'inbound' ? { justifySelf: 'flex-end' } : {}),
        }}
      >
        {time}
      </div>
      {/* Empty <div /> to occupy the bottom right corner of grid template */}
      {type === 'inbound' && <div />}
    </>
  );

  const renderTyping = () => (
    <div
      className={classNames(
        'u-overflowHidden',
        type && typeRadiusClassNames[type]
      )}
      style={{
        width: 'fit-content',
      }}
    >
      <div
        className={classNames(
          'BubbleChat-typing',
          'u-paddingExtraSmall u-positionRelative',
          type && typeThemeClassNames[type],
          variantOri && variantTextClassNames[variantOri],
          variantOri && variantClassNames[variantOri],
        )}
      >
        <div className="BubbleChat-typingContext u-positionRelative u-fontSizeNone" style={{ width: 32, height: 10 }} />
      </div>
    </div>
  );

  const renderAvatar = (type = 'outbound') => (
    <div className={
      classNames(
        type === 'outbound' ? 'u-marginRightExtraSmall' : 'u-marginLeftExtraSmall',
        'u-alignSelfEnd',
      )
    }
    >
      {typeof (avatar) === 'function'
        ? avatar()
        : <Avatar name={avatar} size="small" />
      }
    </div>
  );

  return (
    <Context.Provider value={context}>
      <div
        ref={ref}
        {...props}
        className={classNames(
          'BubbleChat',
          'u-marginBottomSmall',
          (type !== 'inbound') ? 'u-marginRightExtraLarge' : 'u-marginLeftExtraLarge',
          className && className
        )}
      >
        <div
          className={classNames(
            'BubbleChat-container',
            (type === 'inbound') && 'u-justifyContentEnd u-marginLeftAuto',
          )}
          style={{
            display: 'grid',
            gridTemplateColumns: type === 'inbound' ? '1fr auto' : 'auto 1fr',
          }}
        >
          {(type !== 'inbound' && avatar) && renderAvatar('outbound')}
          {/* Empty <div /> to occupy the top left corner of grid template */}
          {(type !== 'inbound' && !avatar) && <div />}

          <div className={classNames(
            'BubbleChat-context',
            'u-flex u-flexColumn',
            children && 'u-maxWidthFull',
            (type === 'inbound' && !avatar) && 'u-marginLeftMedium',
            (type === 'inbound' && !children) && 'u-alignItemsEnd'
          )}
          >
            <React.Fragment>
              {isTyping && renderTyping()}
              {!isTyping && (
                <React.Fragment>
                  {children || (
                    <div className="u-positionRelative">
                      {actionBar && (
                        <div className={classNames(
                          'u-positionAbsolute u-positionTop u-marginTopTiny u-marginHorizontalExtraSmall',
                          type === 'inbound' ? 'u-positionRight-100' : 'u-positionLeft-100',
                          actionBarClassName && actionBarClassName,
                        )}
                        >
                          {actionBar}
                        </div>
                      )}
                      <div className={classNames(
                        'u-overflowHidden u-flexInline u-flexColumn',
                        type && typeRadiusClassNames[type]
                      )}
                      >
                        <div
                          className={classNames(
                            'BubbleChat-text',
                            'u-paddingVerticalExtraSmall u-paddingHorizontalSmall u-textPreLine',
                            type && typeThemeClassNames[type],
                            ((variantOri === 'primary' || variantOri === 'dark' || variantOri === 'transparentDark') && textClassName) ? textClassName : variantTextClassNames[variantOri],
                            variantOri && variantClassNames[variantOri],

                          )}
                          onClick={onClickText}
                        >
                          {text}
                        </div>
                        {options && (
                          <div className="u-flex u-flexColumn u-border u-borderUltraLight u-roundedBottomExtraLarge u-text200 u-overflowHidden">
                            {options.map((option, idx) => {
                              let cn;
                              let handleClick;

                              if (option.id === currentOption) {
                                cn = `u-backgroundPrimary ${textClassName || 'u-textWhite'} ${disabledOption ? 'u-cursorNotAllow' : ''}`;
                                handleClick = null;
                              } else if (disabledOption) {
                                cn = 'u-backgroundLighter u-textGray u-cursorNotAllow';
                                handleClick = null;
                              } else {
                                cn = 'u-backgroundWhite hover:u-backgroundLightest u-textPrimary u-cursorPointer';
                                handleClick = () => onSelectOption(option.id);
                              }

                              return (
                                <button
                                  key={option.id}
                                  type="button"
                                  disabled={disabledOption}
                                  onClick={handleClick}
                                  className={classNames(
                                    'u-paddingExtraSmall u-transitionColors u-easeInOut u-duration150 u-textCenter',
                                    (idx !== 0) ? 'u-borderTop u-borderBottomNone u-borderLeftNone u-borderRightNone u-borderUltraLight' : 'u-borderNone',
                                    cn,
                                  )}
                                >
                                  {option.name}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          </div>

          {((type !== 'outbound' && type !== 'system') && avatar) && renderAvatar('inbound')}
          {/* Empty <div /> to occupy the top right corner of grid template */}
          {((type !== 'outbound' && type !== 'system') && !avatar) && <div />}

          {time && renderTime()}
        </div>
      </div>
    </Context.Provider>
  );
});

BubbleChat.Image = BubbleChatImage;
BubbleChat.displayName = 'BubbleChat';
BubbleChat.defaultProps = defaultProps;
BubbleChat.propTypes = propTypes;
export default BubbleChat;
