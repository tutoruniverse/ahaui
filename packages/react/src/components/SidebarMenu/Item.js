import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import SafeAnchor from 'components/SafeAnchor';
import Badge from 'components/Badge';
import Icon from 'components/Icon';
import SidebarContext from './Context';

const propTypes = {
  /** A key that associates the SidebarMenu with it's controlling SidebarMenu.Item.*/
  eventKey: PropTypes.string,
  /**
   * Manually set the visual state of the SidebarMenu.Item to disabled
   * @default false
   * */
  disabled: PropTypes.bool,
  /** The icon to display. The name can get from Component Icon, do not support when is children of SidebarMenu.SubMenu */
  icon: PropTypes.string,
  /** The badge to display. The structure can get from Component Badge  */
  badge: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Override size from context */
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
};
const defaultProps = {
};

const Item = React.forwardRef(({ className, disabled, eventKey, children, badge, icon, isSubItem, level, path, size, ...props }, ref) => {
  let active;

  const sideBarContextValue = useContext(SidebarContext);

  if (path === sideBarContextValue.current) {
    active = true;
  }

  const Component = active || disabled ? 'span' : SafeAnchor;

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    sideBarContextValue.onSelect(path);
  };
  const sizeMenu = size || sideBarContextValue.size;
  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames(
        className && className,
        'SidebarMenu-item u-flex u-paddingHorizontalExtraSmall u-positionRelative  u-paddingVerticalTiny md:u-paddingVerticalExtraSmall',
        active && 'is-active  u-backgroundLightest',
        disabled ? 'is-disabled u-cursorNotAllow u-pointerEventsNone' : 'hover:u-backgroundLightest',
        icon && 'u-alignItemsTop',
        isSubItem && 'u-paddingLeftLarge',
        sizeMenu === 'medium' && 'lg:u-paddingVerticalSmall',
        sizeMenu === 'small' && 'u-text200',
      )}
      style={{
        paddingLeft: level > 2 && level * 16,
      }}
    >
      {active && (
        <div className={classNames(
          'SidebarMenu-itemAfter u-widthTiny u-zIndexPositive',
          'u-positionAbsolute u-positionLeft u-positionTop u-backgroundPrimary u-heightFull',
        )}
        />
      )}
      {icon && (
        <Icon
          name={icon}
          style={{
            marginTop: sizeMenu === 'small' ? '2px' : undefined,
          }}
          className={classNames(
            'u-flexShrink0',
            (active && !disabled) ? 'u-textPrimary' : 'u-textDark',
            disabled && 'u-textLight',
          )}
          size={sizeMenu === 'medium' ? 'small' : 'extraSmall'}
        />
      )}
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'u-flex u-flexGrow1 u-paddingHorizontalExtraSmall hover:u-textDecorationNone u-textWordWrap',
          active ? 'u-textPrimary u-fontMedium' : !disabled && 'u-textDark hover:u-textDark',
          disabled && 'u-textLight',
        )}
      >
        <div className="u-flexGrow1">
          {children}
        </div>

        {badge && (
          <span className="u-marginLeftExtraSmall">
            {typeof (badge) === 'function'
              ? badge()
              : <Badge variant={disabled ? 'default' : 'positive'}>{badge}</Badge>
            }
          </span>
        )}
      </Component>
      {!isSubItem && (
        <div className="u-positionAbsolute u-borderBottom u-borderLightest u-positionRight u-positionBottom u-positionLeft u-marginHorizontalSmall" />
      )}
    </div>
  );
});

Item.defaultProps = defaultProps;
Item.displayName = 'SidebarMenuItem';
Item.propTypes = propTypes;
export default Item;
