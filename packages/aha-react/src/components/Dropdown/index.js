import React, { useMemo, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useForceUpdate from '@restart/hooks/useForceUpdate';
import PropTypes from 'prop-types';
import createBlock from 'utils/createBlock';
import DropButton from './Button';
import Toggle from './Toggle';
import Container from './Container';
import DropdownContext from './Context';


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
  drop: PropTypes.oneOf([
    'up',
    'down',
    'left',
    'right',
  ]),
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
   *   metadata: {
   *     source: 'select' | 'click' | 'rootClose' | 'keydown'
   *   }
   * ): void
   * ```
   *
   * @controllable show
   */
  onToggle: PropTypes.func,
};
const defaultProps = {

};
const Dropdown = React.forwardRef((uncontrolledProps, ref) => {
  const {
    drop,
    show,
    className,
    alignRight,
    onToggle,
    as: Component = 'div',
    ...props
  } = useUncontrolled(uncontrolledProps, { show: 'onToggle' });
  const forceUpdate = useForceUpdate();
  const [toggleElement, setToggle] = useCallbackRef();
  const containerRef = useRef();
  const containerElement = containerRef.current;
  const setContainer = useCallback(
    (ref) => {
      containerRef.current = ref;
      // ensure that a menu set triggers an update for consumers
      forceUpdate();
    },
    [forceUpdate],
  );

  const toggle = useCallback(
    (event) => {
      onToggle(!show, event);
    },
    [onToggle, show],
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
        className={classNames(
          'Dropdown',
          'u-positionRelative',
          className && className
        )}
      />
    </DropdownContext.Provider>
  );
});
const Item = createBlock('Dropdown-item u-flex u-paddingHorizontalSmall u-paddingVerticalTiny hover:u-backgroundLightest');
Dropdown.Item = Item;
Dropdown.Container = Container;
Dropdown.Button = DropButton;
Dropdown.Toggle = Toggle;
Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
Dropdown.displayName = 'Dropdown';
export default Dropdown;
