import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import usePopper from 'hooks/usePopper';
import useRootClose from 'hooks/useRootClose';
import createPopperConfig from 'utils/createPopperConfig';
import DropdownContext from './Context';

const propTypes = {
  /**
   * Custom style
   */
  additionalStyles: PropTypes.object,
  /**
   * You can use a custom element type for this component.
   * @default div
   */
  as: PropTypes.elementType,
  /**
   * Custom className
   */
  className: PropTypes.string,
  /**
   * Popper's `flip` modifier config.
   * @see https://popper.js.org/docs/v2/modifiers/flip/
   */
  flip: PropTypes.bool,
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   * @default {}
   */
  popperConfig: PropTypes.object,
  /**
   * The DOM event name (click, mousedown, etc) that will close the dropdown
   * @default click
   */
  rootCloseEvent: PropTypes.string,
  /**
   * Whether PopperJS should be used
   * @default true
   */
  shouldUsePopper: PropTypes.bool,
  /**
   * A `react-transition-group` Transition component used to animate the Message on dismissal.
   */
  transition: elementType,
};

const defaultProps = {
};

const Container = React.forwardRef((props, ref) => {
  const {
    additionalStyles,
    as: Component = 'div',
    flip,
    children,
    className,
    popperConfig = {},
    rootCloseEvent,
    shouldUsePopper = true,
    transition: Transition,
    ...restProps
  } = props;
  const context = useContext(DropdownContext);

  const show = context.show == null ? props.show : context.show;
  const alignRight = context.alignRight == null ? props.alignRight : context.alignRight;
  const handleClose = (e) => {
    if (!context.toggle) return;
    context.toggle(false, e);
  };
  const { drop, setContainer, containerElement, toggleElement } = context;

  let placement = alignRight ? 'bottom-end' : 'bottom-start';
  if (drop === 'up') placement = alignRight ? 'top-end' : 'top-start';
  else if (drop === 'right') placement = alignRight ? 'right-end' : 'right-start';
  else if (drop === 'left') placement = alignRight ? 'left-end' : 'left-start';
  const popper = usePopper(toggleElement, containerElement, createPopperConfig({
    placement,
    enabled: !!(shouldUsePopper && show),
    eventsEnabled: !!show,
    flip,
    popperConfig,
  }));

  const containerProps = {
    ref: setContainer,
    style: { ...popper.styles, ...additionalStyles },
    'aria-labelledby': toggleElement && toggleElement.id,
    ...restProps,
  };
  useRootClose(context.containerElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !(show),
  });
  const container = (
    <Component
      ref={ref}
      {...containerProps}
      className={classNames(
        'Dropdown-container',
        'u-zIndexDropdownContainer u-backgroundWhite u-roundedMedium u-border u-positionAbsolute u-textLeft u-positionLeft u-marginVerticalTiny',
        className && className,
      )}
    >
      {children}
    </Component>
  );
  if (!Transition) return show ? container : null;
  return (
    <Transition unmountOnExit ref={ref} {...props} in={show}>
      {container}
    </Transition>
  );
});
Container.displayName = 'DropdownContainer';
Container.defaultProps = defaultProps;
Container.propTypes = propTypes;
export default Container;
