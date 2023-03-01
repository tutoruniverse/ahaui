import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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
const defaultProps = {

};

const Item = React.forwardRef(({ className, children, noHref, position, schema, isLast, ...props }, ref) => {
  const Component = isLast || noHref ? 'span' : SafeAnchor;
  return (
    <li
      ref={ref}
      className={classNames(
        'Breadcrumb-item',
        'u-inlineBlock'
      )}
    >
      {schema ? (
        <React.Fragment>
          <SafeAnchor
            {...props}
            className={classNames(
              !isLast && 'u-textGray',
              (!isLast && !noHref) && 'hover:u-textLink'
            )}
            itemProp="item"
          >
            <span itemProp="name">{children}</span>
          </SafeAnchor>
          <meta itemProp="position" content={position} />
        </React.Fragment>
      ) : (
        <Component
          {...props}
          className={classNames(
            !isLast && 'u-textGray',
            (!isLast && !noHref) && 'hover:u-textLink'
          )}
        >
          {children}
        </Component>
      )}
    </li>
  );
});

Item.displayName = 'BreadcrumbItem';
Item.defaultProps = defaultProps;
Item.propTypes = propTypes;
export default Item;
