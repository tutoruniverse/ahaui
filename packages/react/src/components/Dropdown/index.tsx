import React, { useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { useUncontrolledProp } from 'uncontrollable';
import useForceUpdate from '@restart/hooks/useForceUpdate';
import PropTypes from 'prop-types';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { PopperDirection } from 'hooks/usePopper';
import { createBlock } from 'utils/createBlock';
import { DropButton } from './Button';
import { Toggle } from './Toggle';
import { Container } from './Container';
import { DropdownContext } from './Context';

const propTypes = {
  /**
   * You can use a custom element type for this component.
   * @default div
   * */
  as: PropTypes.elementType,
  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   * @default 'down'
   * */
  drop: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled).
   * @default true
   */
  flip: PropTypes.bool,
  /**
   * Whether or not the Dropdown is visible.
   * @controllable onToggle
   *  */
  show: PropTypes.bool,
  /**
   * Sets the initial show position of the Dropdown.
   */
  defaultShow: PropTypes.bool,
  /**
   * Align the menu to the right side of the Dropdown toggle
   * @default false
   * */
  alignRight: PropTypes.bool,
  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   isOpen: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func,
};
const defaultProps = {};

export interface DropdownProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  /**
   * You can use a custom element type for this component.
   * @default div
   * */
  as?: React.ElementType;

  /**
   * Determines the direction and location of the Menu in relation to it's Toggle.
   * @default 'down'
   * */
  drop?: PopperDirection;

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   *
   * Popper.js's flip [docs](https://popper.js.org/popper-documentation.html#modifiers..flip.enabled).
   * @default true
   * */
  flip?: boolean;

  /**
   * Whether or not the Dropdown is visible.
   * @controllable onToggle
   * */
  show?: boolean;

  /**
   * Sets the initial show position of the Dropdown.
   */

  defaultShow?: boolean;

  /**
   * Align the menu to the right side of the Dropdown toggle
   * @default false
   * */
  alignRight?: boolean;

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `show` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(
   *   nextShow: boolean,
   *   event: SyntheticEvent,
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle?: (nextShow: boolean, event?: React.SyntheticEvent | Event) => void;
}

interface DropdownRefForwardingComponent<TInitial extends React.ElementType, P = unknown>
  extends RefForwardingComponent<TInitial, P> {
  Item?: typeof Item;
  Button?: typeof DropButton;
  Toggle?: typeof Toggle;
  Container?: typeof Container;
}

function useRefWithUpdate() {
  const forceUpdate = useForceUpdate();
  const ref = useRef<HTMLElement | null>(null);
  const attachRef = useCallback(
    (element: null | HTMLElement) => {
      ref.current = element;
      // ensure that a menu set triggers an update for consumers
      forceUpdate();
    },
    [forceUpdate]
  );
  return [ref, attachRef] as const;
}

export const Dropdown: DropdownRefForwardingComponent<'div', DropdownProps> = React.forwardRef(
  (
    {
      show: rawShow,
      onToggle: rawOnToggle,
      defaultShow,
      as: Component = 'div',
      className,
      alignRight,
      drop = PopperDirection.DOWN,
      ...props
    }: DropdownProps,
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [show, onToggle] = useUncontrolledProp(rawShow, defaultShow!, rawOnToggle);

    const [containerRef, setContainer] = useRefWithUpdate();
    const containerElement = containerRef.current;

    const [toggleRef, setToggle] = useRefWithUpdate();
    const toggleElement = toggleRef.current;

    const toggle = useCallback(
      (nextShow: boolean, event?: React.SyntheticEvent | Event) => onToggle(nextShow, event),
      [onToggle]
    );

    const context = useMemo(
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
      [toggle, drop, show, alignRight, containerElement, toggleElement, setContainer, setToggle]
    );

    return (
      <DropdownContext.Provider value={context}>
        <Component
          ref={ref}
          {...props}
          className={classNames('Dropdown u-positionRelative', className && className)}
        />
      </DropdownContext.Provider>
    );
  }
);
const Item = createBlock(
  'Dropdown-item u-flex u-paddingHorizontalSmall u-paddingVerticalTiny hover:u-backgroundLightest'
);

Dropdown.Item = Item;
Dropdown.Container = Container;
Dropdown.Button = DropButton;
Dropdown.Toggle = Toggle;
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.displayName = 'Dropdown';
