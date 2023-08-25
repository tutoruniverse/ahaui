import React, { useMemo } from 'react';
import classNames from 'classnames';
import Avatar from 'components/Avatar';
import { AhaRefForwardingComponent, EnumToUnion } from 'types/common';
import BubbleChatImage from './Image';
import Context from './Context';

export enum BubbleChatVariantEnum {
  light = 'light',
  primary = 'primary',
  primaryLight = 'primaryLight',
  dark = 'dark',
  transparentDark = 'transparentDark',
  transparentLight = 'transparentLight',
}

export enum BubbleChatTypeEnum {
  inbound = 'inbound',
  outbound = 'outbound',
  system = 'system',
}

export const variantOriType: Record<BubbleChatType, BubbleChatVariantEnum> = {
  [BubbleChatTypeEnum.inbound]: BubbleChatVariantEnum.primary,
  [BubbleChatTypeEnum.outbound]: BubbleChatVariantEnum.light,
  [BubbleChatTypeEnum.system]: BubbleChatVariantEnum.primaryLight,
};

const variantTextClassNames: Partial<Record<BubbleChatVariantEnum, string>> = {
  [BubbleChatVariantEnum.primary]: 'u-textWhite',
  [BubbleChatVariantEnum.dark]: 'u-textWhite',
  [BubbleChatVariantEnum.transparentDark]: 'u-textWhite',
};

const variantClassNames: Record<BubbleChatVariantEnum, string> = {
  [BubbleChatVariantEnum.primary]: 'u-backgroundPrimary',
  [BubbleChatVariantEnum.primaryLight]: 'u-backgroundPrimaryLight',
  [BubbleChatVariantEnum.light]: 'u-backgroundLightest',
  [BubbleChatVariantEnum.dark]: 'u-backgroundSemiDark',
  [BubbleChatVariantEnum.transparentDark]: 'u-backgroundTransparent',
  [BubbleChatVariantEnum.transparentLight]: 'u-backgroundTransparent',
};

const typeThemeClassNames: Record<BubbleChatType, string> = {
  [BubbleChatTypeEnum.inbound]: 'u-roundedBottomRightNone',
  [BubbleChatTypeEnum.outbound]: 'u-roundedBottomLeftNone',
  [BubbleChatTypeEnum.system]: '',
};

const typeRadiusClassNames: Record<BubbleChatType, string> = {
  [BubbleChatTypeEnum.inbound]: 'u-roundedExtraLarge u-roundedBottomRightNone',
  [BubbleChatTypeEnum.outbound]: 'u-roundedExtraLarge u-roundedBottomLeftNone',
  [BubbleChatTypeEnum.system]: 'u-roundedExtraLarge',
};

export type BubbleChatType = EnumToUnion<BubbleChatTypeEnum>;
type BubbleChatVariant = EnumToUnion<BubbleChatVariantEnum>;

interface BubbleChatOption {
  id: string | number;
  name: string;
}

export interface BubbleChatProps extends React.HTMLAttributes<HTMLElement> {
    /**
   * The typing message
   * @default false
   * */
    isTyping?: boolean;

    /** The text message */
    text?: string | React.ReactNode;

    /** The BubbleChat visual type */
    type?: BubbleChatType;

    /** The BubbleChat visual style */
    variant?: BubbleChatVariant;

    /** The avatar to display. The name can get from Component `Avatar` or custom it by your self */
    avatar?: string | React.FC;

    /** The time of a text message */
    time?: string | React.ReactNode;

    /** The list option using with type `system` */
    options?: BubbleChatOption[];

    /** Defines the current active option */
    currentOption?: number | string;

    /** Callback fired when the current active option changes. */
    onSelectOption?: (optionId: string | number) => void;

    /** Disables the list of options */
    disabledOption?: boolean;

    /** Callback fired when click to the text content */
    onClickText?: React.MouseEventHandler;

    textClassName?: string | string[];

    /** Render actionBar after text content  */
    actionBar?: React.ReactNode;

    /**  */
    actionBarClassName?: string | string[];
}

