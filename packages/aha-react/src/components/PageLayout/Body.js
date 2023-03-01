import React, { useContext } from 'react';
import classNames from 'classnames';
import Context from './Context';

export const PageLayoutBody = React.forwardRef(({ className, children, ...props }, ref) => {
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
        bodyProps.className && bodyProps.className,
      )}
    >
      {children}
    </div>
  );
});

PageLayoutBody.displayName = 'PageLayout.Body';
PageLayoutBody.propTypes = {};
PageLayoutBody.defaultProps = {};
export default PageLayoutBody;
