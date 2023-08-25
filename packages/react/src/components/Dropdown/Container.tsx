import React from 'react';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import classNames from 'classnames';
import usePopper, { Placement } from 'hooks/usePopper';
import useRootClose from 'hooks/useRootClose';
import createPopperConfig, { PopperOptions } from 'utils/createPopperConfig';
import { Transition } from 'react-transition-group';
import type { FadeProps } from 'components/Fade';
import {
  MouseEvents,
  DropdownDirectionEnum,
  PlacementEnum,
  AsProp,
  AhaRefForwardingComponent,
} from 'types/common';
import { useDropdownContext } from './Context';

export interface DropdownContainerProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /**
   * Custom style
   */
  additionalStyles?: React.CSSProperties;
  /**
   * Popper's `flip` modifier config.
   * @see https://popper.js.org/docs/v2/modifiers/flip/
   */
  flip?: boolean,
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   * @default {}
   */
  popperConfig?: PopperOptions['popperConfig'];
  /**
   * The DOM event name (click, mousedown, etc) that will close the dropdown
   * @default 'click'
   */
  rootCloseEvent?: MouseEvents;
  /**
   * Whether PopperJS should be used
   * @default true
   */
  shouldUsePopper?: boolean;
  /**
   * A `react-transition-group` Transition component used to animate the Message on dismissal.
   */
  transition?: React.ForwardRefExoticComponent<Pick<FadeProps, string | number> & React.RefAttributes<Transition<any>>> | null;
}

const Container: AhaRefForwardingComponent<React.ElementType, DropdownContainerProps> = React.forwardRef(
  (
    props: DropdownContainerProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const {
      additionalStyles,
      as: Component = 'div',
      flip,
      children,
      className,
      popperConfig = {},
      rootCloseEvent = 'click',
      shouldUsePopper = true,
      transition: Transition,
      ...restProps
    } = props;

    const context = useDropdownContext();
    const {
      show,
      alignRight,
      drop,
      setContainer,
      containerElement,
      toggleElement,
      toggle,
    } = useDropdownContext();

    const containerRef = useMergedRefs<HTMLDivElement | null>(ref, setContainer as (ref: HTMLElement | null) => void);

    const handleClose = (e: React.SyntheticEvent | Event) => {
      toggle(e);
    };

    let placement: Placement = alignRight ? PlacementEnum.bottomEnd : PlacementEnum.bottomStart;
    if (drop === DropdownDirectionEnum.up) placement = alignRight ? PlacementEnum.topEnd : PlacementEnum.topStart;
    else if (drop === DropdownDirectionEnum.right) placement = alignRight ? PlacementEnum.rightEnd : PlacementEnum.rightStart;
    else if (drop === DropdownDirectionEnum.left) placement = alignRight ? PlacementEnum.leftEnd : PlacementEnum.leftStart;

    const popper = usePopper(toggleElement, containerElement, createPopperConfig({
      placement,
      offset: [0, 0],
      enabled: !!(shouldUsePopper && show),
      eventsEnabled: !!show,
      flip,
      popperConfig,
    }));

    const containerProps = {
      ref: containerRef,
      style: { ...popper.styles, ...additionalStyles } as React.CSSProperties,
      'aria-labelledby': toggleElement ? toggleElement.id : undefined,
      ...restProps,
    };

    useRootClose(context.containerElement, handleClose, {
      clickTrigger: rootCloseEvent,
      disabled: !(show),
    });

    const container = (
      <Component
        {...containerProps}
        className={classNames(
          'Dropdown-container',
          'u-zIndexDropdownContainer u-backgroundWhite u-roundedMedium u-border u-positionAbsolute u-textLeft u-positionLeft u-marginVerticalTiny',
          `dropdown-${drop}`,
          className && className,
        )}
      >
        {children}
      </Component>
    );

    if (!Transition) return show ? container : null;

    return (
      <Transition unmountOnExit {...props} in={show}>
        {container}
      </Transition>
    );
  });

const ContainerWithDisplayName = Object.assign(Container, {
  displayName: 'DropdownContainer',
});

export default ContainerWithDisplayName;
