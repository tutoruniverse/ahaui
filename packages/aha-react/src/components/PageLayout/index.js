import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Context from './Context';
import PageLayoutHeader from './Header';
import PageLayoutBody from './Body';
import PageLayoutFooter from './Footer';

const propTypes = {
  /**
   * Header props
   */
  headerProps: PropTypes.object,
  /**
   * Body props
   */
  bodyProps: PropTypes.object,
  /**
   * Footer props
   */
  footerProps: PropTypes.object,
};

const defaultProps = {
  headerProps: {},
  bodyProps: {},
  footerProps: {},
};

const PageLayout = React.forwardRef(({ children, className, headerProps, bodyProps, footerProps, ...props }, ref) => {
  const context = useMemo(() => ({
    headerProps,
    bodyProps,
    footerProps,
  }), [
    headerProps,
    bodyProps,
    footerProps]);
  return (
    <Context.Provider value={context}>
      <div
        ref={ref}
        {...props}
        className={classNames(
          'PageLayout',
          'u-screenHeightFull u-flex u-flexColumn u-overflowHidden',
          className && className,
        )}
      >
        {children}
      </div>
    </Context.Provider>
  );
});

PageLayout.displayName = 'PageLayout';
PageLayout.defaultProps = defaultProps;
PageLayout.propTypes = propTypes;
PageLayout.Header = PageLayoutHeader;
PageLayout.Body = PageLayoutBody;
PageLayout.Footer = PageLayoutFooter;
export default PageLayout;
