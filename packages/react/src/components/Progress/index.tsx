import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';

const propTypes = {
  /** Sets the background class of the progress bar. */
  variant: PropTypes.oneOf([
    'primary',
    'accent',
    'warning',
    'positive',
    'negative',
  ]),
  /** Current value of progress */
  now: PropTypes.number,
  /** Set the height of the progress bar */
  height: PropTypes.number,
  /** Show label that represents visual percentage. EG. 60% */
  label: PropTypes.node,
  /** Custom `class` for label */
  labelClassName: PropTypes.string,
  /** Change to style border */
  border: PropTypes.bool,
  /** Uses a gradient to create a striped effect. */
  striped: PropTypes.bool,
  /** Animate's the stripes from right to left */
  animated: PropTypes.bool,
};
const defaultProps = {
  variant: 'primary',
  now: 100,
  height: 8,
  label: false,
  labelClassName: 'u-text100 u-fontMedium',
  animated: false,
  striped: false,
  border: false,
};

const variantsClassName = {
  backgroundColor: {
    primary: 'u-backgroundPrimary',
    accent: 'u-backgroundAccent',
    warning: 'u-backgroundWarning',
    positive: 'u-backgroundPositive',
    negative: 'u-backgroundNegative',
  },
  textColor: {
    primary: 'u-textWhite',
    accent: 'u-textWhite',
    warning: 'u-textDark',
    positive: 'u-textWhite',
    negative: 'u-textWhite',
  },
  borderColor: {
    primary: 'u-borderPrimary',
    accent: 'u-borderAccent',
    warning: 'u-borderWarning',
    positive: 'u-borderPositive',
    negative: 'u-borderNegative',
  },
};

const Progress = React.forwardRef(({ className, labelClassName, border, striped, animated, now, height, label, variant, as: Component = 'div', ...props }, ref) => (
  <Component
    {...props}
    ref={ref}
    style={{ height }}
    className={classNames(
      'Progress',
      'u-roundedInfinity u-overflowHidden u-widthFull u-positionRelative',
      striped && 'Progress--striped',
      animated && 'Progress--animated',
      border ? `u-border ${variantsClassName.borderColor[variant]}` : 'u-backgroundUltraLight',
      className && className
    )}
  >
    <div
      className={classNames(
        'Progress-bar',
        'u-heightFull u-positionRelative u-easeInOut u-duration300 u-transitionAll',
        variant && variantsClassName.backgroundColor[variant]
      )}
      style={{ width: `${now}%` }}
    >
      {label && (
        <div className={classNames(
          'u-positionAbsolute u-positionCenter',
          labelClassName && labelClassName,
          variant && variantsClassName.textColor[variant]
        )}
        >
          {label}
        </div>
      )}
    </div>
  </Component>
));

const Group = createBlock('ProgressGroup u-flex u-flexNoWrap');
Progress.displayName = 'Progress';
Progress.defaultProps = defaultProps;
Progress.propTypes = propTypes;
Progress.Group = Group;
export default Progress;
