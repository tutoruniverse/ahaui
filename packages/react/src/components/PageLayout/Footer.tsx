import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';

export type FooterProps = React.ComponentPropsWithRef<'div'>;
type FooterComponent = (props: FooterProps) => React.ReactElement | null;

export const PageLayoutFooter: FooterComponent = React.forwardRef((
  {
    className,
    children,
    ...props
  }: FooterProps,
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

export default PageLayoutFooter;
