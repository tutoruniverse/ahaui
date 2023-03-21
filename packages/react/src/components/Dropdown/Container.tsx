import React, { useContext, useRef, Ref } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import useCallbackRef from '@restart/hooks/useCallbackRef';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import {
  usePopper,
  PopperPlacement,
  PopperDirection,
  UsePopperOptions,
  Offset,
  UsePopperState,
  Placement,
  mergeOptionsWithPopperConfig,
} from 'hooks/usePopper';
import useWrappedRefWithWarning from 'hooks/useWrappedRefWithWarning';
import { useRootClose, RootCloseOptions } from 'hooks/useRootClose';
import { DropdownContext, DropdownContextInterface } from './Context';

const propTypes = {
  /**
   * You can use a custom element type for this component.
   * @default div
   */
  as: PropTypes.elementType,
  /**
   * Custom className
   */
  className: PropTypes.string,
  /**
   * Popper's `flip` modifier config.
   * @see https://popper.js.org/docs/v2/modifiers/flip/
   */
  flip: PropTypes.bool,
  /**
   * A set of popper options and props passed directly to react-popper's Popper component.
   * @default {}
   */
  popperConfig: PropTypes.object,
  /**
   * The DOM event name (click, mousedown, etc) that will close the dropdown
   * @default click
   */
  rootCloseEvent: PropTypes.string,
  /**
   * Whether PopperJS should be used
   * @default true
   */
  shouldUsePopper: PropTypes.bool,
  /**
   * A `react-transition-group` Transition component used to animate the Message on dismissal.
   */
  transition: elementType,
  /**
   * Define an offset distance between the Container and the Toggle
   */
  offset: PropTypes.arrayOf(PropTypes.number),
};

const defaultProps = {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop: any = () => {};

export interface UseDropdownContainerOptions {
  flip?: boolean;
  show?: boolean;
  fixed?: boolean;
  alignRight?: boolean;
  shouldUsePopper?: boolean;
  offset?: Offset;
  rootCloseEvent?: RootCloseOptions['clickTrigger'];
  popperConfig?: Omit<UsePopperOptions, 'enabled' | 'placement'>;
  placement?: Placement;
}

export type UserDropdownContainerProps = Record<string, unknown> & {
  'ref': React.RefCallback<HTMLElement>;
  'style'?: React.CSSProperties;
  'aria-labelledby'?: string;
  'transition'?: React.ElementType;
};
export type UserDropdownContainerArrowProps = Record<string, any> & {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
};

export interface UseDropdownContainerMetadata {
  show: boolean;
  alignEnd?: boolean;
  hasShown: boolean;
  toggle?: DropdownContextInterface['toggle'];
  popper: UsePopperState | null;
  arrowProps: Partial<UserDropdownContainerArrowProps>;
}

export const getPopperPlacement = (drop: PopperDirection, alignRight: boolean): PopperPlacement => {
  let placement: PopperPlacement = alignRight ? PopperPlacement.BOTTOM_END : PopperPlacement.BOTTOM_START;
  if (drop === PopperDirection.UP) placement = alignRight ? PopperPlacement.TOP_END : PopperPlacement.TOP_START;
  else if (drop === PopperDirection.RIGHT)
    placement = alignRight ? PopperPlacement.RIGHT_END : PopperPlacement.RIGHT_START;
  else if (drop === PopperDirection.LEFT)
    placement = alignRight ? PopperPlacement.LEFT_END : PopperPlacement.LEFT_START;

  return placement;
};

export const useDropdownContainer = (options: UseDropdownContainerOptions = {}) => {
  const context = useContext(DropdownContext);
  const [arrowElement, attachArrowRef] = useCallbackRef<Element>();

  const hasShownRef = useRef(false);

  const {
    flip,
    offset,
    rootCloseEvent,
    fixed = false,
    popperConfig = {},
    shouldUsePopper = !!context,
    placement,
  } = options;
  const show = context.show == null ? options.show : context.show;
  if (show && !hasShownRef.current) {
    hasShownRef.current = true;
  }
  const alignRight = context.alignRight == null ? options.alignRight : context.alignRight;
  const { drop, setContainer, containerElement, toggleElement } = context;
  const handleClose = (e: React.SyntheticEvent | Event) => {
    context?.toggle(false, e);
  };
  const placementBase = placement ?? getPopperPlacement(drop, alignRight);

  const popper = usePopper(
    toggleElement,
    containerElement,
    mergeOptionsWithPopperConfig({
      placement: placementBase,
      enabled: !!(shouldUsePopper && show),
      enableEvents: show,
      offset,
      flip,
      fixed,
      arrowElement,
      popperConfig,
    })
  );
  const containerProps: UserDropdownContainerProps = {
    'ref': setContainer || noop,
    'aria-labelledby': toggleElement?.id,
    ...popper.attributes.popper,
    'style': popper.styles.popper as any,
  };

  useRootClose(context.containerElement, handleClose, {
    clickTrigger: rootCloseEvent,
    disabled: !show,
  });
  const metadata: UseDropdownContainerMetadata = {
    show,
    alignEnd: alignRight,
    hasShown: hasShownRef.current,
    toggle: context?.toggle,
    popper: shouldUsePopper ? popper : null,
    arrowProps: shouldUsePopper
      ? {
          ref: attachArrowRef,
          ...popper.attributes.arrow,
          style: popper.styles.arrow as any,
        }
      : {},
  };
  return [containerProps, metadata] as const;
};

export interface DropdownContainerProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  flip?: boolean;
  show?: boolean;
  popperConfig?: UseDropdownContainerOptions['popperConfig'];
  rootCloseEvent?: UseDropdownContainerOptions['rootCloseEvent'];
  shouldUsePopper?: UseDropdownContainerOptions['shouldUsePopper'];
  offset?: UseDropdownContainerOptions['offset'];
  transition?: React.ElementType;
}

