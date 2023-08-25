import React from 'react';
import classNames from 'classnames';
import { ComponentCommonSize, ComponentSize, ComponentSizeEnum } from 'types/common';
import { SizeMapping } from 'constants/common';

type LoaderSize = Extract<ComponentSize, ComponentCommonSize | 'extraSmall'>;

export interface LoaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Loader size variants
   * @default 'medium'
   * */
  size?: LoaderSize;

  /**
   * Set the duration of the animation skeleton
   * @default 2000
   * */
  duration?: number;
}

const Loader = React.forwardRef((
  {
    className,
    size = ComponentSizeEnum.medium,
    duration = 2000,
    ...props
  }: LoaderProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const styles = {
    width: SizeMapping[size],
    height: SizeMapping[size],
    animationDuration: `${duration}ms`,
  };
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'Loader',
        'u-roundedInfinity u-border u-borderTopPrimary u-inlineBlock u-spin',
        (size === 'small' || size === 'extraSmall') ? 'u-borderSmall' : 'u-borderMedium',
        className && className,
      )}
      style={styles}
    />
  );
});

const LoaderWithDisplayName = Object.assign(Loader, {
  displayName: 'Loader',
});

export default LoaderWithDisplayName;
