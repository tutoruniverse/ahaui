import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { SafeAnchor } from 'components/SafeAnchor';

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

interface ItemProps extends PrefixProps, React.HTMLAttributes<HTMLAnchorElement> {
  /**
   * Non-render the SafeAnchor
   */
  noHref: boolean;
  target: string;
  position: string;
  schema: boolean;
  isLast: boolean;
}

export const Item: RefForwardingComponent<'span', ItemProps> = React.forwardRef(
  ({ className, children, noHref, position, schema, isLast, ...props }: ItemProps, ref) => {
    const Component = isLast || noHref ? 'span' : SafeAnchor;
    return (
      <li className={classNames('Breadcrumb-item', 'u-inlineBlock', className && className)}>
        {schema ? (
          <React.Fragment>
            <SafeAnchor
              className={classNames(!isLast && 'u-textGray', !isLast && !noHref && 'hover:u-textLink')}
              itemProp="item"
              ref={ref}
              {...props}
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
            className={classNames(!isLast && 'u-textGray', !isLast && !noHref && 'hover:u-textLink')}
            ref={ref}
            {...props}
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
