import React from 'react';
import classNames from 'classnames';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import Icon from 'components/Icon';
import Button from 'components/Button';
import {
  AhaRefForwardingComponent,
  AsProp,
  ComponentSize,
  ComponentSizeEnum,
  DropdownDirectionEnum,
} from 'types/common';
import { useDropdownContext } from './Context';
import { useToggle } from './Toggle';

export interface DropdownButtonProps extends AsProp, React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Define size of caret icon
   * @default 'extraSmall'
   * */
  caret?: ComponentSize;
}

const DropButton: AhaRefForwardingComponent<React.ElementType, DropdownButtonProps> = React.forwardRef(
  (
    {
      className,
      children,
      caret = ComponentSizeEnum.extraSmall,
      as,
      ...props
    }: DropdownButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const Component = as || Button;

    const [toggleProps, { toggle }] = useToggle();
    const { drop } = useDropdownContext();
    const newRef = useMergedRefs<HTMLButtonElement | null>(toggleProps.ref, ref);

    return (
      <Component
        {...toggleProps}
        {...props}
        ref={newRef}
        onClick={(e: React.SyntheticEvent | Event) => {
          // So that the useRootClose listener in Container won't trigger the 2nd toggle
          e.stopPropagation();
          toggle(e);
        }}
        nonUppercase
        className={classNames(
          'Dropdown-button',
          className && className,
        )}
      >
        {children}
        <span className={classNames(
          'u-marginLeftTiny u-inlineBlock u-lineHeightNone',
        )}
        >
          <Icon
            name="arrowDown"
            className={classNames(
              drop === DropdownDirectionEnum.up && 'u-rotate180',
            )}
            size={caret}
          />
        </span>
      </Component>
    );
  });

const DropButtonWithDisplayName = Object.assign(DropButton, {
  displayName: 'DropdownButton',
});

export default DropButtonWithDisplayName;