const BubbleChat: AhaRefForwardingComponent<'div', BubbleChatProps> = React.forwardRef(
  (
    {
      className,
      isTyping,
      text,
      type = BubbleChatTypeEnum.inbound,
      variant,
      time,
      avatar,
      options,
      currentOption,
      onSelectOption,
      disabledOption,
      children,
      onClickText,
      actionBar,
      actionBarClassName,
      textClassName,
      ...props
    }: BubbleChatProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    let variantOri: BubbleChatVariant;

    if (variant === undefined) {
      variantOri = variantOriType[type];
    } else {
      variantOri = variant;
    }

    const renderTime = () => {
      if (!time) {
        return null;
      }

      return (
        <>
          {/* Empty <div /> to occupy the bottom left corner of grid template */}
          {type !== BubbleChatTypeEnum.inbound && <div />}
          <div
            className={classNames(
              'BubbleChat-time',
              'u-text100 u-textLight u-marginTopTiny',
              !!(type === BubbleChatTypeEnum.inbound && children) && 'u-textRight',
            )}
            style={{
              ...(type === BubbleChatTypeEnum.inbound ? { justifySelf: 'flex-end' } : {}),
            }}
          >
            {time}
          </div>
          {/* Empty <div /> to occupy the bottom right corner of grid template */}
          {type === BubbleChatTypeEnum.inbound && <div />}
        </>
      );
    };

    const renderTyping = () => (
      <div
        className={classNames(
          'u-overflowHidden',
          type && typeRadiusClassNames[type],
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

    const renderAvatar = (type: BubbleChatType) => (
      <div
        data-testid="bubble-chat-avatar"
        className={classNames(
          type === BubbleChatTypeEnum.outbound ? 'u-marginRightExtraSmall' : 'u-marginLeftExtraSmall',
          'u-alignSelfEnd')}
      >
        {typeof (avatar) === 'function'
          ? avatar({})
          : <Avatar name={avatar} size="small" />}
      </div>
    );

    const renderLeftAvatar = () => {
      if (type === BubbleChatTypeEnum.inbound) {
        return null;
      }

      if (!avatar) {
        /* Empty <div /> to occupy the top left corner of grid template */
        return (<div data-testid="bubble-chat-avatar__empty" />);
      }

      return renderAvatar(BubbleChatTypeEnum.outbound);
    };

    const renderRightAvatar = () => {
      if ([BubbleChatTypeEnum.outbound, BubbleChatTypeEnum.system].includes(type as BubbleChatTypeEnum)) {
        return null;
      }

      /* Empty <div /> to occupy the top right corner of grid template */
      if (!avatar) {
        return (<div data-testid="bubble-chat-avatar__empty" />);
      }

      return renderAvatar(type);
    };

    const renderChildren = () => {
      if (children) {
        return children;
      }

      return (
        <div className="u-positionRelative">
          {actionBar && (
          <div
            data-testid="bubble-chat-action-bar"
            className={classNames(
              'u-positionAbsolute u-positionTop u-marginTopTiny u-marginHorizontalExtraSmall',
              type === BubbleChatTypeEnum.inbound ? 'u-positionRight-100' : 'u-positionLeft-100',
              actionBarClassName && actionBarClassName,
            )}
          >
            {actionBar}
          </div>
          )}

          <div className={classNames(
            'u-overflowHidden u-flexInline u-flexColumn',
            type && typeRadiusClassNames[type],
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
            <div
              data-testid="bubble-chat-options"
              className="u-flex u-flexColumn u-border u-borderUltraLight u-roundedBottomExtraLarge u-text200 u-overflowHidden"
            >
              {options.map((option, idx) => {
                let cn: string;
                let handleClick: React.MouseEventHandler | undefined;

                if (option.id === currentOption) {
                  cn = `u-backgroundPrimary ${textClassName || 'u-textWhite'} ${disabledOption ? 'u-cursorNotAllow' : ''}`;
                } else if (disabledOption) {
                  cn = 'u-backgroundLighter u-textGray u-cursorNotAllow';
                } else {
                  cn = 'u-backgroundWhite hover:u-backgroundLightest u-textPrimary u-cursorPointer';
                  handleClick = () => {
                    onSelectOption?.(option.id);
                  };
                }

                return (
                  <button
                    data-testid="bubble-chat-option"
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
      );
    };

    const context = useMemo(() => ({ type }), [type]);

    return (
      <Context.Provider value={context}>
        <div
          ref={ref}
          {...props}
          className={classNames(
            'BubbleChat',
            'u-marginBottomSmall',
            (type !== BubbleChatTypeEnum.inbound) ? 'u-marginRightExtraLarge' : 'u-marginLeftExtraLarge',
            className && className,
          )}
        >
          <div
            data-testid="bubble-chat-container"
            className={classNames(
              'BubbleChat-container',
              (type === BubbleChatTypeEnum.inbound) && 'u-justifyContentEnd u-marginLeftAuto',
            )}
            style={{
              display: 'grid',
              gridTemplateColumns: type === BubbleChatTypeEnum.inbound ? '1fr auto' : 'auto 1fr',
            }}
          >
            {renderLeftAvatar()}

            <div className={classNames(
              'BubbleChat-context',
              'u-flex u-flexColumn',
              children && 'u-maxWidthFull',
              (type === BubbleChatTypeEnum.inbound && !avatar) && 'u-marginLeftMedium',
              (type === BubbleChatTypeEnum.inbound && !children) && 'u-alignItemsEnd',
            )}
            >
              {isTyping && renderTyping()}
              {!isTyping && renderChildren()}
            </div>

            {renderRightAvatar()}

            {renderTime()}
          </div>
        </div>
      </Context.Provider>
    );
  });

const CompoundComponent = Object.assign(BubbleChat, {
  Image: BubbleChatImage,
  displayName: 'BubbleChat',
});

export default CompoundComponent;
