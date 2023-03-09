import React from 'react';
import classNames from 'classnames';

const Inside = React.forwardRef(({ children, ...props }, ref) => (
  <div className="ModalInside u-overflowHorizontalHidden u-overflowVerticalAuto u-positionRelative u-flex u-heightFull">
    <div
      ref={ref}
      {...props}
      className={classNames(
        'Modal-backDrop u-positionAbsolute u-positionFull u-backgroundBlack u-zIndex2',
      )}
    />
    {children}
  </div>
));
Inside.defaultProps = {};
Inside.displayName = 'ModalInside';
Inside.propTypes = {};

export default Inside;
