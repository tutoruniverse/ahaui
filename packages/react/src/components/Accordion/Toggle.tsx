import React, { useContext, cloneElement } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp } from 'types/common';
import AccordionContext, { SelectableContext } from './Context';

export interface AccordionToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, AsProp {
  /**
    * A key that corresponds to the collapse component that gets triggered
    * when this has been clicked.
    */
  eventKey: string,

  /** A callback function for when this component is clicked */
  onClick?: React.MouseEventHandler,

  /** Children prop should only contain a single child, and  is enforced as such */
  children: React.ReactElement,

  /** Disabled the toggle */
  disabled?: boolean,
}

export function useAccordionToggle(eventKey: string, onClick?: React.MouseEventHandler) {
  const contextEventKey = useContext(AccordionContext);
  const onSelect = useContext(SelectableContext);
  return (e: React.MouseEvent) => {
    // If not selected, set to eventKey, otherwise set to null
    const eventKeyPassed = eventKey === contextEventKey ? null : eventKey;
    onSelect?.(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionToggle: AhaRefForwardingComponent<React.ElementType, AccordionToggleProps> = React.forwardRef(
  (
    {
      className,
      eventKey,
      onClick,
      children,
      disabled,
      ...props
    }: AccordionToggleProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const onAccordionClick = useAccordionToggle(eventKey, onClick);

    return cloneElement(children, {
      'data-testid': 'accordion-toggle',
      className: classNames(
        'Accordion-toggle',
        disabled ? 'u-pointerEventsNone u-cursorNotAllow' : 'u-cursorPointer',
        className && className,
      ),
      onClick: !disabled ? onAccordionClick : null,
      ...props,
      ref,
      children,
    });
  });


export default AccordionToggle;
