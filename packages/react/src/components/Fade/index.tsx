//fork react-bootstrap/src/Fade.js
import classNames from 'classnames';
import React, { ForwardedRef, useCallback } from 'react';
import Transition, {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  UNMOUNTED,
  TransitionStatus,
  type TransitionProps,
} from 'react-transition-group/Transition';
import triggerBrowserReflow from 'utils/triggerBrowserReflow';

export type FadeProps = TransitionProps & {
  className?: string;
  children: React.ReactElement;
};

const fadeStyles: Record<TransitionStatus, string> = {
  [ENTERING]: 'Show js-entering',
  [ENTERED]: 'Show js-entered',
  [EXITED]: '',
  [EXITING]: '',
  [UNMOUNTED]: '',
};

const Fade = React.forwardRef(
  (
    {
      className,
      children,
      onEnter,
      ...otherProps
    }: FadeProps,
    ref: ForwardedRef<Transition<any>>,
  ) => {
    const props = {
      in: false,
      timeout: 300,
      mountOnEnter: false,
      unmountOnExit: false,
      appear: false,
      ...otherProps,
    };

    const handleEnter = useCallback(
      (node: HTMLElement, isAppearing: boolean) => {
        triggerBrowserReflow(node);
        onEnter?.(node, isAppearing);
      },
      [onEnter],
    );

    return (
      <Transition
        ref={ref}
        {...props}
        onEnter={handleEnter}
      >
        {(status, innerProps) => React.cloneElement(children, {
          ...innerProps,
          className: classNames(
            'Fade',
            className,
            children?.props.className,
            fadeStyles[status],
          ),
        })}
      </Transition>
    );
  });

const FadeWithDisplayName = Object.assign(Fade, {
  displayName: 'Fade',
});

export default FadeWithDisplayName;
