import React from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import { AhaRefForwardingComponent } from 'types/common';

export type ChatBoxProps = React.HTMLAttributes<HTMLElement>;

export type ChatBoxListProps = {
  innerClassName?: string;
} & React.HTMLAttributes<HTMLElement>;

export type ChatBoxNoticeProps = React.HTMLAttributes<HTMLElement>;

const ChatBox: AhaRefForwardingComponent<React.ElementType, ChatBoxProps> = React.forwardRef(
  (
    { className, ...props }: ChatBoxProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'ChatBox',
        'u-flex u-flexColumn u-positionRelative u-flexGrow1',
        className && className,
      )}
    />
  ));

const List: AhaRefForwardingComponent<React.ElementType, ChatBoxListProps> = React.forwardRef(
  (
    { className, children, innerClassName, ...props }: ChatBoxListProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'ChatBox-list u-positionRelative u-flexGrow1 u-flexShrink1',
        className && className,
      )}
      data-testid="chatbox-list"
    >
      <div
        className={classNames(
          'ChatBox-listInner u-overflowVerticalAuto u-paddingExtraSmall u-positionAbsolute u-positionFull u-webkitScrollbar',
          innerClassName && innerClassName,
        )}
        data-testid="chatbox-innerlist"
      >
        {children}
      </div>
    </div>
  ));

const Notice: AhaRefForwardingComponent<React.ElementType, ChatBoxNoticeProps> = React.forwardRef(
  (
    { className, children, ...props }: ChatBoxNoticeProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'ChatBox-notice u-positionAbsolute u-widthFull u-positionBottom-100 u-marginBottomSmall',
        className && className,
      )}
    >
      <div className="u-flex u-justifyContentCenter">
        {children}
      </div>
    </div>
  ));

const Context = createBlock('ChatBox-context u-positionRelative');
const Info = createBlock('ChatBox-info');
const Attachment = createBlock('ChatBox-attachment u-paddingExtraSmall u-borderTop');

const ChatBoxCompound = Object.assign(ChatBox, {
  List,
  Attachment,
  Info,
  Context,
  Notice,
  displayName: 'ChatBox',
});

export default ChatBoxCompound;
