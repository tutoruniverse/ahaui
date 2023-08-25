import React from 'react';

export type EnumToUnion<T> = T extends `${infer R}` ? R : never;

// UI variants
export enum ComponentSizeEnum {
  tiny = 'tiny',
  extraSmall = 'extraSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  extraLarge = 'extraLarge',
  extraLargePlus = 'extraLargePlus',
  huge = 'huge',
}

export type ComponentSize = EnumToUnion<ComponentSizeEnum>;

export type ComponentCommonSize = Extract<
  ComponentSize,
  'small' | 'medium' | 'large'
>;

export enum VariantColorsEnum {
  dark = 'dark',
  black = 'black',
  white = 'white',
  light = 'light',
  lighter = 'lighter',
  gray = 'gray',
  primary = 'primary',
  primary_subtle = 'primary_subtle',
  information = 'information',
  information_subtle = 'information_subtle',
  accent = 'accent',
  accent_subtle = 'accent_subtle',
  warning = 'warning',
  warning_subtle = 'warning_subtle',
  positive = 'positive',
  positive_subtle = 'positive_subtle',
  negative = 'negative',
  negative_subtle = 'negative_subtle',
}

export type VariantColors = EnumToUnion<VariantColorsEnum>;

export enum DirectionEnum {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type Directions = EnumToUnion<DirectionEnum>;

export enum DimensionsEnum {
  height = 'height',
  width = 'width',
}

export type Dimensions = EnumToUnion<DimensionsEnum>;

export enum DropdownDirectionEnum {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
}

export type DropdownDirection = EnumToUnion<DropdownDirectionEnum>;

export enum PlacementEnum {
  autoStart = 'auto-start',
  auto = 'auto',
  autoEnd = 'auto-end',
  topStart = 'top-start',
  top = 'top',
  topEnd = 'top-end',
  rightStart = 'right-start',
  right = 'right',
  rightEnd = 'right-end',
  bottomEnd = 'bottom-end',
  bottom = 'bottom',
  bottomStart = 'bottom-start',
  leftEnd = 'left-end',
  left = 'left',
  leftStart = 'left-start',
}

export type Placement = EnumToUnion<PlacementEnum>;

// Common props
export interface BasicProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<any>;
}

export type GenericFunction = (...args: any[]) => any;

export type MouseEvents = {
  [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends MouseEvent
  ? K
  : never;
}[keyof GlobalEventHandlersEventMap];

export type KeyboardEvents = {
  [K in keyof GlobalEventHandlersEventMap]: GlobalEventHandlersEventMap[K] extends KeyboardEvent
  ? K
  : never;
}[keyof GlobalEventHandlersEventMap];

export type EventHandler<K extends keyof HTMLElementEventMap> = (this: HTMLElement, event: HTMLElementEventMap[K]) => any;

/**
 * For Polymorphic typing.
 */

type Omit<T, U> = Pick<T, Exclude<keyof T, keyof U>>;

export interface AsProp<As extends React.ElementType = React.ElementType> {
  as?: As;
}

export type ReplaceProps<Inner extends React.ElementType, P = any> = Omit<React.ComponentPropsWithRef<Inner>, P> & P;

export class AhaComponent<
  As extends React.ElementType,
  P = unknown,
> extends React.Component<ReplaceProps<As, AsProp<As> & P>> {}

export interface AhaRefForwardingComponent<
  TInitial extends React.ElementType,
  P = unknown,
  C = React.ReactNode,
> {
  <As extends React.ElementType = TInitial>(
    props: ReplaceProps<As, AsProp<As> & P> & { children?: C },
    context?: any,
  ): React.ReactElement | null;
  displayName?: string;
}
