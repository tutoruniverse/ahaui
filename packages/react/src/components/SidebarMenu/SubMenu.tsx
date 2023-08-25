import React, { useState } from 'react';
import classNames from 'classnames';
import Badge from 'components/Badge';
import Icon, { type IconName } from 'components/Icon';
import { AhaRefForwardingComponent } from 'types/common';
import { type SidebarMenuSizeType, useSidebarContext } from './Context';

export interface SidebarMenuSubMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** A key that associates the SidebarMenu with it's controlling SidebarMenu.SubMenu.*/
  eventKey?: string,
  /** Title */
  title?: string,
  level?: number,
  /**
   * Manually set the visual state of the SidebarMenu.SubMenu to disabled
   * @default false
   * */
  disabled?: boolean,
  /** The icon to display. The name can get from Component Icon */
  icon?: IconName,
  path?: string,
  isSubItem?: boolean,
  /** The badge to display. The structure can get from Component Badge  */
  badge?: string | (() => React.ReactElement),
  /** Override size from context */
  size?: SidebarMenuSizeType,
  /** Highlight the submenu if current path matches one of the items inside this list **/
  hightLightWhitelist?: string[],
  /**
   * Enable collapsing the sub-menu when its item is selected
   * @default false
   * */
  autoCollapse?: boolean,
}

const SubMenu: AhaRefForwardingComponent<React.ElementType, SidebarMenuSubMenuProps> = React.forwardRef(
  (
    {
      level = 1,
      eventKey,
      className,
      isSubItem,
      title,
      disabled = false,
      children,
      badge,
      icon,
      path = '',
      size,
      hightLightWhitelist,
      autoCollapse = false,
      ...props
    }: SidebarMenuSubMenuProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    let active;
    const sideBarContextValue = useSidebarContext();

    if (sideBarContextValue.current !== '' && sideBarContextValue.current.startsWith(path)) {
      active = true;
    }

    if (hightLightWhitelist?.includes(sideBarContextValue.current)) {
      active = true;
    }

    const [open, setOpen] = useState(active);

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      e.preventDefault();
      setOpen(!open);
    };

    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (!child) {
        return null;
      }

      if (!React.isValidElement(child)) {
        return child;
      }

      const childPath = child.props.eventKey || index.toString();
      let modifiedChildPath = '';

      if (child.props.separated) {
        modifiedChildPath = childPath.toString();
      } else if (childPath.startsWith('#')) {
        modifiedChildPath = `${path}${childPath.toString()}`;
      } else {
        modifiedChildPath = `${path}.${childPath.toString()}`;
      }

      return React.cloneElement(
        child as React.ReactElement, ({
          isSubItem: true,
          level: level + 1,
          path: modifiedChildPath,
          onCloseSubMenu: autoCollapse ? (() => setOpen(false)) : undefined,
          separated: undefined,
        }),
      );
    });

    const sizeMenu = size || sideBarContextValue.size;
    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          'SidebarMenu-subMenu u-positionRelative',
          className && className,
          (open || active) && 'is-showing',
          disabled ? 'u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
        )}
      >
        {((open || active) && !isSubItem) && (
        <div
          className={classNames(
            'SidebarMenu-itemAfter u-widthTiny u-zIndexPositive',
            'u-positionAbsolute u-positionLeft u-positionTop u-backgroundPrimaryLight u-heightFull',
          )}
          data-testid="sidebarMenu-itemAfter"
        />
        )}
        <div
          onClick={disabled ? undefined : onClick}
          className={classNames(
            'u-flex u-paddingHorizontalExtraSmall u-positionRelative',
            disabled ? 'is-disabled u-cursorNotAllow' : 'hover:u-backgroundLightest',
            icon && 'u-alignItemsTop',
            (isSubItem && level <= 2) && 'u-paddingLeftLarge',
            sizeMenu === 'medium' && 'u-paddingVerticalSmall',
            sizeMenu === 'small' && 'u-paddingVerticalExtraSmall',
          )}
          style={{
            paddingLeft: level >= 3 ? level * 16 : undefined,
          }}
          data-testid="wrapper"
        >
          {icon && (
          <Icon
            name={icon}
            style={{
              marginTop: sizeMenu === 'small' ? '2px' : undefined,
            }}
            className={classNames(
              'u-flexShrink0',
              ((open || active) && !disabled) && 'u-textDark',
              disabled && 'u-textLight',
            )}
            size={sizeMenu === 'medium' ? 'small' : 'extraSmall'}
            data-testid="icon"
          />
          )}
          <span
            className={classNames(
              'u-flex u-flexGrow1 u-paddingHorizontalExtraSmall hover:u-textDecorationNone',
            )}
          >

            <div
              className={classNames(
                'u-flexGrow1 u-textWordWrap',
                sizeMenu === 'small' && 'u-text200',
                (open || active) ? 'u-textDark u-fontMedium' : 'u-textDark',
              )}
              data-testid="title"
            >
              {title}
            </div>
            {badge && (
            <span className="u-marginLeftExtraSmall" data-testid="badge">
              {typeof (badge) === 'function'
                ? badge()
                : <Badge variant={disabled ? 'default' : 'positive'}>{badge}</Badge>}
            </span>
            )}
            <div className="u-marginLeftExtraSmall">
              <Icon
                name={open ? 'arrowDown' : 'arrowForward'}
                size="tiny"
                className={classNames(
                  'SidebarMenu-iconAppend',
                  disabled && 'u-textLight',
                )}
              />
            </div>
          </span>
          {!isSubItem && (
          <div className="u-positionAbsolute u-borderBottom u-borderLightest u-positionRight u-positionBottom u-positionLeft u-marginHorizontalSmall" />
          )}
        </div>
        {open && modifiedChildren}
      </div>

    );
  });

const SubMenuCompound = Object.assign(SubMenu, {
  displayName: 'SidebarMenuSubMenu',
});
export default SubMenuCompound;
