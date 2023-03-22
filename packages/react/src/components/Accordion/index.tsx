import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { AccordionContext, AccordionSelectCallback } from './Context';
import Toggle from './Toggle';
import { Collapse } from './Collapse';

const propTypes = {
  /** The current active key that corresponds to the currently expanded card */
  activeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: string | string[] | null, event: Object) => void
   * ```
   *
   * @controllable activeIndex
   */
  onSelect: PropTypes.func,
};

const defaultProps = {};

export interface AccordionProps extends PrefixProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  activeKey?: string;
  onSelect?: AccordionSelectCallback;
}

interface AccordionRefForwardingComponent<TInitial extends React.ElementType, P = unknown>
  extends RefForwardingComponent<TInitial, P> {
  Toggle?: typeof Toggle;
  Collapse?: typeof Collapse;
}

export const Accordion: AccordionRefForwardingComponent<'div', AccordionProps> = React.forwardRef(
  (props: AccordionProps, ref) => {
    const {
      className,
      as: Component = 'div',
      activeKey,
      onSelect,
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const contextValue = React.useMemo(
      () => ({
        activeEventKey: activeKey,
        onSelect,
      }),
      [activeKey, onSelect]
    );

    return (
      <AccordionContext.Provider value={contextValue}>
        <Component
          ref={ref}
          {...controlledProps}
          className={classNames('Accordion', className && className)}
        />
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = 'Accordion';
Accordion.defaultProps = defaultProps;
Accordion.propTypes = propTypes;
Accordion.Toggle = Toggle;
Accordion.Collapse = Collapse;
