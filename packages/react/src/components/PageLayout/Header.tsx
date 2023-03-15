import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';

export type HeaderProps = React.ComponentPropsWithRef<'div'>;

const PageLayoutHeader = React.forwardRef((
  {
    className,
    children,
    ...props
  }: HeaderProps,
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

export default PageLayoutHeader;
