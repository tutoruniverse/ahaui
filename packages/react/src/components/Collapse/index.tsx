/* eslint-disable no-return-assign */
import React from 'react';
import classNames from 'classnames';
import css from 'dom-helpers/css';
import Transition, {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  UNMOUNTED,
} from 'react-transition-group/Transition';
import createChainedFunction from 'utils/createChainedFunction';
import triggerBrowserReflow from 'utils/triggerBrowserReflow';
import { AhaRefForwardingComponent, Dimensions, DimensionsEnum } from 'types/common';
import { TransitionStatus } from 'react-transition-group';

const MARGINS = {
  height: ['marginTop', 'marginBottom'] as const,
  width: ['marginLeft', 'marginRight'] as const,
};

function defaultGetDimensionValue(dimension: Dimensions, elem: HTMLElement) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}` as 'offsetHeight' | 'offsetWidth';
  const value = elem[offset];
  const margins = MARGINS[dimension];

  return (
    value
    + parseInt(css(elem, margins[0]) as unknown as string, 10)
    + parseInt(css(elem, margins[1]) as unknown as string, 10)
  );
}

const collapseStyles: Record<TransitionStatus, string> = {
  [EXITED]: 'Collapse',
  [EXITING]: 'Collapsing',
  [ENTERING]: 'Collapsing',
  [ENTERED]: 'Collapse Show',
  [UNMOUNTED]: '',
};

export interface CollapseBaseProps extends React.HTMLAttributes<Transition<any>> {
  /**
   * Triggers the expand or collapse animation
   * @default false
   * */
  in?: boolean;
  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   * @default 300
   * */
  timeout?: number;
  /**
   * The dimension used when collapsing, or a function that returns the dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   * @default DimensionsEnum.height
   * */
  dimension?: Dimensions | (() => Dimensions);
  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   * @returns element.offsetWidth | element.offsetHeight
   * */
  getDimensionValue?: (dimension: Dimensions, elem: HTMLElement) => number;
  /**
   * The content to be collapsed
   */
  children: React.ReactElement;
}

export type CollapseProps = (
  CollapseBaseProps
  & Partial<Transition<any>>
);

const Collapse: AhaRefForwardingComponent<React.ElementType, CollapseProps> = React.forwardRef(
  (
    {
      className,
      timeout = 300,
      children,
      dimension = DimensionsEnum.height,
      getDimensionValue = defaultGetDimensionValue,
      ...props
    }: CollapseProps,
    ref: React.ForwardedRef<Transition<any>>,
  ) => {
    const getDimension = () => (typeof dimension === 'function'
      ? dimension()
      : dimension);
    const getScrollDimensionValue = (elem: HTMLElement, dimension: Dimensions) => {
      const scroll = `scroll${dimension[0].toUpperCase()}${dimension.slice(1)}` as 'scrollHeight' | 'scrollWidth';
      return `${elem[scroll]}px`;
    };
    // eslint-disable-next-line no-param-reassign
    const handleEnter = createChainedFunction((elem: HTMLElement) => elem.style[getDimension()] = '0px');
    const handleEntering = createChainedFunction((elem: HTMLElement) => {
      const dimension = getDimension();
      // eslint-disable-next-line no-param-reassign
      elem.style[dimension] = getScrollDimensionValue(elem, dimension);
    });
    // eslint-disable-next-line no-param-reassign
    const handleEntered = createChainedFunction((elem: HTMLElement) => elem.style[getDimension()] = '');
    const handleExit = createChainedFunction((elem: HTMLElement) => {
      const dimension = getDimension();
      // eslint-disable-next-line no-param-reassign
      elem.style[dimension] = `${getDimensionValue(
        dimension,
        elem,
      )}px`;
      triggerBrowserReflow(elem);
    });
    // eslint-disable-next-line no-param-reassign
    const handleExiting = createChainedFunction((elem: HTMLElement) => elem.style[getDimension()] = '');

    return (
      <Transition
        ref={ref}
        {...props}
        // addEndListener={transitionEnd}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        timeout={timeout}
      >
        {(state, innerProps) => React.cloneElement(children, {
          ...innerProps,
          className: classNames(
            className,
            children.props.className,
            collapseStyles[state],
            getDimension() === DimensionsEnum.width && 'is-dimensionWidth',
          ),
        })}
      </Transition>
    );
  });

const CollapseWithDisplayName = Object.assign(Collapse, {
  displayName: 'Collapse',
});

export default CollapseWithDisplayName;
