import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import AccordionContext, { SelectableContext } from './Context';
import Toggle from './Toggle';
import Collapse from './Collapse';

const propTypes = {
  /**
   * The current active key that corresponds to the currently expanded card
   *
   * @controllable onSelect
  */
  activeKey: PropTypes.string,

};

const defaultProps = {

};

const Accordion = React.forwardRef(({ className, as: Component = 'div', ...props }, ref) => {
  const {
    activeKey,
    onSelect,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  return (
    <AccordionContext.Provider value={activeKey}>
      <SelectableContext.Provider value={onSelect}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames(
            'Accordion',
            className && className
          )}
        />
      </SelectableContext.Provider>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = 'Accordion';
Accordion.defaultProps = defaultProps;
Accordion.propTypes = propTypes;
Accordion.Toggle = Toggle;
Accordion.Collapse = Collapse;
export default Accordion;
