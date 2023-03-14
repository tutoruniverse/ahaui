//fork react-bootstrap/src/SafeAnchor.js
import React from 'react';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import createChainedFunction from 'utils/createChainedFunction';
import {
  GenericFunction,
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from 'types/common';

type PropTypes = {
  href?: string;
  onClick?: GenericFunction;
  onKeyDown?: GenericFunction;
  disabled?: boolean;
  role?: string;
  tabIndex?: number | string;

  /**
   * this is sort of silly but needed for Button
   */

  /** @private */
  innerRef?: any;
};

function isTrivialHref(href?: string) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, DropdownItems, etc.
 */

type SafeAnchorProps<T extends React.ElementType> =
  PolymorphicComponentPropsWithRef<T, PropTypes>;

type SafeAnchorComponent =<T extends React.ElementType = 'a'>(
  props: SafeAnchorProps<T>
) => React.ReactElement | null;

export const SafeAnchor: SafeAnchorComponent = React.forwardRef(
  <T extends React.ElementType>(
    { as, ...props }: SafeAnchorProps<T>,
    ref: PolymorphicRef<T>,
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
    const mergeRefs = useMergedRefs(ref, innerRef);
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


export default SafeAnchor;
