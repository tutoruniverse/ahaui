import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import useMergedRefs from '@restart/hooks/esm/useMergedRefs';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import useWrappedRefWithWarning from 'hooks/useWrappedRefWithWarning';
import { DropdownContext, DropdownContextInterface } from './Context';

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop: any = () => {};
export interface UseDropdownToggleProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  'ref': DropdownContextInterface['setToggle'];
  'onClick': React.MouseEventHandler;
  'aria-haspopup': boolean;
  'aria-expanded': boolean;
}
export interface UseDropdownToggleMetadata {
  show: DropdownContextInterface['show'];
  toggle: DropdownContextInterface['toggle'];
}

export function useToggle(): [UseDropdownToggleProps, UseDropdownToggleMetadata] {
  const { show = false, toggle = noop, setToggle } = useContext(DropdownContext) || {};

  const handleClick = useCallback(
    (e) => {
      toggle(!show, e);
    },
    [show, toggle]
  );
  return [
    {
      'ref': setToggle || noop,
      'onClick': handleClick,
      'aria-haspopup': true,
      'aria-expanded': !!show,
    },
    { show, toggle },
  ];
}
export interface DropdownToggleProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  disabled?: boolean;
}

export const Toggle: RefForwardingComponent<'div', DropdownToggleProps> = React.forwardRef(
  ({ className, disabled, as: Component = 'div', ...props }: DropdownToggleProps, ref) => {
    const dropdownContext = useContext(DropdownContext);
    const [toggleProps] = useToggle();
    toggleProps.ref = useMergedRefs(toggleProps.ref, useWrappedRefWithWarning(ref, 'DropdownToggle'));
    return (
      <Component
        className={classNames(
          'Dropdown-toggle',
          className && className,
          disabled ? ' u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
          dropdownContext?.show && 'isShow'
        )}
        {...toggleProps}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'DropdownToggle';
Toggle.defaultProps = {};
Toggle.propTypes = propTypes;
