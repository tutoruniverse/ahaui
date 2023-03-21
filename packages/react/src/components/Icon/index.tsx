import React, { LegacyRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icons, icons } from 'constants/icons';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';

const propTypes = {
  /** The icon visual name */
  name: PropTypes.string,
  /** Icon size variants */
  size: PropTypes.oneOf(['tiny', 'extraSmall', 'small', 'medium', 'large', 'extraLarge', 'extraLargePlus', 'huge']),
  /**
   * Path of SVG
   */
  path: PropTypes.string,
};
export enum IconSize {
  TINY = 'tiny',
  EXTRA_SMALL = 'extraSmall',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extraLarge',
  EXTRA_LARGE_PLUS = 'extraLargePlus',
  HUGE = 'huge',
}

const sizes: {
  [key in IconSize]: number;
} = {
  tiny: 12,
  extraSmall: 16,
  small: 24,
  medium: 32,
  large: 48,
  extraLarge: 64,
  extraLargePlus: 96,
  huge: 128,
};
const styles = {
  svg: {
    verticalAlign: 'middle',
  },
  path: {
    fill: 'currentColor',
  },
};

const defaultProps = {
  size: IconSize.SMALL,
  name: Icons.CLOUD,
};

export interface IconProps extends PrefixProps, React.SVGProps<SVGSVGElement> {
  /** The icon visual name */
  name?: Icons | string;
  /** Icon size variants */
  size?: IconSize;
  /**
   * Path of SVG
   * */
  path?: string;
}

export const Icon: RefForwardingComponent<'svg', IconProps> = React.forwardRef(
  ({ className, path, size, name, ...props }: IconProps, ref) => {
    return (
      <svg
        ref={ref as LegacyRef<SVGSVGElement>}
        {...props}
        style={{ ...styles.svg, ...props.style }}
        width={`${sizes[size]}px`}
        height={`${sizes[size]}px`}
        className={classNames('u-inlineBlock', className && className)}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          style={styles.path}
          d={icons[name] ?? path}
        />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';
Icon.defaultProps = defaultProps;
Icon.propTypes = propTypes;
