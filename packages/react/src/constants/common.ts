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
