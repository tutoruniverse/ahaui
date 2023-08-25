import React, { useState } from 'react';
import classNames from 'classnames';
import Badge, { BadgeVariantEnum } from 'components/Badge';
import Dropdown from 'components/Dropdown';
import Icon, { IconName, IconNameEnum } from 'components/Icon';
import { AhaRefForwardingComponent, ComponentSizeEnum, DropdownDirectionEnum } from 'types/common';
import { useTopMenuContext } from './Context';

export interface TopMenuSubMenuProps extends React.HTMLAttributes<HTMLElement> {
  /** A key that associates the TopMenu with it's controlling TopMenu.SubMenu.*/
  eventKey: string;
  /** Title */
  title: string;
  /**
   * Manually set the visual state of the TopMenu.SubMenu to disabled
   * @default false
   * */
  disabled?: boolean;
  /** The icon to display. The name can get from Component Icon */
  icon?: IconName;
  /** The badge to display. The structure can get from Component Badge  */
  badge?: string | (() => React.ReactNode);
  /** Highlight the submenu if current path matches one of the items inside this list **/
  hightLightWhitelist?: string[];
  /**
   * Enable collapsing the sub menu when its item is selected
   * @default false
   *  */
  autoCollapse?: boolean;
  /**
   * The path to control active status of this item
   * @private
   */
  path?: string;
  /**
   * Indicate wether this item is belonging to a SubMenu component
   * @default false
   * @private
   */
  isSubItem?: boolean;
  /**
   * Indicate index of this item among siblings
   * @private
   */
  index?: number;
  /**
   * Indicate deep level of this item in the TopMenu's tree
   * @private
   */
  level?: number;
}

const SubMenu: AhaRefForwardingComponent<React.ElementType, TopMenuSubMenuProps> = React.forwardRef((
  {
    className,
    title,
    disabled,
    children,
    badge,
    icon,
    hightLightWhitelist,
    autoCollapse,
    path,
    level,
    isSubItem = false,
    index,
    ...props
  }: TopMenuSubMenuProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  let active;
  const { currentPath } = useTopMenuContext();

  // Path is not required to the user but it is provided by the parent component so it shouldn't be null
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (currentPath !== '' && currentPath.startsWith(path!)) {
    active = true;
  }

  if (hightLightWhitelist?.includes(currentPath)) {
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

    if (typeof child === 'object' && 'props' in child) {
      const childPath = child.props.eventKey;

      let modifiedChildPath = '';

      if ('separated' in child.props && child.props.separated) {
        modifiedChildPath = childPath.toString();
      } else if (childPath.startsWith('#')) {
        modifiedChildPath = `${path}${childPath.toString()}`;
      } else {
        modifiedChildPath = `${path}.${childPath.toString()}`;
      }

      return React.cloneElement(
        child, ({
          isSubItem: true,
          // Level is not required to the user but it is provided by the parent component so it shouldn't be null
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          level: level! + 1,
          path: modifiedChildPath,
          index,
          onCloseSubMenu: () => (autoCollapse ? setOpen(false) : undefined),
        }),
      );
    }

    return child;
  });

  const getIconName = () => {
    if (icon) {
      return icon;
    }

    if (isSubItem) {
      return IconNameEnum.arrowForward;
    }

    return IconNameEnum.arrowDown;
  };

  const menuProps = {
    ...props,
    show: open,
    drop: isSubItem ? DropdownDirectionEnum.right : DropdownDirectionEnum.down,
  };

  return (
    <Dropdown
      ref={ref}
      {...menuProps}
      onToggle={onClick}
      className={classNames(
        'TopMenu-subMenu u-alignItemsCenter u-paddingVerticalExtraTiny',
        isSubItem ? 'u-flex' : 'u-flexInline',
        // Level is not required to the user but it is provided by the parent component so it shouldn't be null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (index! > 0 && !isSubItem) && 'u-marginLeftSmall lg:u-marginLeftLarge',
        className && className,
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
          isSubItem && 'u-flex',
        )}
        >
          <span className={classNames(
            isSubItem && 'u-flexGrow1',
          )}
          >
            {title}
          </span>
          {badge && (
            <span className="u-marginLeftExtraSmall">
              {typeof (badge) === 'function'
                ? badge()
                : <Badge variant={disabled ? BadgeVariantEnum.default : BadgeVariantEnum.positive}>{badge}</Badge>}
            </span>
          )}
          <Icon
            name={getIconName()}
            size={ComponentSizeEnum.tiny}
            className="u-marginLeftExtraSmall SidebarMenu-iconAppend u-flexShrink0"
            style={{
              marginTop: isSubItem ? 6 : undefined,
            }}
            data-testid={`sub-menu-${path}-icon`}
          />
        </span>
      </Dropdown.Toggle>
      <Dropdown.Container className={classNames(
        'u-paddingVerticalTiny',
        isSubItem && 'u-marginLeftTiny',
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

const TopMenuSubMenuWithDisplayName = Object.assign(SubMenu, {
  displayName: 'TopMenuSubMenu',
});

export default TopMenuSubMenuWithDisplayName;
