import React from 'react';

type ModalInsideProps = React.HTMLAttributes<HTMLElement>;

const Inside = React.forwardRef<HTMLDivElement, ModalInsideProps>(
  (
    { children, ...props } : ModalInsideProps,
    ref : React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div className="ModalInside u-overflowHorizontalHidden u-overflowVerticalAuto u-positionRelative u-flex u-heightFull" data-testid="modal-inside">
      <div
        ref={ref}
        {...props}
        className="Modal-backDrop u-positionAbsolute u-positionFull u-backgroundBlack u-zIndex2"
      />
      {children}
    </div>
  ));

const ModalInsideWithDisplayName = Object.assign(Inside, {
  displayName: 'ModalInside',
});

export default ModalInsideWithDisplayName;
