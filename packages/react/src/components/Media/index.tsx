import React from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

export enum AspectRatioEnum {
  square = 'square',
  classic = 'classic',
  wide = 'wide',
  cinema = 'cinema',
}

type AspectRatio = EnumToUnion<AspectRatioEnum>;

export interface MediaProps extends AsProp, React.EmbedHTMLAttributes<HTMLEmbedElement> {
  /** Set the aspect ration of the embed
    * @default "wide"
  */
  aspectRatio?: AspectRatio,
  width?: number,
  height?: number
  src? :string
}

export const aspectRatios = {
  [AspectRatioEnum.square]: 'Media--1by1',
  [AspectRatioEnum.classic]: 'Media--4by3',
  [AspectRatioEnum.wide]: 'Media--16by9',
  [AspectRatioEnum.cinema]: 'Media--21by9',
};

export const Media: AhaRefForwardingComponent<React.ElementType, MediaProps> = React.forwardRef(
  (
    { className,
      aspectRatio = AspectRatioEnum.wide,
      width,
      height,
      style,
      as,
      ...props
    } : MediaProps,
    ref: React.ForwardedRef<HTMLEmbedElement>,
  ) => {
    const Component = as || 'embed';
    const mergeStyle = {
      ...(style || {}),
      width,
      height,
    };
    return (
      <div
        className={classNames(
          'Media',
          'u-positionRelative u-block u-paddingNone u-overflowHidden',
          aspectRatio && aspectRatios[aspectRatio],
          className && className,
        )}
        style={mergeStyle}
        data-testid="media-wrapper"
      >
        <Component
          {...props}
          ref={ref}
          className="Media-item"
        />
      </div>
    );
  });

const MediaWithDisplayName = Object.assign(Media, {
  displayName: 'Media',
});

export default MediaWithDisplayName;
