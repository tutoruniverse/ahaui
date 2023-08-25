import React from 'react';
import classNames from 'classnames';
import { PluginType } from 'constants/common';
import Plugins from 'utils/Plugins';
import { AhaRefForwardingComponent, AsProp } from 'types/common';

export interface LogoProps extends AsProp, React.HTMLAttributes<HTMLElement> {

  /** The Logo visual name, should be provide via an AssetPlugin with prefix "logo" */
  name?: string;

  /** Providing a `src` will render an `<img>` element */
  src?: string;
  /** Providing a alt if `src` exits  */
  alt?: string;
  /** Set the width of the logo */
  width?: number;
  /** Set the height of the logo */
  height?: number;
}

export const Logo: AhaRefForwardingComponent<React.ElementType, LogoProps> = React.forwardRef(
  (
    {
      className,
      name,
      src,
      alt = 'Logo',
      height,
      width,
      as,
      ...props
    }: LogoProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    const srcOri = src || (name && Plugins.getPlugins(PluginType.ASSET)
      .traverseCall('getAsset', 'logo', name)
      .find((asset) => !!asset) as string);

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
        <img
          width={width}
          height={height}
          src={srcOri}
          alt={alt}
          className="u-maxWidthFull"
        />
        )}
      </Component>
    );
  },
);

const LogoWithDisplayName = Object.assign(Logo, {
  displayName: 'Logo',
});

export default LogoWithDisplayName;
