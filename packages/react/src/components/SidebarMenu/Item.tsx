import React from 'react';
import classNames from 'classnames';
import SafeAnchor from 'components/SafeAnchor';
import Badge from 'components/Badge';
import Icon, { type IconName } from 'components/Icon';
import { AhaRefForwardingComponent } from 'types/common';
import { type SidebarMenuSizeType, useSidebarContext } from './Context';

export interface SidebarMenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** A key that associates the SidebarMenu with it's controlling SidebarMenu.Item.*/
  eventKey?: string,
  /**
   * Manually set the visual state of the SidebarMenu.Item to disabled
   * @default false
   * */
  disabled?: boolean,
  /** The icon to display. The name can get from Component Icon, do not support when is children of SidebarMenu.SubMenu */
  icon?: IconName,
  isSubItem?: boolean,
  level?: number,
  path?: string,
  /** The badge to display. The structure can get from Component Badge  */
  badge?: string | (() => React.ReactElement),
  /** Override size from context */
  size?: SidebarMenuSizeType,
  /** If this value is true, child's path is not nested in parent's path **/
  separated?: boolean,
  /** The function that collapses its parent's sub-menu. It would be run whenever this item is selected by the user.*/
  onCloseSubMenu?: () => void,
  autoCollapse?: boolean,
}

const Item: AhaRefForwardingComponent<React.ElementType, SidebarMenuItemProps> = React.forwardRef(
  (
    {
      className,
      disabled,
      eventKey,
      children,
      badge,
      icon,
      isSubItem,
      level,
      path = '',
      size,
      onCloseSubMenu,
      autoCollapse,
      ...props
    }: SidebarMenuItemProps,
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) => {
    let active;

    const sideBarContextValue = useSidebarContext();

    if (path === sideBarContextValue.current) {
      active = true;
    }

    const Component = active || disabled ? 'span' : SafeAnchor;

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      sideBarContextValue.onSelect(path);
      onCloseSubMenu?.();
    };
    const sizeMenu = size || sideBarContextValue.size;
    return (
      <div
        onClick={disabled ? undefined : onClick}
        className={classNames(
          className && className,
          'SidebarMenu-item u-flex u-paddingHorizontalExtraSmall u-positionRelative',
          active && 'is-active u-backgroundLightest',
          disabled ? 'is-disabled u-cursorNotAllow u-pointerEventsNone' : 'hover:u-backgroundLightest',
          icon && 'u-alignItemsTop',
          isSubItem && 'u-paddingLeftLarge',
          sizeMenu === 'medium' && 'u-paddingVerticalSmall',
        )}
        style={{
          paddingLeft: (level && level > 2) ? level * 16 : undefined,
        }}
      >
        {active && (
        <div
          className={classNames(
            'SidebarMenu-itemAfter u-widthTiny u-zIndexPositive',
            'u-positionAbsolute u-positionLeft u-positionTop u-backgroundPrimary u-heightFull',
          )}
          data-testid="sidebarMenu-itemAfter"
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
          data-testid="icon"
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
          <span className="u-marginLeftExtraSmall" data-testid="badge">
            {typeof (badge) === 'function'
              ? badge()
              : <Badge variant={disabled ? 'default' : 'positive'}>{badge}</Badge>}
          </span>
          )}
        </Component>
        {!isSubItem && (
        <div className="u-positionAbsolute u-borderBottom u-borderLightest u-positionRight u-positionBottom u-positionLeft u-marginHorizontalSmall" />
        )}
      </div>
    );
  });

const ItemCompound = Object.assign(Item, {
  displayName: 'SidebarMenuItem',
});
export default ItemCompound;
