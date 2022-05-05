import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Badge from 'components/Badge';
import Dropdown from 'components/Dropdown';
import Icon from 'components/Icon';
import TopMenuContext from './Context';

const propTypes = {
  /** A key that associates the TopMenu with it's controlling TopMenu.SubMenu.*/
  eventKey: PropTypes.string,
  /** Title */
  title: PropTypes.string,
  /**
   * Manually set the visual state of the TopMenu.SubMenu to disabled
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
};
const defaultProps = {
};

const SubMenu = React.forwardRef(({ level, eventKey, className, isSubItem, title, disabled, children, badge, icon, path, index, ...props }, ref) => {
  let active;
  const context = useContext(TopMenuContext);

  if (context.current !== '' && context.current.startsWith(path)) {
    active = true;
  }
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
  };
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (!child) {
      return null;
    }
    const pathIndex = child.props.eventKey || index;
    return React.cloneElement(
      child, ({
        isSubItem: true,
        level: level + 1,
        path: `${path}.${pathIndex.toString()}`,
      })
    );
  });
  const menuProps = {
    ...props,
    show: open,
    drop: isSubItem && 'right',
  };

  return (
    <Dropdown
      ref={ref}
      {...menuProps}
      onToggle={onClick}
      className={classNames(
        'TopMenu-subMenu u-alignItemsCenter u-paddingVerticalExtraTiny',
        isSubItem ? 'u-flex' : 'u-flexInline',
        (index > 0 && !isSubItem) && 'u-marginLeftSmall lg:u-marginLeftLarge',
      )}
    >
      <Dropdown.Toggle
        className={classNames(
          'u-positionRelative u-flexInline u-paddingVerticalTiny u-alignItemsCenter',
          isSubItem ? 'hover:u-backgroundLightest u-paddingHorizontalSmall u-widthFull' : '',
          (active || open) ? 'u-textLink' : !disabled && 'u-textDark hover:u-textLink',
        )}
      >
        <span className={classNames(
          isSubItem && 'u-flex'
        )}
        >
          <span className={classNames(
            isSubItem && 'u-flexGrow1'
          )}
          >
            {title}
          </span>
          {badge && (
            <span className="u-marginLeftExtraSmall">
              {typeof (badge) === 'function'
                ? badge()
                : <Badge variant={disabled ? 'default' : 'positive'}>{badge}</Badge>
              }
            </span>
          )}
          <Icon name={isSubItem ? 'arrowForward' : 'arrowDown'} size="tiny" className="u-marginLeftExtraSmall SidebarMenu-iconAppend u-flexShrink0" style={{ marginTop: isSubItem && 6 }} />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Container className={classNames(
        'u-paddingVerticalTiny',
        isSubItem && 'u-marginLeftTiny'
      )}
      >
        {modifiedChildren}
      </Dropdown.Container>
      {(active && !isSubItem) && (
      <>
        <div className={classNames(
          'TopMenu-itemBefore u-heightExtraTiny u-zIndexPosition',
          'u-positionAbsolute u-positionLeft u-positionTop u-backgroundTransparent u-widthFull',
        )}
        />
        <div className={classNames(
          'TopMenu-itemAfter u-heightExtraTiny u-zIndexPosition',
          'u-positionAbsolute u-positionLeft u-positionBottom u-backgroundPrimary u-widthFull',
        )}
        />
      </>
      )}
    </Dropdown>
  );
});

SubMenu.defaultProps = defaultProps;
SubMenu.displayName = 'TopMenuSubMenu';
SubMenu.propTypes = propTypes;
export default SubMenu;
