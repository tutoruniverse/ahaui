import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Collapse as CollapseBase, CollapseProps } from 'components/Collapse';
import { AccordionContext, isAccordionItemSelected } from './Context';
import { RefForwardingComponent } from 'interfaces/helpers';

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,
  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element.isRequired,
};

export interface AccordionCollapseProps extends CollapseProps {
  eventKey: string;
}

export const Collapse = React.forwardRef<Transition<any>, AccordionCollapseProps>(
  ({ children, eventKey, as: Component = 'div', ...props }, ref) => {
    const { activeEventKey } = useContext(AccordionContext);

    return (
      <CollapseBase
        ref={ref}
        className="Accordion-collapse"
        in={isAccordionItemSelected(activeEventKey, eventKey)}
        {...props}
      >
        <Component>{React.Children.only(children)}</Component>
      </CollapseBase>
    );
  }
);
Collapse.displayName = 'AccordionCollapse';
Collapse.defaultProps = {};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Collapse.propTypes = propTypes;
