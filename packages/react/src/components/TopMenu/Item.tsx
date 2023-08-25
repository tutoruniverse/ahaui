import React from 'react';
import classNames from 'classnames';
import SafeAnchor from 'components/SafeAnchor';
import Badge, { BadgeVariantEnum } from 'components/Badge';
import { AhaRefForwardingComponent } from 'types/common';
import { useTopMenuContext } from './Context';

export interface TopMenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  /** A key that associates the TopMenu with it's controlling TopMenu.Item.*/
  eventKey: string;
  /**
   * Manually set the visual state of the TopMenu.Item to disabled
   * @default false
   * */
  disabled?: boolean;
  /** The badge to display. The structure can get from Component Badge  */
  badge?: string | (() => React.ReactNode);
  /** If this value is true, child's path is not nested in parent's path **/
  separated?: boolean;
  /**
   * The function that collapses its parent's sub menu. It would be run whenever this item is selected by the user.
   * @private
   */
  onCloseSubMenu?: () => void;
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

const Item: AhaRefForwardingComponent<React.ElementType, TopMenuItemProps> = React.forwardRef((
  {
    className,
    children,
    disabled = false,
    badge,
    onCloseSubMenu,
    isSubItem = false,
    index,
    path,
    ...props
  }: TopMenuItemProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) => {
  let active;

  const { currentPath, onPathSelect } = useTopMenuContext();

  if (path === currentPath) {
    active = true;
  }

  const Component = active || disabled ? 'span' : SafeAnchor;

  const onClick = () => {
    // Path is not required to the user but it is provided by the parent component so it shouldn't be null
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onPathSelect(path!);
    onCloseSubMenu?.();
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames(
        'TopMenu-item u-positionRelative u-paddingVerticalExtraTiny',
        // index is not required to the user but it is provided by the parent component so it shouldn't be null
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (index! > 0 && !isSubItem) && 'u-marginLeftLarge',
        active && 'is-active',
        isSubItem ? 'u-flex hover:u-backgroundLightest u-paddingHorizontalSmall' : 'u-flexInline u-alignItemsCenter',
        disabled ? 'is-disabled u-cursorNotAllow u-pointerEventsNone' : 'u-cursorPointer',
        className && className,
      )}
    >
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
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'u-positionRelative u-flexInline u-flexGrow1 u-paddingVerticalTiny hover:u-textDecorationNone',
          active ? 'u-textLink' : !disabled && 'u-textDark hover:u-textLink',
          disabled && 'u-textLight',
        )}
      >
        <div className="u-flexGrow1">
          {children}
        </div>

        {badge && (
          <span className="u-marginLeftExtraSmall">
            {typeof (badge) === 'function'
              ? badge()
              : <Badge variant={disabled ? BadgeVariantEnum.default : BadgeVariantEnum.positive}>{badge}</Badge>}
          </span>
        )}
      </Component>
    </div>
  );
});

const TopMenuItemWithDisplayName = Object.assign(Item, {
  displayName: 'TopMenuItem',
});

export default TopMenuItemWithDisplayName;
