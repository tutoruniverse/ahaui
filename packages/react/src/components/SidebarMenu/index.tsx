import React, { useMemo } from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import { AhaRefForwardingComponent } from 'types/common';
import Item, { SidebarMenuItemProps } from './Item';
import SubMenu, { SidebarMenuSubMenuProps } from './SubMenu';
import { SidebarContext, SidebarMenuSizeEnum, SidebarMenuSizeType } from './Context';

export interface SidebarMenuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Set's the size of all SidebarMenu.Item & SidebarMenu.SubMenu
   * */
  size?: SidebarMenuSizeType,
  /** Set current menu item*/
  current: string,
  /** Callback fired when the menu item is clicked. */
  onSelect: React.Dispatch<React.SetStateAction<string>> | ((path: string) => void),
  /**
   * Enable collapsing its sub menus when an menu item is selected
   * @default false
   * */
  autoCollapse?: boolean,
}

const SidebarMenu: AhaRefForwardingComponent<React.ElementType, SidebarMenuProps> = React.forwardRef(
  (
    {
      className,
      children,
      current,
      onSelect,
      size = SidebarMenuSizeEnum.medium,
      autoCollapse = false,
      ...props
    }: SidebarMenuProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const modifiedChildren = React.Children.map(children, (child, index) => {
      if (!child) {
        return null;
      }

      if (!React.isValidElement(child)) {
        return child;
      }

      const path = child.props.eventKey || index;
      return React.cloneElement(
        child as React.ReactElement, ({
          level: 1,
          path: path.toString(),
          autoCollapse,
        }),
      );
    });

    const contextValue = useMemo(() => ({
      current,
      onSelect,
      size,
    }), [current, onSelect, size]);

    return (
      <SidebarContext.Provider
        value={contextValue}
      >
        <div
          className={classNames(
            'SidebarMenu',
            'u-backgroundWhite u-paddingVerticalExtraSmall',
            className && className,
          )}
          data-testid="sidebar-menu"
        >
          <div
            ref={ref}
            {...props}
            className={classNames(
              'SidebarMenu-list',
            )}
            data-testid="sidebar-menu-list"
          >
            {modifiedChildren}
          </div>
        </div>
      </SidebarContext.Provider>
    );
  });

const Divider = createBlock('SidebarMenu-divider u-borderTop u-marginVerticalExtraSmall');
const Header = createBlock('SidebarMenu-header u-textLight u-text200 u-fontMedium u-paddingHorizontalSmall u-marginVerticalTiny md:u-marginVerticalExtraSmall lg:u-marginVerticalSmall');

const SidebarMenuCompound = Object.assign(SidebarMenu, {
  Item,
  SubMenu,
  Divider,
  Header,
  displayName: 'SidebarMenu',
});

export default SidebarMenuCompound;
export type { SidebarMenuItemProps, SidebarMenuSubMenuProps };
