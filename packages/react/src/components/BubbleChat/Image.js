import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';


const BubbleChatImage = React.forwardRef(({ className, ...props }, ref) => {
  const { type } = useContext(Context);
  return (
    <div
      ref={ref}
      className={classNames(
        'BubbleChat-image',
        'u-lineHeightNone',
        (type === 'inbound') && 'u-textRight',
        className && className
      )}
    >
      <img {...props} className="u-roundedExtraLarge u-border u-maxWidthFull" alt="" />
    </div>
  );
});

BubbleChatImage.displayName = 'BubbleChat.Image';
BubbleChatImage.defaultProps = {};
BubbleChatImage.propTypes = {};
export default BubbleChatImage;
