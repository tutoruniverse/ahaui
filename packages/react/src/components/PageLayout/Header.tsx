import React, { useContext } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

export type PageLayoutHeaderProps = React.HTMLAttributes<HTMLElement>;

const PageLayoutHeader: AhaRefForwardingComponent<React.ElementType, PageLayoutHeaderProps> = React.forwardRef(
  (
    {
      className,
      children,
      ...props
    }: PageLayoutHeaderProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { headerProps } = useContext(Context);
    const mergeProps = {
      ref,
      ...headerProps,
      ...props,
    };
    return (
      <div
        {...mergeProps}
        className={classNames(
          'PageLayout-header',
          className && className,
          headerProps?.className && headerProps.className,
        )}
      >
        {children}
      </div>
    );
  });

const PageLayoutHeaderWithDisplayName = Object.assign(PageLayoutHeader, {
  displayName: 'PageLayoutHeader',
});

export default PageLayoutHeaderWithDisplayName;