export const Container: RefForwardingComponent<'div', DropdownContainerProps> = React.forwardRef(
  (
    {
      transition: Transition,
      flip,
      rootCloseEvent,
      show: showProps,
      shouldUsePopper,
      popperConfig,
      offset,
      className,
      as: Component = 'div',
      ...props
    }: DropdownContainerProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const context = useContext(DropdownContext);

    const { drop, alignRight } = context;

    const placementBase: Placement = getPopperPlacement(drop, alignRight);

    const offsetBase: Offset = offset ?? [0, 4];

    const [containerProps, { popper, show, toggle }] = useDropdownContainer({
      flip,
      rootCloseEvent,
      show: showProps,
      shouldUsePopper,
      offset: offsetBase ?? offset,
      popperConfig,
      placement: placementBase,
    });
    useIsomorphicEffect(() => {
      // Popper's initial position for the menu is incorrect when
      if (show) popper?.update();
    }, [show]);

    // For custom components provide additional, non-DOM, props;
    if (typeof Component !== 'string') {
      containerProps.show = show;
      containerProps.close = () => toggle?.(false);
    }

    let style = props.style;
    if (popper?.placement) {
      // we don't need the default popper style,
      // menus are display: none when not shown.
      style = { ...props.style, ...containerProps.style };
      props['x-placement'] = popper.placement;
    }

    containerProps.ref = useMergedRefs(useWrappedRefWithWarning(ref, 'DropdownMenu'), containerProps.ref);

    const container = (
      <Component
        {...props}
        {...containerProps}
        style={style}
        className={classNames(
          'Dropdown-container u-zIndexDropdownContainer u-backgroundWhite u-roundedMedium u-border u-positionAbsolute u-textLeft u-positionLeft',
          className && className
        )}
      />
    );

    if (!Transition) return show ? container : null;
    return (
      <Transition
        unmountOnExit
        ref={ref}
        {...props}
        in={show}
      >
        {container}
      </Transition>
    );
  }
);

Container.displayName = 'DropdownContainer';
Container.defaultProps = defaultProps;
Container.propTypes = propTypes;
