import React from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp } from 'types/common';
import createBlock from '../../utils/createBlock';
import { PluginType } from '../../constants/common';
import Plugins from '../../utils/Plugins';

export interface EmptyStateProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /** The EmptyState visual name, should be provide via an AssetPlugin with prefix "emptyState" */
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

const EmptyState: AhaRefForwardingComponent<React.ElementType, EmptyStateProps> = React.forwardRef(
  (
    {
      className,
      children,
      name,
      src,
      alt = 'EmptyState',
      height,
      width = 240,
      as,
      ...props
    }: EmptyStateProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    const getSrcOri = () => {
      if (!src && name) {
        return Plugins.getPlugins(PluginType.ASSET)
          .traverseCall<string>('getAsset', 'emptyState', name)
          .find(asset => !!asset);
      }

      return src;
    };

    const srcOri = getSrcOri();

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
          <img
            width={width}
            height={height}
            src={srcOri}
            alt={alt}
            className="u-maxWidthFull"
          />
        )}
        {children}
      </Component>
    );
  },
);

const Heading = createBlock(
  'EmptyState-heading u-marginTopSmall u-text600 u-fontMedium u-textLight',
);
const Description = createBlock(
  'EmptyState-description u-marginBottomSmall u-textGray',
);

const EmptyStateComponent = Object.assign(EmptyState, {
  Heading,
  Description,
  displayName: 'EmptyState',
});

export default EmptyStateComponent;
