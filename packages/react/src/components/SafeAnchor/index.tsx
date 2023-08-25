//fork react-bootstrap/src/SafeAnchor.js
import React from 'react';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import createChainedFunction from 'utils/createChainedFunction';
import {
  AhaRefForwardingComponent,
  AsProp,
} from 'types/common';

export interface SafeAnchorProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * this is sort of silly but needed for Button
   */
  href?: string;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  disabled?: boolean;
  role?: string;
  tabIndex?: number;
  /** @private */
  innerRef?: any;
}

export function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

export type SafeAnchorComponent = AhaRefForwardingComponent<React.ElementType, SafeAnchorProps>;

export const SafeAnchor: SafeAnchorComponent = React.forwardRef(
  (
    { as, ...props },
    ref: React.ForwardedRef<HTMLAnchorElement>,
  ) => {
    const handleClick = (event: React.MouseEvent) => {
      const { disabled, href, onClick } = props;
      if (disabled || isTrivialHref(href)) {
        event.preventDefault();
      }

      if (disabled) {
        event.stopPropagation();
        return;
      }

      onClick && onClick(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === ' ') {
        event.preventDefault();
        handleClick(event as unknown as React.MouseEvent);
      }
    };

    let propsHref;
    let propsTabIndex;

    const { innerRef, disabled, onKeyDown } = props;

    const Component = as || 'a';

    if (isTrivialHref(props.href)) {
      propsHref = {
        role: props.role || 'button',
        href: props.href || '#',
      };
    }

    if (disabled) {
      propsTabIndex = {
        tabIndex: -1,
        'aria-disabled': true,
      };
    }

    const mergeProps = { ...props, ...propsHref, ...propsTabIndex };

    delete mergeProps.innerRef;

    //TODO: Should check useMergedRefs with not have innerRef
    const mergeRefs = useMergedRefs<HTMLAnchorElement>(ref as any, innerRef);

    return (
      <Component
        ref={innerRef ? mergeRefs : ref}
        {...mergeProps}
        onClick={handleClick}
        onKeyDown={createChainedFunction(handleKeyDown, onKeyDown)}
      />
    );
  },
);

const SafeAnchorWithDisplayName = Object.assign(SafeAnchor, {
  displayName: 'SafeAnchor',
});

export default SafeAnchorWithDisplayName;
