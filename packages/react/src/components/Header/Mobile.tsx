import React, { useMemo, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import Icon from 'components/Icon';
import createBlock from 'utils/createBlock';

export interface HeaderMobileProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether or not the Header is visible. */
  show?: boolean;

  /** Define has DropContext */
  hasDropContext: boolean;

  /** A callback fired when the HeaderMobile wishes to change visibility. Called with the requested show value, the DOM event.*/
  onToggle: (showMenu: boolean, event: React.MouseEvent) => void;

  showMenu?: boolean;
}

interface HeaderMobileContextType {
  hasDropContext?: boolean;
  toggle?: React.MouseEventHandler;
  showMenu?: boolean;
  toggleElement: HTMLDivElement | null;
  setToggle?: (ref: HTMLDivElement | null) => void;
}

interface HeaderContextType extends React.HTMLAttributes<HTMLElement> {
  classNameToggle?: string;
}

const HeaderMobileContext = React.createContext<HeaderMobileContextType>({
  toggleElement: null,
});

export const HeaderMobile = React.forwardRef((
  uncontrolledProps: HeaderMobileProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const {
    show = true,
    className,
    showMenu,
    hasDropContext,
    onToggle,
    children,
    ...props
  } = useUncontrolled(uncontrolledProps, { showMenu: 'onToggle' });

  const [toggleElement, setToggle] = useCallbackRef<HTMLDivElement>();

  const toggle = useCallback(
    (event: React.MouseEvent) => {
      onToggle(!showMenu, event);
    },
    [onToggle, showMenu],
  );

  const context = useMemo(
    () => ({
      showMenu,
      hasDropContext,
      toggle,
      toggleElement,
      setToggle,
    }),
    [
      showMenu,
      hasDropContext,
      toggle,
      toggleElement,
      setToggle,
    ],
  );

  if (!show) return null;

  return (
    <HeaderMobileContext.Provider value={context}>
      <div
        ref={ref}
        {...props}
        className={classNames(
          'HeaderMobile',
          'u-flex u-flexColumn u-backgroundWhite u-borderBottom',
          showMenu && 'u-heightFull',
          className && className,
        )}
      >
        <div className="Container u-widthFull u-maxWidthFull u-marginVerticalAuto">
          <div className="HeaderMobile-inner u-flex u-flexColumn u-widthFull u-positionRelative">
            {children}
          </div>
        </div>
      </div>
    </HeaderMobileContext.Provider>
  );
});

const HeaderContext = React.forwardRef(
  (
    {
      className,
      children,
      classNameToggle,
      ...props
    }: HeaderContextType,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      showMenu,
      hasDropContext,
      toggle,
      setToggle,
    } = useContext(HeaderMobileContext);

    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          'HeaderMobile-context u-flex u-alignItemsCenter u-widthFull',
          className && className,
        )}
      >
        {children}
        {hasDropContext && (
          <div
            ref={setToggle}
            onClick={toggle}
            role="button"
            className={classNames(
              'HeaderMobile-toggleButton u-marginLeftSmall u-paddingVerticalExtraSmall u-paddingHorizontalSmall',
              classNameToggle && classNameToggle,
            )}
          >
            <Icon name={showMenu ? 'close' : 'menu'} size="small" />
          </div>
        )}
      </div>
    );
  },
);

const DropContext = React.forwardRef(
  (
    {
      className,
      children,
      ...props
    }: React.ComponentPropsWithRef<'div'>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useContext(HeaderMobileContext);

    if (!context.showMenu) {
      return null;
    }

    return (
      <div
        ref={ref}
        {...props}
        className={classNames(
          'HeaderMobile-dropContext',
          className && className,
        )}
      >
        {children}
      </div>
    );
  },
);

const Brand = createBlock('HeaderMobile-brand u-lineHeightReset u-fontSizeNone u-flexShrink0 u-marginRightSmall u-paddingVerticalExtraSmall');
const Main = createBlock('HeaderMobile-main u-flex u-flexGrow1 u-justifyContentEnd u-paddingVerticalExtraSmall');
const AfterContext = createBlock('HeaderMobile-afterContext');

const HeaderMobileComponent = Object.assign(HeaderMobile, {
  Main,
  Brand,
  AfterContext,
  Context: HeaderContext,
  DropContext,
  displayName: 'HeaderMobileComponent',
});

export default HeaderMobileComponent;
