import React, { useContext } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

export type PageLayoutFooterProps = React.HTMLAttributes<HTMLElement>;

export const PageLayoutFooter: AhaRefForwardingComponent<React.ElementType, PageLayoutFooterProps> = React.forwardRef((
  {
    className,
    children,
    ...props
  }: PageLayoutFooterProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const { footerProps } = useContext(Context);
  const mergeProps = {
    ref,
    ...footerProps,
    ...props,
  };
  return (
    <div
      {...mergeProps}
      className={classNames(
        'PageLayout-footer',
        className && className,
        footerProps?.className && footerProps.className,
      )}
    >

      {children}
    </div>
  );
});

const PageLayoutFooterWithDisplayName = Object.assign(PageLayoutFooter, {
  displayName: 'PageLayoutFooter',
});

export default PageLayoutFooterWithDisplayName;
