import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { AccordionContext, AccordionEventKey } from './Context';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,

  /** Disables the toggle from triggering the collapse  */
  disabled: PropTypes.bool,
};

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export function useAccordionToggle(eventKey: string, onClick?: EventHandler): EventHandler {
  const { activeEventKey, onSelect } = useContext(AccordionContext);
  return (e) => {
    const eventKeyPassed: AccordionEventKey = eventKey === activeEventKey ? null : eventKey;

    onSelect?.(eventKeyPassed, e);
    onClick?.(e);
  };
}

export interface AccordionToggleProps extends PrefixProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  eventKey: string;
}

const AccordionToggle: RefForwardingComponent<'div', AccordionToggleProps> = React.forwardRef<
  HTMLButtonElement,
  AccordionToggleProps
>(({ className, eventKey, children, disabled, onClick, as: Component = 'div', ...props }, ref) => {
  const accordionOnClick = useAccordionToggle(eventKey, onClick);

  if (Component === 'button') {
    props.type = 'button';
  }

  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        'Accordion-toggle u-lineHeightNone',
        Component === 'button' && 'u-borderNone u-paddingNone u-backgroundTransparent',
        disabled ? ' u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
        className && className
      )}
      onClick={!disabled ? accordionOnClick : null}
    >
      {children}
    </Component>
  );
});
AccordionToggle.propTypes = propTypes;
AccordionToggle.defaultProps = {};
AccordionToggle.displayName = 'AccordionToggle';
export default AccordionToggle;
