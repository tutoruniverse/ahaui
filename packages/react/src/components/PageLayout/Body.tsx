import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';

export type BodyProps = React.ComponentPropsWithRef<'div'>;

export const PageLayoutBody = React.forwardRef((
  {
    className,
    children,
    ...props
  }: BodyProps,
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

export default PageLayoutBody;
