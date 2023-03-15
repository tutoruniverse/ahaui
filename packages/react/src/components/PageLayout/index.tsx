import React, { useMemo } from 'react';
import classNames from 'classnames';
import Context, { PageLayoutContextValue } from './Context';
import PageLayoutHeader from './Header';
import PageLayoutBody from './Body';
import PageLayoutFooter from './Footer';


export type PageLayoutProps = React.ComponentPropsWithRef<'div'> & PageLayoutContextValue;

const PageLayout = React.forwardRef((
  {
    children,
    className,
    headerProps,
    bodyProps,
    footerProps,
    ...props
  }: PageLayoutProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const context = useMemo(() => ({
    headerProps,
    bodyProps,
    footerProps,
  }), [
    headerProps,
    bodyProps,
    footerProps,
  ]);
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


const CompoundPageLayout = Object.assign(PageLayout, {
  Header: PageLayoutHeader,
  Body: PageLayoutBody,
  Footer: PageLayoutFooter,
});

export default CompoundPageLayout;
