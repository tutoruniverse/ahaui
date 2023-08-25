import React, { useMemo } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Item, { TopMenuItemProps } from './Item';
import SubMenu, { TopMenuSubMenuProps } from './SubMenu';
import { TopMenuContext } from './Context';

export interface TopMenuProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Set current menu item
   * @controllable onItemSelect
   * */
  current: string;
  /** Callback fired when the menu item is clicked. */
  onItemSelect: (path: string) => void;
  /**
   * Enable collapsing its sub menus when an menu item is selected
   * @default false
   *  */
  autoCollapse?: boolean;
}

const TopMenu: AhaRefForwardingComponent<React.ElementType, TopMenuProps> = React.forwardRef((
  {
    className,
    children,
    current,
    onItemSelect,
    autoCollapse,
    ...props
  }: TopMenuProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    if (typeof child === 'object' && 'props' in child) {
      const path = child.props.eventKey;
      return React.cloneElement(
        child, ({
          level: 1,
          index,
          path: path?.toString(),
          autoCollapse,
        }),
      );
    }

    return child;
  });

  const contextValue = useMemo(() => ({
    currentPath: current,
    onPathSelect: onItemSelect,
  }), [current, onItemSelect]);

  return (
    <TopMenuContext.Provider
      value={contextValue}
    >
      <div
        className={classNames(
          'TopMenu',
          'u-backgroundWhite',
          className && className,
        )}
      >
        <div
          ref={ref}
          {...props}
          className={classNames(
            'TopMenu-list',
          )}
        >
          {modifiedChildren}
        </div>
      </div>
    </TopMenuContext.Provider>
  );
});

const CompoundTopMenu = Object.assign(TopMenu, {
  Item,
  SubMenu,
  displayName: 'TopMenu',
});

export default CompoundTopMenu;
export type { TopMenuSubMenuProps, TopMenuItemProps };
