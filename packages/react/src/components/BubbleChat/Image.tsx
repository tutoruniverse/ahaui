import React, { useContext } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

type BubbleChatImageType = React.ImgHTMLAttributes<HTMLImageElement>;

export const BubbleChatImage: AhaRefForwardingComponent<'div', BubbleChatImageType> = React.forwardRef(
  (
    {
      className,
      src,
      ...props
    }: BubbleChatImageType,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const bubbleChatContext = useContext(Context);
    return (
      <div
        ref={ref}
        className={classNames(
          'BubbleChat-image',
          'u-lineHeightNone',
          (bubbleChatContext && bubbleChatContext.type === 'inbound') && 'u-textRight',
          className && className,
        )}
      >
        <img {...props} src={src} className="u-roundedMedium u-border u-maxWidthFull" alt="" />
      </div>
    );
  });

const BubbleChatImageWithDisplayName = Object.assign(BubbleChatImage, {
  displayName: 'BubbleChatImage',
});

export default BubbleChatImageWithDisplayName;
