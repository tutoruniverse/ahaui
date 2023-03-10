import React from 'react';
import classNames from 'classnames';
import { PolymorphicRef, PolymorphicComponentPropsWithRef, EnumToUnion } from 'types/common';

export enum AspectRatioEnum {
  square = 'square',
  classic = 'classic',
  wide = 'wide',
  cinema = 'cinema',
}

type AspectRatio = EnumToUnion<AspectRatioEnum>;

type MediaProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
T,
{
   /** Set the aspect ration of the embed */
   aspectRatio?: AspectRatio,
   width?: number,
   height?: number
}
>;

type MediaComponent = <T extends React.ElementType = 'div'>(props: MediaProps<T>) => React.ReactElement | null;

export const aspectRatios = {
  [AspectRatioEnum.square]: 'Media--1by1',
  [AspectRatioEnum.classic]: 'Media--4by3',
  [AspectRatioEnum.wide]: 'Media--16by9',
  [AspectRatioEnum.cinema]: 'Media--21by9',
};

const Media : MediaComponent = React.forwardRef(
  <T extends React.ElementType>(
    { className,
      aspectRatio = 'wide',
      width,
      height,
      style,
      as,
      ...props } : MediaProps<T>,
    ref: PolymorphicRef<T>) => {
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

export default Media;
