import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Badge from 'components/Badge';
import Icon from 'components/Icon';
import SidebarContext from './Context';

const propTypes = {
  /** A key that associates the SidebarMenu with it's controlling SidebarMenu.SubMenu.*/
  eventKey: PropTypes.string,
  /** Title */
  title: PropTypes.string,
  /**
   * Manually set the visual state of the SidebarMenu.SubMenu to disabled
   * @default false
   * */
  disabled: PropTypes.bool,
  /** The icon to display. The name can get from Component Icon */
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
  /** Highlight the submenu if current path matches one of the items inside this list **/
  hightLightWhitelist: PropTypes.array,
  /** 
   * Enable collapsing the sub-menu when its item is selected
   * @default false
   * */
  autoCollapse: PropTypes.bool,
};
const defaultProps = {
};

const SubMenu = React.forwardRef(({ level, eventKey, className, isSubItem, title, disabled, children, badge, icon, path, size, hightLightWhitelist, autoCollapse, ...props }, ref) => {
  let active;
  const sideBarContextValue = useContext(SidebarContext);

  if (sideBarContextValue.current !== '' && sideBarContextValue.current.startsWith(path)) {
    active = true;
  }

  if (hightLightWhitelist?.includes(sideBarContextValue.current)) {
    active = true;
  }

  const [open, setOpen] = useState(active);

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen(!open);
  };

  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }

    const childPath = child.props.eventKey || index.toString();

    let modifiedChildPath = '';

    if (child.props.separated) {
      modifiedChildPath = childPath.toString();
    } else if (childPath.startsWith('#')){
      modifiedChildPath = `${path}${childPath.toString()}`
    } else {
      modifiedChildPath = `${path}.${childPath.toString()}`
    }


    return React.cloneElement(
      child, ({
        isSubItem: true,
        level: level + 1,
        path: modifiedChildPath,
        onCloseSubMenu: autoCollapse && (() => setOpen(false)),
      })
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
      <div className={classNames(
        'SidebarMenu-itemAfter u-widthTiny u-zIndexPositive',
        'u-positionAbsolute u-positionLeft u-positionTop u-backgroundPrimaryLight u-heightFull',
      )}
      />
      )}
      <div
        onClick={disabled ? null : onClick}
        className={classNames(
          'u-flex u-paddingHorizontalExtraSmall u-positionRelative',
          disabled ? 'is-disabled u-cursorNotAllow' : 'hover:u-backgroundLightest',
          icon && 'u-alignItemsTop',
          (isSubItem && level <= 2) && 'u-paddingLeftLarge',
          sizeMenu === 'medium' && 'u-paddingVerticalSmall',
          sizeMenu === 'small' && 'u-paddingVerticalExtraSmall',
        )}
        style={{
          paddingLeft: level >= 3 && level * 16,
        }}
      >
        {icon && (
          <Icon
            name={icon}
            style={{
              marginTop: sizeMenu === 'small' ? '2px' : undefined,
            }}
            className={classNames(
              'u-flexShrink0',
              disabled ? 'u-textLight': 'u-textDark',
            )}
            size={sizeMenu === 'medium' ? 'small' : 'extraSmall'}
          />
        )}
        <span
          className={classNames(
            'u-flex u-flexGrow1 u-paddingHorizontalExtraSmall hover:u-textDecorationNone',
          )}
        >

          <div className={classNames(
            'u-flexGrow1 u-textWordWrap',
            sizeMenu === 'small' && 'u-text200',
            disabled ? 'u-textLight': 'u-textDark',
            (open || active) && 'u-fontMedium',
          )}
          >
            {title}
          </div>
          {badge && (
            <span className="u-marginLeftExtraSmall">
              {typeof (badge) === 'function'
                ? badge()
                : <Badge variant={disabled ? 'default' : 'positive'}>{badge}</Badge>
              }
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

SubMenu.defaultProps = defaultProps;
SubMenu.displayName = 'SidebarMenuSubMenu';
SubMenu.propTypes = propTypes;
export default SubMenu;
