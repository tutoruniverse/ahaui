import React, { cloneElement, useCallback } from 'react';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import { GenericFunction } from 'types/common';
import createChainedFunction from 'utils/createChainedFunction';
import { useDropdownContext } from './Context';

export function useToggle() {
  const { show, toggle, setToggle } = useDropdownContext();
  return [
    {
      ref: setToggle,
      'aria-haspopup': true,
      'aria-expanded': !!show,
    },
    { show, toggle },
  ] as const;
}

export interface DropdownToggleProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement;
  /**
   * To disable toggle element
   * @default false;
   */
  disabled?: boolean;
  /**
   * Function to called when toggled is clicked
   */
  onClick?: GenericFunction;
}

const Toggle = React.forwardRef<HTMLElement, DropdownToggleProps>(
  (
    {
      className,
      children,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const [toggleProps, { toggle }] = useToggle();
    const newRef = useMergedRefs<HTMLElement | null>(toggleProps.ref, ref);

    const newToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // So that the useRootClose listener in Container won't trigger the 2nd toggle
      e.stopPropagation();
      toggle(e);
    }, [toggle]);

    return cloneElement(children, {
      className: classNames(
        'Dropdown-toggle',
        disabled ? ' u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
        className && className,
      ),
      ...props,
      ...toggleProps,
      onClick: !disabled ? createChainedFunction(newToggle, props.onClick) : null,
      ref: newRef,
      children,
    });
  });

const ToggleWithDisplayName = Object.assign(Toggle, {
  displayName: 'DropdownToggle',
});

export default ToggleWithDisplayName;
