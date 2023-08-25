import React, { useContext } from 'react';

import CollapseBase, { CollapseProps as BaseCollapseProps } from 'components/Collapse';
import { Transition } from 'react-transition-group';
import { AhaRefForwardingComponent } from 'types/common';
import AccordionContext from './Context';

export interface CollapseProps extends BaseCollapseProps {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: string,
  /**
   * Children prop should only contain a single child, and  is enforced as such
   */
  children: React.ReactElement,
  /**
   * Children className
   */
  className?: string,
}

const Collapse: AhaRefForwardingComponent<React.ElementType, CollapseProps> = React.forwardRef(
  (
    {
      children,
      eventKey,
      ...props
    }: CollapseProps,
    ref: React.ForwardedRef<Transition<any>>,
  ) => {
    const contextEventKey = useContext(AccordionContext);
    return (
      <CollapseBase
        ref={ref}
        className="Accordion-collapse"
        in={contextEventKey === eventKey}
        {...props}
      >
        <div data-testid="accordion-collapse__content">
          {React.Children.only(children)}
        </div>
      </CollapseBase>
    );
  },
);

export default Collapse;
