import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Item from './Item';
import SubMenu from './SubMenu';
import TopMenuContext from './Context';

const propTypes = {
  /**
   * Set current menu item
   * @controllable onSelect
   * */
  current: PropTypes.string,
  /** Callback fired when the menu item is clicked. */
  onSelect: PropTypes.func,
  /** 
   * Enable collapsing its sub menus when an menu item is selected
   * @default false
   *  */
  autoCollapse: PropTypes.bool
};

const TopMenu = React.forwardRef(({ className, children, current, onSelect, autoCollapse, ...props }, ref) => {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    const path = child.props.eventKey || index;
    return React.cloneElement(
      child, ({
        level: 1,
        index,
        path: path.toString(),
        autoCollapse,
      })
    );
  });
  return (
    <TopMenuContext.Provider
      value={{
        current,
        onSelect,
      }}
    >
      <div
        className={classNames(
          'TopMenu',
          'u-backgroundWhite',
          className && className
        )}
      >
        <div
          ref={ref}
          {...props}
          className={classNames(
            'TopMenu-list'
          )}
        >
          {modifiedChildren}
        </div>
      </div>
    </TopMenuContext.Provider>
  );
});

TopMenu.Item = Item;
TopMenu.SubMenu = SubMenu;
TopMenu.defaultProps = {};
TopMenu.displayName = 'TopMenu';
TopMenu.propTypes = propTypes;
export default TopMenu;
