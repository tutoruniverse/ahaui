import React, { useMemo } from 'react';
import classNames from 'classnames';
import Context from 'components/Form/Context';
import { AhaRefForwardingComponent, AsProp, ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import { Prev, Next, Ellipsis, PageItem, PaginationItemProps } from './Item';

export interface PaginationProps extends AsProp, React.HTMLAttributes<HTMLUListElement> {
  /** PageItem size variants */
  sizeControl?: ComponentCommonSize;
}

const Pagination: AhaRefForwardingComponent<React.ElementType, PaginationProps> = React.forwardRef(
  (
    {
      className,
      sizeControl = ComponentSizeEnum.small,
      as,
      ...props
    }: PaginationProps,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => {
    const context = useMemo(() => ({ sizeControl }),
      [sizeControl]);

    const Component = as || 'ul';
    return (
      <Context.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames(
            'Pagination',
            'u-marginNone u-paddingNone',
            className && className,
          )}
        />
      </Context.Provider>
    );
  },
);

const PaginationCompound = Object.assign(Pagination, {
  Prev,
  Next,
  Ellipsis,
  Item: PageItem,
});

export default PaginationCompound;
export type { PaginationItemProps };
