import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createBlock from 'utils/createBlock';
import Item from './Item';
import SubMenu from './SubMenu';
import SidebarContext from './Context';

const propTypes = {
  /**
   * Set's the size of all SidebarMenu.Item & SidebarMenu.SubMenu
   * */
  size: PropTypes.oneOf([
    'small',
    'medium',
  ]),
  /** Set current menu item*/
  current: PropTypes.string,
  /** Callback fired when the menu item is clicked. */
  onSelect: PropTypes.func,
};

const defaultProps = {
  size: 'medium',
};
const SidebarMenu = React.forwardRef(({ className, children, current, onSelect, size, ...props }, ref) => {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    const path = child.props.eventKey || index;
    return React.cloneElement(
      child, ({
        level: 1,
        path: path.toString(),
      })
    );
  });
  return (
    <SidebarContext.Provider
      value={{
        current,
        onSelect,
        size,
      }}
    >
      <div
        className={classNames(
          'SidebarMenu',
          'u-backgroundWhite u-paddingVerticalExtraSmall',
          className && className
        )}
      >
        <div
          ref={ref}
          {...props}
          className={classNames(
            'SidebarMenu-list'
          )}
        >
          {modifiedChildren}
        </div>
      </div>
    </SidebarContext.Provider>
  );
});

const Divider = createBlock('SidebarMenu-divider u-borderTop u-marginVerticalExtraSmall');
const Header = createBlock('SidebarMenu-header u-textLight u-text200 u-fontMedium u-paddingHorizontalSmall u-marginVerticalTiny md:u-marginVerticalExtraSmall lg:u-marginVerticalSmall');

SidebarMenu.Item = Item;
SidebarMenu.SubMenu = SubMenu;
SidebarMenu.Divider = Divider;
SidebarMenu.Header = Header;
SidebarMenu.defaultProps = defaultProps;
SidebarMenu.displayName = 'SidebarMenu';
SidebarMenu.propTypes = propTypes;
export default SidebarMenu;
