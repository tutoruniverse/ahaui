import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';


export const PageLayoutFooter = React.forwardRef(({ className, children, ...props }, ref) => {
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
        footerProps.className && footerProps.className
      )}
    >

      {children}
    </div>
  );
});

PageLayoutFooter.displayName = 'PageLayout.Footer';
PageLayoutFooter.propTypes = {};
PageLayoutFooter.defaultProps = {};
export default PageLayoutFooter;
