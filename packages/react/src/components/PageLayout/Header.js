import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';


export const PageLayoutHeader = React.forwardRef(({ className, children, ...props }, ref) => {
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
        headerProps.className && headerProps.className
      )}
    >
      {children}
    </div>
  );
});

PageLayoutHeader.displayName = 'PageLayout.Header';
PageLayoutHeader.propTypes = {};
PageLayoutHeader.defaultProps = {};
export default PageLayoutHeader;
