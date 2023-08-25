import React, { useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useForceUpdate from '@restart/hooks/useForceUpdate';
import createBlock from 'utils/createBlock';
import {
  AhaRefForwardingComponent,
  AsProp,
  DropdownDirection,
  DropdownDirectionEnum,
} from 'types/common';
import DropButton, { DropdownButtonProps } from './Button';
import Toggle, { DropdownToggleProps } from './Toggle';
import Container, { DropdownContainerProps } from './Container';
import { DropdownContext, DropdownContextValue } from './Context';

export interface DropdownProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   * @default 'down'
   * */
  drop?: DropdownDirection;
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled).
   * @default true
   */
  flip?: boolean;
  /**
   * Whether or not the Dropdown is visible.
   * @controllable onToggle
   *  */
  show?: boolean;
  /**
   * Using when component is uncontrolled, decide wether or not the Dropdown is visible at the beginning.
   * @default false
   *  */
  defaultShow?: boolean;
  /**
   * Align the menu to the right side of the Dropdown toggle
   * @default false
   * */
  alignRight?: boolean;
  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event
   *
   * @controllable show
   */
  onToggle?: (value: boolean, e: React.SyntheticEvent | Event) => void;
}

const Dropdown: AhaRefForwardingComponent<React.ElementType, DropdownProps> = React.forwardRef(
  (
    uncontrolledProps: DropdownProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      drop = DropdownDirectionEnum.down,
      flip = true,
      alignRight = false,
      as: Component = 'div',
      className,
      show: uncontrolledShow,
      onToggle: uncontrolledOnToggle,
      defaultShow = false,
      ...props
    } = uncontrolledProps;

    const {
      show,
      onToggle,
    } = useUncontrolled({
      show: uncontrolledShow,
      onToggle: uncontrolledOnToggle,
      defaultShow,
    }, { show: 'onToggle' });

    const forceUpdate = useForceUpdate();
    const [toggleElement, setToggle] = useCallbackRef<HTMLElement>();
    const containerRef = useRef<HTMLElement | null>(null);
    const containerElement = containerRef.current;

    const setContainer = useCallback<DropdownContextValue['setContainer']>(
      (ref) => {
        containerRef.current = ref;
        // ensure that a menu set triggers an update for consumers
        forceUpdate();
      },
      [forceUpdate],
    );

    const toggle = useCallback<DropdownContextValue['toggle']>(
      (event: Event | React.SyntheticEvent) => {
        // Since useUncontrolled will provide a onToggle function whether its provided through props,
        // so onToggle should never be undefined`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onToggle!(!show, event);
      },
      [onToggle, show],
    );

    const context = useMemo<DropdownContextValue>(
      () => ({
        toggle,
        drop,
        show,
        alignRight,
        containerElement,
        toggleElement,
        setContainer,
        setToggle,
      }),
      [
        toggle,
        drop,
        show,
        alignRight,
        containerElement,
        toggleElement,
        setContainer,
        setToggle,
      ],
    );
    return (
      <DropdownContext.Provider value={context}>
        <Component
          ref={ref}
          {...props}
          flip={flip}
          className={classNames(
            'Dropdown',
            'u-positionRelative',
            className && className,
          )}
        />
      </DropdownContext.Provider>
    );
  });

const Item = createBlock('Dropdown-item u-flex u-paddingHorizontalSmall u-paddingVerticalTiny hover:u-backgroundLightest');

const CompoundDropdown = Object.assign(Dropdown, {
  Item,
  Container,
  Button: DropButton,
  Toggle,
  displayName: 'Dropdown',
});

export default CompoundDropdown;
export type { DropdownToggleProps, DropdownButtonProps, DropdownContainerProps };
