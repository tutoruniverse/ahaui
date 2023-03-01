import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Item from './Item';

const propTypes = {
  /** Enable Structured Data `https://schema.org/BreadcrumbList` */
  schema: PropTypes.bool,
};
const defaultProps = {
  schema: false,
};

const Breadcrumb = React.forwardRef(({ className, schema, children, ...props }, ref) => {
  let schemasList;
  let schemasItem;
  if (schema) {
    schemasList = {
      itemScope: true,
      itemType: 'http://schema.org/BreadcrumbList',
    };
    schemasItem = {
      itemScope: true,
      itemProp: 'itemListElement',
      itemType: 'http://schema.org/ListItem',
    };
  }
  const numChildren = React.Children.count(children);
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    return React.cloneElement(
      child, ({
        ...schemasItem,
        schema,
        isLast: index === numChildren - 1,
        position: index + 1,
      }),
    );
  });
  return (
    <ul
      ref={ref}
      {...props}
      {...schemasList}
      className={classNames(
        'Breadcrumb',
        'u-marginNone u-paddingNone u-text200',
      )}
    >
      {modifiedChildren}
    </ul>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.defaultProps = defaultProps;
Breadcrumb.propTypes = propTypes;
Breadcrumb.Item = Item;
export default Breadcrumb;
