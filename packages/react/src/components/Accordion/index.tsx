import React from 'react';
import classNames from 'classnames';
import { useUncontrolled } from 'uncontrollable';
import { AhaRefForwardingComponent, AsProp } from 'types/common';
import AccordionContext, { AccordionActiveKey, AccordionOnSelectFn, SelectableContext } from './Context';
import Toggle, { AccordionToggleProps } from './Toggle';
import Collapse from './Collapse';

export interface AccordionProps extends AsProp, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
     * The current active key that corresponds to the currently expanded card
     * @controllable onSelect
    */
  activeKey?: AccordionActiveKey;
  /**
   * Using when component is uncontrolled, decide default value for active key
   */
  defaultActiveKey?: AccordionActiveKey;
  /**
   * The select function that will be called when a card is selected
   * @controllable activeKey
   */
  onSelect?: AccordionOnSelectFn;
}

const Accordion: AhaRefForwardingComponent<React.ElementType, AccordionProps> = React.forwardRef((
  uncontrolledProps: AccordionProps,
  ref: React.ForwardedRef<HTMLElement>,
) => {
  const {
    activeKey: uncontrolledActiveKey,
    onSelect: uncontrolledOnSelect,
    defaultActiveKey,
    className,
    as,
    ...controlledProps
  } = uncontrolledProps;

  const {
    activeKey,
    onSelect,
  } = useUncontrolled({
    activeKey: uncontrolledActiveKey,
    onSelect: uncontrolledOnSelect,
    defaultActiveKey,
  }, {
    activeKey: 'onSelect',
  });

  const Component = as || 'div';

  if (!onSelect) {
    return null;
  }

  return (
    <AccordionContext.Provider value={activeKey}>
      <SelectableContext.Provider
        value={onSelect}
      >
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(
            'Accordion',
            className && className,
          )}
        />
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );
});

const AccordionCompound = Object.assign(Accordion, {
  Toggle,
  Collapse,
  displayName: 'Accordion',
});

export default AccordionCompound;
export type { AccordionToggleProps };
