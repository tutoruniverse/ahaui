import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import SafeAnchor from 'components/SafeAnchor';

const propTypes = {
  /**
   * `href` attribute for the inner `a` element
   * @default #
   */
  href: PropTypes.string,
  /**
   * Non-render the SafeAnchor
   */
  noHref: PropTypes.bool,
  /**
   * `title` attribute for the inner `a` element
   */
  title: PropTypes.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: PropTypes.string,
};
const defaultProps = {};

interface ItemProps extends PrefixProps, React.HTMLAttributes<HTMLDivElement> {
  /**
   * `href` attribute for the inner `a` element
   * @default #
   */
  href: string;
  /**
   * Non-render the SafeAnchor
   */
  noHref: boolean;
  /**
   * `title` attribute for the inner `a` element
   */
  title: string;
  /**
   * `target` attribute for the inner `a` element
   */
  target: string;
  position: string;
  schema: boolean;
  isLast: boolean;
}

export const Item: RefForwardingComponent<'span', ItemProps> = React.forwardRef<any, ItemProps>(
  ({ className, children, noHref, position, schema, isLast, ...props }, ref) => {
    const Component = isLast || noHref ? 'span' : SafeAnchor;
    return (
      <li
        ref={ref}
        className={classNames('Breadcrumb-item', 'u-inlineBlock', className && className)}
      >
        {schema ? (
          <React.Fragment>
            <SafeAnchor
              {...props}
              className={classNames(!isLast && 'u-textGray', !isLast && !noHref && 'hover:u-textLink')}
              itemProp="item"
            >
              <span itemProp="name">{children}</span>
            </SafeAnchor>
            <meta
              itemProp="position"
              content={position}
            />
          </React.Fragment>
        ) : (
          <Component
            {...props}
            className={classNames(!isLast && 'u-textGray', !isLast && !noHref && 'hover:u-textLink')}
          >
            {children}
          </Component>
        )}
      </li>
    );
  }
);

Item.displayName = 'BreadcrumbItem';
Item.defaultProps = defaultProps;
Item.propTypes = propTypes;
