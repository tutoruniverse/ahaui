import React from 'react';
import classNames from 'classnames';
import Plugins from 'utils/Plugins';
import { PluginType } from 'constants/common';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

export enum AvatarSizeEnum {
  extraSmall = 'extraSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
  extraLargePlus = 'extraLargePlus',
  huge = 'huge',
}

export type AvatarSize = EnumToUnion<AvatarSizeEnum>;

export interface AvatarProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /** The Avatar visual name, should be provide via an AssetPlugin with prefix "avatar" */
  name?: string;
  /** Avatar size variants */
  size?: AvatarSize;
  /** Providing a `src` will render an `<img>` element */
  src?: string;
  /** Providing a `text` will render an `<div>` element */
  text?: string;
  /** Providing a alt if `src` exits  */
  alt?: string;
  /** Set the width of the avatar */
  width?: number;
  /** Set the height of the avatar */
  height?: number;
}

export const Avatar: AhaRefForwardingComponent<React.ElementType, AvatarProps> = React.forwardRef(
  (
    {
      className,
      size = AvatarSizeEnum.medium,
      name,
      src,
      alt = 'Avatar',
      height,
      width,
      text,
      as,
      ...props
    }: AvatarProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    const getSrcOri = (src?: string, name?: string) => {
      if (!src && name) {
        return Plugins.getPlugins(PluginType.ASSET)
          .traverseCall<string>('getAsset', 'avatar', name)
          .find(asset => !!asset);
      }
      return src;
    };

    const srcOri = getSrcOri(src, name);

    const mergeProps = {
      ref,
      style: { ...props.style, width, height },
      ...props,
    };

    return (
      <Component
        {...mergeProps}
        ref={ref}
        className={classNames(
          'Avatar u-positionRelative u-block u-paddingNone u-overflowHidden',
          size && `Avatar--${size}`,
          text && 'u-roundedCircle',
          className && className,
        )}
      >
        {srcOri && (
        <img src={srcOri} alt={alt} className="u-maxWidthFull u-roundedCircle u-positionAbsolute u-borderNone u-positionFull u-widthFull u-heightFull" data-testid="avatar-img" />
        )}
        {!srcOri && text && (
        <div className="u-lineHeightReset u-positionAbsolute u-positionCenter" data-testid="avatar-text">{text}</div>
        )}
      </Component>
    );
  });

const AvatarWithDisplayName = Object.assign(Avatar, {
  displayName: 'Avatar',
});

export default AvatarWithDisplayName;
