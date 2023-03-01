import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { icons } from 'constants/icons';

const propTypes = {
  /** The icon visual name */
  // eslint-disable-next-line no-sparse-arrays
  name: PropTypes.oneOf([
    'rotate',
    'gitBranch',
    'options',
    'apps',
    'fastForward',
    'mail',
    'trash',
    'helpCircle',
    'helpCircleOutline',
    'cloudUpload',
    'location',
    'send',
    'share',
    'unlock',
    'volumeHigh',
    'volumeOff',
    'zoomIn',
    'zoomOut',
    'expand',
    'minus',
    'plus',
    'column',
    'data',
    'table',
    'cart',
    'store',
    'workflow',
    'bill',
    'bag',
    'funnel',
    'playCircle',
    'pin',
    'card',
    'chatExtension',
    'chatBubbles',
    'bubbles',
    'code',
    'create',
    'earth',
    'flag',
    'journal',
    'levelBeginner',
    'levelImmediate',
    'levelAdvanced',
    'list',
    'lock',
    'moneyBag',
    'multipleSkills',
    'power',
    'refresh',
    'replace',
    'search',
    'setting',
    'speedometer',
    'starOutline',
    'starHalf',
    'star',
    'thumbsDown',
    'thumbsUp',
    'alert',
    'informationCircle',
    'informationCircleOutline',
    'notification',
    'warning',
    'attach',
    'attachSpreadsheet',
    'attachImage',
    'attachPpt',
    'attachTxt',
    'attachSql',
    'attachUndefined',
    'attachCode',
    'cloud',
    'cloudDownload',
    'copy',
    'document',
    'images',
    'videoCam',
    'arrowBack',
    'arrowDown',
    'arrowDropdownCircle',
    'arrowDropdown',
    'arrowDropleftCircle',
    'arrowDropleft',
    'arrowDroprightCircle',
    'arrowDropright',
    'arrowDropupCircle',
    'arrowDropup',
    'arrowForward',
    'arrowRoundBack',
    'arrowRoundDown',
    'arrowRoundForward',
    'arrowRoundUp',
    'arrowUp',
    'checkmark',
    'checkmarkCircle',
    'checkmarkCircleOutline',
    'close',
    'closeCircle',
    'closeCircleOutline',
    'menu',
    'more',
    'facebook',
    'google',
    'instagram',
    'linkedin',
    'twitter',
    'youtube',
    'hourglass',
    'time',
    'timer',
    'contact',
    'people',
    'mic',
    'calendar',,
    'micOff',
    'videoCamOff',
    'camera',
    'airplane',
    'screen',
    'screenOff',
    'map',
    'raiseHand',
    'editOff',
    'edit',
    'cursor',
    'eraser',
    'font',
    'colorPalette',
    'save',
    'flash',
    'aim',
    'fileTrayFull',
    'fileImport',
    'fileExport',
    'objects',
    'reply',
    'bot',
    'shapes',
    'return',
    'umbrella',
    'game',
    'tagCloud',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
  ]),
  /** Icon size variants */
  size: PropTypes.oneOf([
    'tiny',
    'extraSmall',
    'small',
    'medium',
    'large',
    'extraLarge',
    'extraLargePlus',
    'huge',
  ]),
  /**
   * Path of SVG
   */
  path: PropTypes.string,
};

const defaultProps = {
  size: 'small',
  name: 'cloud',
};

const sizes = {
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

const Icon = React.forwardRef(({ className, path, size, name, ...props }, ref) => {
  const pathOri = path;
  let nameOri = name;
  if (pathOri) {
    nameOri = false;
  }
  return (
    <svg
      ref={ref}
      {...props}
      style={{ ...styles.svg, ...props.style }}
      width={`${sizes[size]}px`}
      height={`${sizes[size]}px`}
      className={classNames(
        'u-inlineBlock',
        className && className,
      )}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        style={styles.path}
        d={nameOri ? icons[name] : pathOri}
      />
    </svg>
  );
});

Icon.displayName = 'Icon';
Icon.defaultProps = defaultProps;
Icon.propTypes = propTypes;
export default Icon;
