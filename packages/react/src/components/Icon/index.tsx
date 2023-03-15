import React, { ComponentPropsWithRef } from 'react';
import classNames from 'classnames';
import { icons } from 'constants/icons';
import {
  ComponentSize,
  ComponentSizeEnum,
  EnumToUnion,
} from 'types/common';
import { SizeMapping } from 'constants/common';

export enum IconNameEnum {
  rotate = 'rotate',
  gitBranch = 'gitBranch',
  options = 'options',
  apps = 'apps',
  fastForward = 'fastForward',
  mail = 'mail',
  trash = 'trash',
  helpCircle = 'helpCircle',
  helpCircleOutline = 'helpCircleOutline',
  cloudUpload = 'cloudUpload',
  location = 'location',
  send = 'send',
  share = 'share',
  unlock = 'unlock',
  volumeHigh = 'volumeHigh',
  volumeOff = 'volumeOff',
  zoomIn = 'zoomIn',
  zoomOut = 'zoomOut',
  expand = 'expand',
  minus = 'minus',
  plus = 'plus',
  column = 'column',
  data = 'data',
  table = 'table',
  cart = 'cart',
  store = 'store',
  workflow = 'workflow',
  bill = 'bill',
  bag = 'bag',
  funnel = 'funnel',
  playCircle = 'playCircle',
  pin = 'pin',
  card = 'card',
  chatExtension = 'chatExtension',
  chatBubbles = 'chatBubbles',
  bubbles = 'bubbles',
  code = 'code',
  create = 'create',
  earth = 'earth',
  flag = 'flag',
  journal = 'journal',
  levelBeginner = 'levelBeginner',
  levelImmediate = 'levelImmediate',
  levelAdvanced = 'levelAdvanced',
  list = 'list',
  lock = 'lock',
  moneyBag = 'moneyBag',
  multipleSkills = 'multipleSkills',
  power = 'power',
  refresh = 'refresh',
  replace = 'replace',
  search = 'search',
  setting = 'setting',
  speedometer = 'speedometer',
  starOutline = 'starOutline',
  starHalf = 'starHalf',
  star = 'star',
  thumbsDown = 'thumbsDown',
  thumbsUp = 'thumbsUp',
  alert = 'alert',
  informationCircle = 'informationCircle',
  informationCircleOutline = 'informationCircleOutline',
  notification = 'notification',
  warning = 'warning',
  attach = 'attach',
  attachSpreadsheet = 'attachSpreadsheet',
  attachImage = 'attachImage',
  attachPpt = 'attachPpt',
  attachTxt = 'attachTxt',
  attachSql = 'attachSql',
  attachUndefined = 'attachUndefined',
  attachCode = 'attachCode',
  cloud = 'cloud',
  cloudDownload = 'cloudDownload',
  copy = 'copy',
  document = 'document',
  images = 'images',
  videoCam = 'videoCam',
  arrowBack = 'arrowBack',
  arrowDown = 'arrowDown',
  arrowDropdownCircle = 'arrowDropdownCircle',
  arrowDropdown = 'arrowDropdown',
  arrowDropleftCircle = 'arrowDropleftCircle',
  arrowDropleft = 'arrowDropleft',
  arrowDroprightCircle = 'arrowDroprightCircle',
  arrowDropright = 'arrowDropright',
  arrowDropupCircle = 'arrowDropupCircle',
  arrowDropup = 'arrowDropup',
  arrowForward = 'arrowForward',
  arrowRoundBack = 'arrowRoundBack',
  arrowRoundDown = 'arrowRoundDown',
  arrowRoundForward = 'arrowRoundForward',
  arrowRoundUp = 'arrowRoundUp',
  arrowUp = 'arrowUp',
  checkmark = 'checkmark',
  checkmarkCircle = 'checkmarkCircle',
  checkmarkCircleOutline = 'checkmarkCircleOutline',
  close = 'close',
  closeCircle = 'closeCircle',
  closeCircleOutline = 'closeCircleOutline',
  menu = 'menu',
  more = 'more',
  facebook = 'facebook',
  google = 'google',
  instagram = 'instagram',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  hourglass = 'hourglass',
  time = 'time',
  timer = 'timer',
  contact = 'contact',
  people = 'people',
  mic = 'mic',
  calendar = 'calendar',
  micOff = 'micOff',
  videoCamOff = 'videoCamOff',
  camera = 'camera',
  airplane = 'airplane',
  screen = 'screen',
  screenOff = 'screenOff',
  map = 'map',
  raiseHand = 'raiseHand',
  editOff = 'editOff',
  edit = 'edit',
  cursor = 'cursor',
  eraser = 'eraser',
  font = 'font',
  colorPalette = 'colorPalette',
  save = 'save',
  flash = 'flash',
  aim = 'aim',
  fileTrayFull = 'fileTrayFull',
  fileImport = 'fileImport',
  fileExport = 'fileExport',
  objects = 'objects',
  reply = 'reply',
  bot = 'bot',
  shapes = 'shapes',
  return = 'return',
  umbrella = 'umbrella',
  game = 'game',
  tagCloud = 'tagCloud',
  one = 'one',
  two = 'two',
  three = 'three',
  four = 'four',
  five = 'five',
  six = 'six',
  seven = 'seven',
  eight = 'eight',
  nine = 'nine',
}

export type IconName = EnumToUnion<IconNameEnum>;

type PropTypes = {
  /** The icon visual name
   * @default "cloud"
   */
  name?: IconName;
  /** Icon size variants
   * @default "small"
   */
  size?: ComponentSize;
  /**
   * Path of SVG.
   * `Name` will have no effect if `path` is set
   */
  path?: string;
} & ComponentPropsWithRef<'svg'>;

const styles = {
  svg: {
    verticalAlign: 'middle',
  },
  path: {
    fill: 'currentColor',
  },
};

const Icon = React.forwardRef<SVGSVGElement, PropTypes>(
  (
    {
      className,
      path,
      size = ComponentSizeEnum.small,
      name = IconNameEnum.cloud,
      ...props
    },
    ref,
  ) => (
    <svg
      ref={ref}
      {...props}
      style={{ ...styles.svg, ...props.style }}
      width={`${SizeMapping[size]}px`}
      height={`${SizeMapping[size]}px`}
      className={classNames('u-inlineBlock', className && className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path style={styles.path} d={path || icons[name]} />
    </svg>
  ),
);

export default Icon;
