import React from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';

const propTypes = {

};
const defaultProps = {

};

const ChatBox = React.forwardRef(({ className, ...props }, ref) => (
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

const List = React.forwardRef(({ className, children, innerClassName, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={classNames(
      'ChatBox-list u-positionRelative u-flexGrow1 u-flexShrink1',
      className && className,
    )}
  >
    <div
      className={classNames(
        'ChatBox-listInner u-overflowVerticalAuto u-paddingExtraSmall u-positionAbsolute u-positionFull u-webkitScrollbar',
        innerClassName && innerClassName,
      )}
    >
      {children}
    </div>
  </div>
));

const Context = createBlock('ChatBox-context u-positionRelative');
const Notice = React.forwardRef(({ className, children, ...props }, ref) => (
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

const Info = createBlock('ChatBox-info');
const Attachment = createBlock('ChatBox-attachment u-paddingExtraSmall u-borderTop');
ChatBox.List = List;
ChatBox.Attachment = Attachment;
ChatBox.Info = Info;
ChatBox.Context = Context;
ChatBox.Notice = Notice;
ChatBox.displayName = 'ChatBox';
ChatBox.defaultProps = defaultProps;
ChatBox.propTypes = propTypes;

export default ChatBox;
