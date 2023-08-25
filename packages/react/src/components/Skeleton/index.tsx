import React from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

export enum SkeletonVariantEnum {
  text = 'text',
  circle = 'circle',
}
type VariantForSkeleton = EnumToUnion<SkeletonVariantEnum>;

export interface SkeletonProps extends AsProp, React.HTMLAttributes<HTMLElement> {
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

const variantClass = {
  [SkeletonVariantEnum.text]: '',
  [SkeletonVariantEnum.circle]: 'u-roundedCircle',
};

export const Skeleton: AhaRefForwardingComponent<React.ElementType, SkeletonProps> = React.forwardRef(
  (
    {
      variant = SkeletonVariantEnum.text,
      width,
      height = 16,
      duration = 2000,
      as,
      ...props
    }: SkeletonProps,
    ref: React.ForwardedRef<HTMLDivElement>,
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

const SkeletonWithDisplayName = Object.assign(Skeleton, {
  displayName: 'Skeleton',
});

export default SkeletonWithDisplayName;
