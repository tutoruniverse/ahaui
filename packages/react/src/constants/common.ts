import { ComponentSizeEnum } from 'types/common';

export enum PluginType{
  ASSET ='asset',
}

export const SizeMapping = {
  [ComponentSizeEnum.tiny]: 12,
  [ComponentSizeEnum.extraSmall]: 16,
  [ComponentSizeEnum.small]: 24,
  [ComponentSizeEnum.medium]: 32,
  [ComponentSizeEnum.large]: 48,
  [ComponentSizeEnum.extraLarge]: 64,
  [ComponentSizeEnum.extraLargePlus]: 96,
  [ComponentSizeEnum.huge]: 128,
};

export const KeyCharacter = {
  ALT: 'Alt',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  BACKSPACE: 'Backspace',
  CAPS_LOCK: 'CapsLock',
  CURLY_BRACKET: '{',
  DOLLAR: '$',
  ENTER: 'Enter',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  SHIFT: 'Shift',
  META: 'Meta',
  DOT: '.',
  SPACE: ' ',
} as const;
