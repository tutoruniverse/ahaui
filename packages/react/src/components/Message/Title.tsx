import React, { useContext } from 'react';
import classNames from 'classnames';
import { messagesVariants } from 'constants/messages';
import Context from './Context';

type MessageTitleProps = React.HTMLAttributes<HTMLElement>

export const Title = React.forwardRef(
  (
    {
      className,
      children,
      ...props
    }: MessageTitleProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { variant, type } = useContext(Context);
    const variantOri = messagesVariants.find((item) => item.type === type && item.id === variant);

    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          'Message-title',
          'u-fontMedium u-marginBottomExtraSmall',
          className && className,
          variantOri?.textHeadingClassName ? variantOri.textHeadingClassName : variantOri?.textClassName,
        )}
      >
        {children}
      </div>
    );
  });

const MessageTitleWithDisplayName = Object.assign(Title, {
  displayName: 'MessageTitle',
});

export default MessageTitleWithDisplayName;
