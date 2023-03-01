import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /** Set the aspect ration of the embed */
  aspectRatio: PropTypes.oneOf([
    'square',
    'classic',
    'wide',
    'cinema',
  ]),
  /** You can use a custom element type for this component. */
  as: PropTypes.elementType,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
const defaultProps = {
  aspectRatio: 'wide',
  as: 'embed',
};
const aspectRatios = {
  square: 'Media--1by1',
  classic: 'Media--4by3',
  wide: 'Media--16by9',
  cinema: 'Media--21by9',
};

const Media = React.forwardRef(({ className, aspectRatio, width, height, style, as: Component = 'embed', ...props }, ref) => {
  const mergeStyle = {
    ...props.style,
    width: width || undefined,
    height: height || undefined,
  };
  return (
    <div
      className={classNames(
        'Media',
        'u-positionRelative u-block u-paddingNone u-overflowHidden',
        aspectRatio && aspectRatios[aspectRatio],
        className && className
      )}
      style={mergeStyle}
    >
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'Media-item'
        )}
      />
    </div>
  );
});

Media.displayName = 'Media';
Media.defaultProps = defaultProps;
Media.propTypes = propTypes;
export default Media;
