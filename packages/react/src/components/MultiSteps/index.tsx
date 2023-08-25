import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { type Directions, DirectionEnum, AsProp, AhaRefForwardingComponent } from 'types/common';
import Item, { MultiStepsItemProps, MultiStepsVariant, MultiStepsVariantEnum } from './Item';

export interface MultiStepsProps extends AsProp, Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
   /**
   * Defines the current active step index.
   * @controllable onChange
   * */
  current: number;
  /** Custom current label */
  currentLabel: string;
  /**
   * Callback fired when the current active step changes.
   * @controllable current
   * */
  onChange: (index: number) => void;
  /** Define direction of the MultiSteps */
  direction?: Directions;
  /**
   * The MultiSteps visual variant
   */
  variant?: MultiStepsVariant;
}

const MultiSteps: AhaRefForwardingComponent<React.ElementType, MultiStepsProps> = React.forwardRef(
  (
    { className,
      current,
      currentLabel,
      children,
      variant = MultiStepsVariantEnum.primary,
      direction = DirectionEnum.horizontal,
      onChange,
      as,
      ...props
    }: MultiStepsProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';
    const numChildren = React.Children.count(children);

    const renderChildren = (children: ReactNode) => {
      if (numChildren <= 0) {
        return null;
      }
      return React.Children.map(children, (child, index) => (
        React.cloneElement(
            child as React.DetailedReactHTMLElement<any, HTMLElement>, ({
              className: direction !== 'vertical' && `u-size${numChildren / numChildren}of${numChildren}`,
              style: direction === 'vertical' ? { height: `calc(100% * 1/${numChildren})` } : null,
              isLast: index === numChildren - 1,
              isCompleted: index < current,
              isActive: index === current,
              step: index + 1,
              onClick: () => onChange(index),
              currentLabel,
              direction,
              variant,
            }),
        )),
      );
    };

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'MultiSteps',
          'u-flex u-text200 u-fontMedium',
          direction === 'vertical' && 'u-flexColumn MultiSteps--vertical',
          className && className,
        )}
      >
        {renderChildren(children)}
      </Component>
    );
  },
);

const MultiStepsCompound = Object.assign(MultiSteps, {
  Item,
  displayName: 'MultiSteps',
});

export default MultiStepsCompound;
export type { MultiStepsItemProps };
