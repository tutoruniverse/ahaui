import React, { useContext } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

export type PageLayoutBodyProps = React.HTMLAttributes<HTMLElement>;

export const PageLayoutBody: AhaRefForwardingComponent<React.ElementType, PageLayoutBodyProps> = React.forwardRef(
  (
    {
      className,
      children,
      ...props
    }: PageLayoutBodyProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { bodyProps } = useContext(Context);
    const mergeProps = {
      ref,
      ...bodyProps,
      ...props,
    };
    return (
      <div
        {...mergeProps}
        className={classNames(
          'PageLayout-body',
          'u-flex u-flexGrow1',
          className && className,
          bodyProps?.className && bodyProps.className,
        )}
      >
        {children}
      </div>
    );
  });

const PageLayoutBodyWithDisplayName = Object.assign(PageLayoutBody, {
  displayName: 'PageLayoutBody',
});

export default PageLayoutBodyWithDisplayName;
