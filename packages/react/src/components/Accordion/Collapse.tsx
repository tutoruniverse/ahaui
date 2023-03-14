import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CollapseBase from 'components/Collapse';
import AccordionContext from './Context';

const propTypes = {
  /**
   * A key that corresponds to the toggler that triggers this collapse's expand or collapse.
   */
  eventKey: PropTypes.string.isRequired,
  /** Children prop should only contain a single child, and  is enforced as such */
  children: PropTypes.element.isRequired,
};

const Collapse = React.forwardRef(({ children, eventKey, ...props }, ref) => {
  const contextEventKey = useContext(AccordionContext);
  return (
    <CollapseBase
      ref={ref}
      className="Accordion-collapse"
      in={contextEventKey === eventKey}
      {...props}
    >
      <div>{React.Children.only(children)}</div>
    </CollapseBase>
  );
});
Collapse.displayName = 'AccordionCollapse';
Collapse.defaultProps = {};
Collapse.propTypes = propTypes;
export default Collapse;
