import React from 'react';
import classNames from 'classnames';
import { EnumToUnion, PolymorphicComponentPropsWithRef, PolymorphicRef } from 'types/common';

export enum VariantEnum {
  text = 'text',
  circle = 'circle',
}
type VariantForSkeleton = EnumToUnion<VariantEnum>;

interface SkeletonBaseProps {
  /**
   * The Skeleton visual variant
   * @default 'text'
   */
  variant?: VariantForSkeleton,
  /** Set the width of the skeleton */
  width?: number | string,
  /**
   * Set the height of the skeleton
   * @default 16
   */
  height?: number | string,
  /**
   * Set the duration of the animation skeleton
   * @default 2000
   */
  duration?: number,
}

type SkeletonProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<T, SkeletonBaseProps>;
type SkeletonComponent = <T extends React.ElementType = 'div'>(props: SkeletonProps<T>) => React.ReactElement | null;

const variantClass = {
  [VariantEnum.text]: '',
  [VariantEnum.circle]: 'u-roundedCircle',
};

const Skeleton: SkeletonComponent = React.forwardRef(<T extends React.ElementType>(
  {
    variant = VariantEnum.text,
    width,
    height = 16,
    duration = 2000,
    as,
    ...props
  }: SkeletonProps<T>,
  ref: PolymorphicRef<T>,
) => {
  const heightStyle = {
    width: width && width,
    height: height && height,
    animationDuration: `${duration}ms`,
  };
  const mergeProps = {
    ref,
    style: { ...props.style, ...heightStyle },
    ...props,
  };

  const Component = as || 'div';
  return (
    <Component
      {...mergeProps}
      className={classNames(
        'Skeleton',
        variant && variantClass[variant],
        'u-flex u-positionRelative u-pointerEventsNone u-shadowNone u-backgroundLighter u-overflowHidden',
      )}
    />
  );
});

export default Skeleton;
