import React, { useMemo } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Context, { PageLayoutContextValue } from './Context';
import PageLayoutHeader, { PageLayoutHeaderProps } from './Header';
import PageLayoutBody, { PageLayoutBodyProps } from './Body';
import PageLayoutFooter, { PageLayoutFooterProps } from './Footer';

export type PageLayoutProps = React.HTMLAttributes<HTMLElement> & PageLayoutContextValue;

const PageLayout: AhaRefForwardingComponent<React.ElementType, PageLayoutProps> = React.forwardRef((
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
  displayName: 'PageLayout',
});

export default CompoundPageLayout;
export type {
  PageLayoutHeaderProps,
  PageLayoutBodyProps,
  PageLayoutFooterProps,
};
