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
  primary_subtle = 'primary_subtle≈',
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

export enum CounterVariantEnum {
  primary='primary',
  secondary='secondary',
  accent='accent',
  information='information',
  warning='warning',
  positive='positive',
  negative='negative',
  white='white',
}

export type CounterVariant = EnumToUnion<CounterVariantEnum>;

export enum DirectionEnum {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export type Directions = EnumToUnion<DirectionEnum>;

// Common props
export interface BasicProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<any>;
}

export interface BasicWithAsProps extends BasicProps {
  as?: React.ElementType;
}

export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C
}

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = Record<string, never>,
  OverrideProps = Record<string, never>
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = Record<string, never>
> = ExtendableProps<PropsOf<C>, Props>

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = Record<string, never>
> = Props extends Record<string, never> ?
InheritableElementProps<C, AsProp<C>>: InheritableElementProps<C, AsProp<C> & Props>

/**
 * Utility type to extract the `ref` prop from a polymorphic component
 */
export type PolymorphicRef<
  C extends React.ElementType
>
 = React.ComponentPropsWithRef<C>['ref']
/**
 * A wrapper of `PolymorphicComponentProps` that also includes the `ref`
 * prop for the polymorphic component
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = Record<string, never>
>
 = PolymorphicComponentProps<C, Props> & { ref?: PolymorphicRef<C> }

export type GenericFunction = (...args: any[]) => any;
