import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createBlock from 'utils/createBlock';

const propTypes = {
  /** Whether or not the Header is visible. */
  show: PropTypes.bool,
  /** Custom className for Inner */
  innerClassName: PropTypes.string,
};
const defaultProps = {
  show: true,
};

const Header = React.forwardRef(({ className, innerClassName, fullWidth, show, children, ...props }, ref) => {
  if (!show) return null;
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'Header',
        'u-backgroundWhite u-paddingVerticalSmall',
        className && className,
      )}
    >
      <div className={classNames(
        'Container',
        fullWidth && 'Container--fluid',
      )}
      >
        <div className={classNames(
          'Header-inner u-flex u-widthFull u-alignItemsCenter u-positionRelative',
          innerClassName && innerClassName,
        )}
        >
          {children}
        </div>
      </div>
    </div>
  );
});

const Brand = createBlock('Header-brand u-lineHeightReset u-fontSizeNone u-flexShrink0 u-marginRightSmall lg:u-marginRightMedium xl:u-marginRightLarge');
const Main = createBlock('Header-main u-flexGrow1 u-flex u-alignItemsCenter');
const Left = createBlock('Header-left u-flex u-alignItemsCenter');
const Right = createBlock('Header-right u-flex u-alignItemsCenter u-marginLeftAuto');
const AbsoluteCenter = createBlock('Header-center u-flex u-positionAbsolute u-positionCenter');

Header.Left = Left;
Header.AbsoluteCenter = AbsoluteCenter;
Header.Right = Right;
Header.Brand = Brand;
Header.Main = Main;
Header.displayName = 'Header';
Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;
