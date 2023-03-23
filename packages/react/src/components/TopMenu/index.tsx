import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { Item } from './Item';
import { SubMenu } from './SubMenu';
import TopMenuContext from './Context';

const propTypes = {
  /**
   * Set current menu item
   * @controllable onSelect
   * */
  current: PropTypes.string,
  /** Callback fired when the menu item is clicked. */
  onSelect: PropTypes.func,
};

interface TopMenuProps extends PrefixProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Set current menu item
   * @controllable onSelect
   * */
  current: string;
  /** Callback fired when the menu item is clicked.  */
  onSelect: (path: string) => void;
}
interface TopMenuRefForwardingComponent<TInitial extends React.ElementType, P = unknown>
  extends RefForwardingComponent<TInitial, P> {
  Item?: typeof Item;
  SubMenu?: typeof SubMenu;
}

export const TopMenu: TopMenuRefForwardingComponent<'div', TopMenuProps> = React.forwardRef<any, TopMenuProps>(
  ({ className, children, current, onSelect, ...props }, ref) => {
    const modifiedChildren = React.Children.map(children, (child: any, index) => {
      if (!child) {
        return null;
      }
      const path = child.props.eventKey || index;
      return React.cloneElement(child, {
        level: 1,
        index,
        path: path.toString(),
      });
    });
    return (
      <TopMenuContext.Provider
        value={{
          current,
          onSelect,
        }}
      >
        <div className={classNames('TopMenu', 'u-backgroundWhite', className && className)}>
          <div
            ref={ref}
            {...props}
            className={classNames('TopMenu-list')}
          >
            {modifiedChildren}
          </div>
        </div>
      </TopMenuContext.Provider>
    );
  }
);

TopMenu.Item = Item;
TopMenu.SubMenu = SubMenu;
TopMenu.defaultProps = {};
TopMenu.displayName = 'TopMenu';
TopMenu.propTypes = propTypes;
