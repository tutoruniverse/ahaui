import React from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether or not the Header is visible. */
  show?: boolean;

  /** Custom className for Inner */
  innerClassName?: string;

  /** Config full width for Header */
  fullWidth?: boolean;
}

export const Header = React.forwardRef(
  (
    {
      className,
      innerClassName,
      fullWidth,
      show = true,
      children,
      ...props
    }: HeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
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
  },
);

const Brand = createBlock('Header-brand u-lineHeightReset u-fontSizeNone u-flexShrink0 u-marginRightSmall lg:u-marginRightMedium xl:u-marginRightLarge');
const Main = createBlock('Header-main u-flexGrow1 u-flex u-alignItemsCenter');
const Left = createBlock('Header-left u-flex u-alignItemsCenter');
const Right = createBlock('Header-right u-flex u-alignItemsCenter u-marginLeftAuto');
const AbsoluteCenter = createBlock('Header-center u-flex u-positionAbsolute u-positionCenter');

const HeaderComponent = Object.assign(Header, {
  Left,
  AbsoluteCenter,
  Right,
  Brand,
  Main,
  displayName: 'HeaderComponent',
});

export default HeaderComponent;
