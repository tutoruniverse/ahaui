import React, { useContext, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import TabContext from './Context';

const propTypes = {
  /** A key that associates the Tab with it's controlling Tab.Item.*/
  eventKey: PropTypes.string,
  /**
   * Manually set the visual state of the Tab.Item to disabled
   * @default false
   * */
  disabled: PropTypes.bool,

};
const defaultProps = {
};

const Item = React.forwardRef(({ className, disabled, eventKey, index, fullWidth, direction, children, path, visual, as: Component = 'div', ...props }, ref) => {
  let active;

  const context = useContext(TabContext);
  if (path === context.current) {
    active = true;
  }

  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    context.onSelect(path);
  };

  const textActiveColor = useMemo(() => {
    switch (context.variant) {
      case 'dark':
        return 'u-textNeutral800';
      default:
        return 'u-textPrimary';
    }
  }, []);

  const itemAfterColor = useMemo(() => {
    switch (context.variant) {
      case 'dark':
        return 'u-backgroundNeutral800';
      default:
        return 'u-backgroundPrimary';
    }
  }, []);

  return (
    <div
      onClick={disabled ? null : onClick}
      className={classNames(
        'Tab-item u-flex u-positionRelative',
        (index > 0 && !fullWidth && (direction !== 'vertical') && (visual !== 'filled')) && 'u-marginLeftSmall',
        fullWidth && 'u-flexGrow1',
        (index > 0 && visual === 'filled' && (direction !== 'vertical')) && 'u-borderLeft',
        (index > 0 && visual === 'filled' && (direction === 'vertical')) && 'u-borderTop',
        active && 'is-active',
        disabled ? 'is-disabled u-cursorNotAllow' : 'u-cursorPointer',
        className && className,
      )}
    >
      {active && (
        <div className={classNames(
          'Tab-itemAfter u-zIndex2',
          'u-positionAbsolute',
          itemAfterColor,
          visual === 'filled' ? ' u-positionTop' : 'u-positionBottom',
          direction !== 'vertical' ? 'u-heightExtraTiny u-widthFull' : 'u-widthExtraTiny u-heightFull',
        )}
        />
      )}
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'u-flexGrow1 u-paddingVerticalTiny md:u-paddingVerticalExtraSmall hover:u-textDecorationNone',
          active ? textActiveColor : !disabled && `u-textGray hover:${textActiveColor}`,
          (visual === 'filled' && active) && 'u-backgroundWhite',
          (visual === 'filled' && !active) && 'u-backgroundLightest',
          (visual === 'filled' && (direction !== 'vertical')) && 'u-paddingHorizontalSmall',
          direction === 'vertical' && 'u-paddingHorizontalSmall',
          fullWidth && 'u-textCenter',
          disabled && 'u-textLight',
        )}
      >
        {children}
      </Component>

    </div>
  );
});

Item.defaultProps = defaultProps;
Item.displayName = 'TabItem';
Item.propTypes = propTypes;
export default Item;
