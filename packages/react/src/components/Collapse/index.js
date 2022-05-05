/* eslint-disable no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import css from 'dom-helpers/css';
// import transitionEnd from 'dom-helpers/transitionEnd';
import Transition, {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import createChainedFunction from 'utils/createChainedFunction';
import triggerBrowserReflow from 'utils/triggerBrowserReflow';

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

function getDimensionValue(dimension, elem) {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];

  return (
    value
    + parseInt(css(elem, margins[0]), 10)
    + parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: 'Collapse',
  [EXITING]: 'Collapsing',
  [ENTERING]: 'Collapsing',
  [ENTERED]: 'Collapse Show',
};
const propTypes = {
  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: PropTypes.number,
  /**
   * The dimension used when collapsing, or a function that returns the dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func,
  ]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   *
   *
   * @default element.offsetWidth | element.offsetHeight
   */
  getDimensionValue: PropTypes.func,

};

const defaultProps = {
  timeout: 300,
  dimension: 'height',
  getDimensionValue,
};

const Collapse = React.forwardRef(({ className, eventKey, timeout, children, dimension, getDimensionValue, ...props }, ref) => {
  const getDimension = () => (typeof dimension === 'function'
    ? dimension()
    : dimension);
  const getScrollDimensionValue = (elem, dimension) => {
    const scroll = `scroll${dimension[0].toUpperCase()}${dimension.slice(1)}`;
    return `${elem[scroll]}px`;
  };
  // eslint-disable-next-line no-param-reassign
  const handleEnter = createChainedFunction(elem => elem.style[getDimension()] = 0);
  const handleEntering = createChainedFunction((elem) => {
    const dimension = getDimension();
    // eslint-disable-next-line no-param-reassign
    elem.style[dimension] = getScrollDimensionValue(elem, dimension);
  });
  // eslint-disable-next-line no-param-reassign
  const handleEntered = createChainedFunction(elem => elem.style[getDimension()] = null);
  const handleExit = createChainedFunction((elem) => {
    const dimension = getDimension();
    // eslint-disable-next-line no-param-reassign
    elem.style[dimension] = `${getDimensionValue(
      dimension,
      elem,
    )}px`;
    triggerBrowserReflow(elem);
  });
  // eslint-disable-next-line no-param-reassign
  const handleExiting = createChainedFunction(elem => elem.style[getDimension()] = null);
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
        ),
      })
      }
    </Transition>
  );
});
Collapse.displayName = 'Collapse';
Collapse.defaultProps = defaultProps;
Collapse.propTypes = propTypes;
export default Collapse;
