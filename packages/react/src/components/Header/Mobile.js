import React, { useMemo, useCallback, useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import Icon from 'components/Icon';
import createBlock from 'utils/createBlock';

const propTypes = {
  /** Whether or not the Header is visible. */
  show: PropTypes.bool,
  /** Define has DropContext */
  hasDropContext: PropTypes.bool,
  /** A callback fired when the HeaderMobile wishes to change visibility. Called with the requested show value, the DOM event.*/
  onToggle: PropTypes.func,
};
const defaultProps = {
  show: true,
};

const HeaderMobileContext = React.createContext({
  onToggle() {},
  showMenu: null,
});
const HeaderMobile = React.forwardRef((uncontrolledProps, ref) => {
  const { show, className, showMenu, hasDropContext, onToggle, children, ...props } = useUncontrolled(uncontrolledProps, { showMenu: 'onToggle' });
  const [toggleElement, setToggle] = useCallbackRef();
  const toggle = useCallback(
    (event) => {
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
        <div className="u-widthFull u-maxWidthFull u-marginVerticalAuto">
          <div className="HeaderMobile-inner u-flex u-flexColumn u-widthFull u-positionRelative">
            {children}
          </div>
        </div>
      </div>
    </HeaderMobileContext.Provider>
  );
});


const HeaderContext = React.forwardRef(({ className, children, classNameToggle, ...props }, ref) => {
  const { showMenu, hasDropContext, toggle, setToggle } = useContext(HeaderMobileContext);
  return (
    <div
      ref={ref}
      {...props}
      className={classNames(
        'HeaderMobile-context u-flex u-alignItemsCenter u-widthFull u-paddingRightSmall',
        className && className,
      )}
    >
      {hasDropContext && (
      <div
        ref={setToggle}
        onClick={toggle}
        role="button"
        className={classNames(
          'HeaderMobile-toggleButton u-marginRightSmall u-paddingVerticalExtraSmall u-paddingHorizontalSmall',
          classNameToggle && classNameToggle
        )}
      >
        <Icon name={showMenu ? 'close' : 'menu'} size="medium" />
      </div>
      )}
      {children}
    </div>
  );
});

const DropContext = React.forwardRef(({ className, children, ...props }, ref) => {
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
        className && className
      )}
    >
      {children}
    </div>
  );
});

HeaderContext.propTypes = {
  /** */
  classNameToggle: PropTypes.string,
};
const Brand = createBlock('HeaderMobile-brand u-lineHeightReset u-fontSizeNone u-flexShrink0 u-marginRightSmall u-paddingVerticalExtraSmall');
const Main = createBlock('HeaderMobile-main u-flex u-flexGrow1 u-justifyContentEnd u-paddingVerticalExtraSmall');
const AfterContext = createBlock('HeaderMobile-afterContext');

HeaderMobile.Main = Main;
HeaderMobile.Brand = Brand;
HeaderMobile.AfterContext = AfterContext;
HeaderMobile.Context = HeaderContext;
HeaderMobile.DropContext = DropContext;
HeaderMobile.displayName = 'HeaderMobile';
HeaderMobile.defaultProps = defaultProps;
HeaderMobile.propTypes = propTypes;

export default HeaderMobile;
