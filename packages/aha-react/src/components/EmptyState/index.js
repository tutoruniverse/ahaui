import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createBlock from '../../utils/createBlock';
import { PluginType } from '../../constants/common';
import Plugins from '../../utils/Plugins';

const propTypes = {
  /** The EmptyState visual name, should be provide via an AssetPlugin with prefix "emptyState" */
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
  width: 240,
  alt: 'EmptyState',
};
const EmptyState = React.forwardRef(({ className, children, name, src, fileType, alt, height, width, as: Component = 'div', ...props }, ref) => {
  let nameOri = name;
  let srcOri = src;
  if (srcOri) {
    nameOri = false;
  } else if (nameOri) {
    srcOri = Plugins
      .getPlugins(PluginType.ASSET)
      .traverseCall('getAsset', 'emptyState', nameOri)
      .find((asset) => !!asset);
  }
  return (
    <Component
      {...props}
      ref={ref}
      className={classNames(
        'EmptyState',
        'u-inlineBlock u-textCenter',
        className && className,
      )}
    >
      {srcOri && (
        <img width={width} height={height} src={srcOri} alt={alt} className="u-maxWidthFull" />
      )}
      {children}
    </Component>
  );
});

const Heading = createBlock('EmptyState-heading u-marginTopSmall u-text600 u-fontMedium u-textLight');
const Description = createBlock('EmptyState-description u-marginBottomSmall u-textLight');

EmptyState.Heading = Heading;
EmptyState.Description = Description;
EmptyState.displayName = 'EmptyState';
EmptyState.defaultProps = defaultProps;
EmptyState.propTypes = propTypes;
export default EmptyState;
