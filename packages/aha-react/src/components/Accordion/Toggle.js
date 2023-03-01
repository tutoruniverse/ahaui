import React, { useContext, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AccordionContext, { SelectableContext } from './Context';

const propTypes = {
  /**
    * A key that corresponds to the collapse component that gets triggered
    * when this has been clicked.
    */
  eventKey: PropTypes.string.isRequired,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,

  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element.isRequired,
};
export function useAccordionToggle(eventKey, onClick) {
  const contextEventKey = useContext(AccordionContext);
  const onSelect = useContext(SelectableContext);
  return (e) => {
    const eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
    onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionToggle = React.forwardRef(({ className, eventKey, onClick, children, disabled, ...props }, ref) => {
  const onAccordionClick = useAccordionToggle(eventKey, onClick);
  return cloneElement(children, {
    className: classNames(
      'Accordion-toggle',
      disabled ? ' u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
      className && className,
    ),
    onClick: !disabled ? onAccordionClick : null,
    ...props,
    ref,
    children,
  });
});
AccordionToggle.propTypes = propTypes;
AccordionToggle.defaultProps = {};
AccordionToggle.displayName = 'AccordionToggle';
export default AccordionToggle;
