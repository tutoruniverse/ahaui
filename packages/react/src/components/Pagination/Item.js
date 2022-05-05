import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from 'components/Button';
import Icon from 'components/Icon';
import SafeAnchor from 'components/SafeAnchor';

const propTypes = {
  /** Styles PageItem as active, and renders a `<span>` instead of an `<a>`. */
  active: PropTypes.bool,
  /** Disables the PageItem */
  disabled: PropTypes.bool,
};

const defaultProps = {
  active: false,
  disabled: false,
};

export const PageItem = React.forwardRef(({ className, active, safeItem, disabled, children, displayName, ...props }, ref) => {
  let variant = active ? 'primary' : 'secondary';
  if (safeItem) {
    variant = 'default';
  }
  const Component = active || disabled || safeItem ? 'span' : SafeAnchor;
  return (
    <li
      className={classNames(
        'Pagination-item',
        active && 'is-active',
        'u-inlineBlock u-marginHorizontalTiny u-marginBottomExtraSmall',
        className && className
      )}
    >
      <Component ref={ref} {...props} className="u-block hover:u-textDecorationNone">
        <Button
          as="div"
          className="u-fontMedium"
          disabled={disabled}
          variant={variant}
          onlyIcon={safeItem || displayName}
        >
          {children}
        </Button>
      </Component>
    </li>
  );
});

PageItem.displayName = 'PaginationItem';
PageItem.propTypes = propTypes;
PageItem.defaultProps = defaultProps;

function createButton(name, defaultValue, safeItem, className) {
  return class extends React.Component {
    static displayName = name;

    render() {
      const { children, ...props } = this.props;
      delete props.active;
      return (
        <PageItem {...props} safeItem={safeItem} displayName className={className}>
          {children || defaultValue}
        </PageItem>
      );
    }
  };
}
export const Prev = createButton('Prev', <Button.Icon><Icon className="u-textLight" name="arrowBack" size="extraSmall" /></Button.Icon>, false, 'Pagination-prev');
export const Ellipsis = createButton('Ellipsis', <Button.Icon><Icon name="more" className="u-textLight" size="extraSmall" /></Button.Icon>, true);
export const Next = createButton('Next', <Button.Icon><Icon name="arrowForward" className="u-textLight" size="extraSmall" /></Button.Icon>, false, 'Pagination-next');
