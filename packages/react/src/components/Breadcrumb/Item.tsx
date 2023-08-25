import React from 'react';
import classNames from 'classnames';
import SafeAnchor from 'components/SafeAnchor';
import { AhaRefForwardingComponent } from 'types/common';

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLAnchorElement> {
  /**
   * `href` attribute for the inner `a` element
   * @default #
   */
  href?: string,
  /**
   * Non-render the SafeAnchor
   */
  noHref?: boolean,
  /**
   * `title` attribute for the inner `a` element
   */
  title?: string,
  /**
   * `target` attribute for the inner `a` element
   */
  target?: string,
  position?: string,
  schema?: boolean,
  isLast?: boolean,
}

const Item: AhaRefForwardingComponent<React.ElementType, BreadcrumbItemProps> = React.forwardRef(
  (
    {
      className,
      children,
      noHref,
      position,
      schema,
      isLast,
      href = '#',
      ...props
    }: BreadcrumbItemProps,
    ref: React.ForwardedRef<HTMLLIElement>,
  ) => {
    const Component = isLast || noHref ? 'span' : SafeAnchor;
    return (
      <li
        ref={ref}
        className={classNames(
          'Breadcrumb-item',
          'u-inlineBlock',
          className && className,
        )}
      >
        {schema ? (
          <>
            <SafeAnchor
              href={href}
              {...props}
              className={classNames(
                !isLast && 'u-textGray',
                (!isLast && !noHref) && 'hover:u-textLink',
              )}
              itemProp="item"
            >
              <span itemProp="name">{children}</span>
            </SafeAnchor>
            <meta itemProp="position" content={position} />
          </>
        ) : (
          <Component
            {...props}
            className={classNames(
              !isLast && 'u-textGray',
              (!isLast && !noHref) && 'hover:u-textLink',
            )}
          >
            {children}
          </Component>
        )}
      </li>
    );
  });

const BreadcrumbItemWithDisplayName = Object.assign(Item, {
  displayName: 'BreadcrumbItem',
});

export default BreadcrumbItemWithDisplayName;
