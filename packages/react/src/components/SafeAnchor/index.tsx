//fork react-bootstrap/src/SafeAnchor.js
import React from 'react';
import PropTypes from 'prop-types';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import createChainedFunction from 'utils/createChainedFunction';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';

const propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  role: PropTypes.string,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * this is sort of silly but needed for Button
   */
  as: PropTypes.element,

  /** @private */
  innerRef: PropTypes.any,
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

export interface SafeAnchorProps extends PrefixProps, React.HTMLAttributes<HTMLBaseElement> {
  disabled?: boolean;
  innerRef?: React.Ref<unknown>;
  href?: string;
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */

export const SafeAnchor: RefForwardingComponent<'a', SafeAnchorProps> = React.forwardRef(
  (props: SafeAnchorProps, ref) => {
    const { as: Component = 'a', disabled, onKeyDown, innerRef } = props;
    let propsHref: any = {};
    let propsTabIndex: any = {};

    const mergeRefs = useMergedRefs(ref, innerRef);

    const handleClick = (event) => {
      const { disabled, href, onClick } = props;
      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleClick(event);
      }
    };

    if (isTrivialHref(props.href)) {
      propsHref = {
        role: props.role || 'button',
        href: props.href || '#',
      };
    }

    if (disabled) {
      propsTabIndex = {
        'tabIndex': -1,
        'aria-disabled': true,
      };
    }
    return (
      <Component
        ref={mergeRefs}
        {...props}
        {...propsHref}
        {...propsTabIndex}
        onClick={handleClick}
        onKeyDown={createChainedFunction(handleKeyDown, onKeyDown)}
      />
    );
  }
);

SafeAnchor.propTypes = propTypes;
SafeAnchor.displayName = 'SafeAnchor';
