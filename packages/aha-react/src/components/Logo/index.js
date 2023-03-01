import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PluginType } from 'constants/common';
import Plugins from 'utils/Plugins';

const propTypes = {
  /** The Logo visual name, should be provide via an AssetPlugin with prefix "logo" */
  name: PropTypes.string,
  /** Providing a `src` will render an `<img>` element */
  src: PropTypes.string,
  /** Providing a alt if `src` exits  */
  alt: PropTypes.string,
  /** Set the width of the logo */
  width: PropTypes.number,
  /** Set the height of the logo */
  height: PropTypes.number,
};
const defaultProps = {
  alt: 'Logo',
};
const Logo = React.forwardRef(({ className, name, src, alt, height, width, as: Component = 'div', ...props }, ref) => {
  let nameOri = name;
  let srcOri = src;
  if (srcOri) {
    nameOri = false;
  } else if (nameOri) {
    srcOri = Plugins
      .getPlugins(PluginType.ASSET)
      .traverseCall('getAsset', 'logo', nameOri)
      .find((asset) => !!asset);
  }
  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        'Logo',
        'u-inlineBlock u-fontSizeNone u-lineHeightNone',
        className && className,
      )}
    >
      {srcOri && (
        <img width={width} height={height} src={srcOri} alt={alt} className="u-maxWidthFull" />
      )}
    </Component>
  );
});

Logo.displayName = 'Logo';
Logo.defaultProps = defaultProps;
Logo.propTypes = propTypes;
export default Logo;
