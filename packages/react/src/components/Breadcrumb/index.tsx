import React, { useMemo } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Item, { BreadcrumbItemProps } from './Item';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Enable Structured Data `https://schema.org/BreadcrumbList` */
  /**
   * @default false
   */
  schema?: boolean,
}

export interface SchemaList {
  itemScope: boolean,
  itemType: string
}

export interface SchemaItem extends SchemaList {
  itemProp: string
}

const Breadcrumb: AhaRefForwardingComponent<'ul', BreadcrumbProps> = React.forwardRef(
  (
    {
      className,
      schema = false,
      children,
      ...props
    }: BreadcrumbProps,
    ref: React.ForwardedRef<HTMLUListElement>,
  ) => {
    const schemaList = useMemo(() => (schema ? {
      itemScope: true,
      itemType: 'http://schema.org/BreadcrumbList',
    } : undefined), [schema]);

    const schemasItem = useMemo(() => (schema ? {
      itemScope: true,
      itemProp: 'itemListElement',
      itemType: 'http://schema.org/ListItem',
    } : undefined), [schema]);


    const numChildren = React.Children.count(children);
    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (!child) {
        return null;
      }

      if (!React.isValidElement(child)) {
        return child;
      }

      return React.cloneElement(
        child as React.ReactElement, ({
          ...schemasItem,
          schema,
          isLast: index === (numChildren - 1),
          position: index + 1,
        }),
      );
    });


    return (
      <ul
        ref={ref}
        {...props}
        {...schemaList}
        className={classNames(
          'Breadcrumb',
          'u-marginNone u-paddingNone u-text200',
          className && className,
        )}
      >
        {modifiedChildren}
      </ul>
    );
  });

const CompoundBreadcrumb = Object.assign(Breadcrumb, {
  Item,
  displayName: 'Breadcrumb',
});

export default CompoundBreadcrumb;
export type { BreadcrumbItemProps };
