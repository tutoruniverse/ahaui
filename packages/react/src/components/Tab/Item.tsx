import React, {
  useContext,
} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from 'types/common';
import { TabContext, VariantForTag } from '.';

type PropTypes = {
  /** A key that associates the Tab with it's controlling Tab.Item.*/
  eventKey?: string;
  /**
   * Manually set the visual state of the Tab.Item to disabled
   * @default false
   * */

  /**Disable current item */
  disabled?: boolean;

  /** This property is from Tab*/
  index?: number;

  /** This property is from Tab*/
  path?: string;

  /** This property is from Tab*/
  fullWidth?: boolean;

  /** This property is from Tab*/
  direction?: string;

  /** This property is from Tab*/
  visual?: 'default' | 'filled';

};

type ItemProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
  T,
  PropTypes
>;

type ItemComponent = <T extends React.ElementType = 'div'>(
  props: ItemProps<T>,
) => React.ReactElement | null;

const textActiveColor = {
  dark: 'u-textNeutral800',
};

const itemAfterColor = {
  dark: 'u-backgroundNeutral800',
};

const Item: ItemComponent = React.forwardRef(
  <T extends React.ElementType>(
    {
      className,
      disabled = false,
      eventKey,
      index,
      fullWidth,
      direction,
      children,
      path,
      visual,
      as,
      ...props
    }: ItemProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const Component = as || 'div';

    const { current, onSelect, variant } = useContext(TabContext);

    const active = path === current;

    const onClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onSelect && onSelect(path);
    };

    const getTextActiveColor = (variant?: VariantForTag) => (variant ? textActiveColor[variant] : 'u-textPrimary');

    const getItemAfterColor = (variant?: VariantForTag) => (variant ? itemAfterColor[variant] : 'u-backgroundPrimary');

    return (
      <div
        onClick={(e) => {
          !disabled && onClick(e);
        }}
        className={classNames(
          'Tab-item u-flex u-positionRelative',
          index
          && index > 0
          && !fullWidth
          && direction !== 'vertical'
          && visual !== 'filled'
          && 'u-marginLeftSmall',
          fullWidth && 'u-flexGrow1',
          index
          && index > 0
          && visual === 'filled'
          && direction !== 'vertical'
          && 'u-borderLeft',
          index
          && index > 0
          && visual === 'filled'
          && direction === 'vertical'
          && 'u-borderTop',
          active && 'is-active',
          disabled ? 'is-disabled u-cursorNotAllow' : 'u-cursorPointer',
          className && className,
        )}
      >
        {active && (
          <div
            className={classNames(
              'Tab-itemAfter u-zIndex2',
              'u-positionAbsolute',
              getItemAfterColor(variant),
              visual === 'filled' ? ' u-positionTop' : 'u-positionBottom',
              direction !== 'vertical'
                ? 'u-heightExtraTiny u-widthFull'
                : 'u-widthExtraTiny u-heightFull',
            )}
          />
        )}
        <Component
          ref={ref}
          {...props}
          className={classNames(
            'u-flexGrow1 u-paddingVerticalTiny md:u-paddingVerticalExtraSmall hover:u-textDecorationNone',
            active
              ? getTextActiveColor(variant)
              : !disabled && `u-textGray hover:${getTextActiveColor(variant)}`,
            visual === 'filled' && active && 'u-backgroundWhite',
            visual === 'filled' && !active && 'u-backgroundLightest',
            visual === 'filled'
            && direction !== 'vertical'
            && 'u-paddingHorizontalSmall',
            direction === 'vertical' && 'u-paddingHorizontalSmall',
            fullWidth && 'u-textCenter',
            disabled && 'u-textLight',
          )}
        >
          {children}
        </Component>
      </div>
    );
  },
);

export default Item;
