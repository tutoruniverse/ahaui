import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Plugins from 'utils/Plugins';
import { PluginType } from 'constants/common';

const propTypes = {
  /** The Avatar visual name, should be provide via an AssetPlugin with prefix "avatar" */
  name: PropTypes.string,
  /** Avatar size variants */
  size: PropTypes.oneOf([
    'extraSmall',
    'small',
    'medium',
    'large',
    'extraLarge',
    'extraLargePlus',
    'huge',
  ]),
  /** Providing a `src` will render an `<img>` element */
  src: PropTypes.string,
  /** Providing a `text` will render an `<div>` element */
  text: PropTypes.string,
  /** Providing a alt if `src` exits  */
  alt: PropTypes.string,
  /** Set the width of the avatar */
  width: PropTypes.number,
  /** Set the height of the avatar */
  height: PropTypes.number,
  /**
   * You can use a custom element type for this component.
   * @default div
   * */
  as: PropTypes.elementType,
};

const defaultProps = {
  size: 'medium',
  alt: 'Avatar',
};

const Avatar = React.forwardRef(({ className, size, name, src, alt, height, width, text, as: Component = 'div', ...props }, ref) => {
  let nameOri = name;
  let srcOri = src;
  let textOri = text;
  if (srcOri) {
    nameOri = false;
    textOri = false;
  } else if (textOri) {
    nameOri = false;
  } else if (nameOri) {
    srcOri = Plugins
      .getPlugins(PluginType.ASSET)
      .traverseCall('getAsset', 'avatar', nameOri)
      .find((asset) => !!asset);
  }
  const heightStyle = {
    width: width && width,
    height: height && height,
  };
  const mergeProps = {
    ref,
    style: { ...props.style, ...heightStyle },
    ...props,
  };
  return (
    <Component
      {...mergeProps}
      ref={ref}
      className={classNames(
        'Avatar u-positionRelative u-block u-paddingNone u-overflowHidden',
        size && `Avatar--${size}`,
        text && 'u-roundedCircle',
        className && className,
      )}
    >
      {srcOri && (
        <img src={srcOri} alt={alt} className="u-maxWidthFull u-roundedCircle u-positionAbsolute u-borderNone u-positionFull u-widthFull u-heightFull" />
      )}
      {textOri && (
        <div className="u-lineHeightReset u-positionAbsolute u-positionCenter">{textOri}</div>
      )}
    </Component>
  );
});

Avatar.displayName = 'Avatar';
Avatar.defaultProps = defaultProps;
Avatar.propTypes = propTypes;
export default Avatar;
