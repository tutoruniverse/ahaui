import React, { useContext } from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import { AhaRefForwardingComponent, AsProp, ComponentCommonSize, ComponentSizeEnum, EnumToUnion } from 'types/common';
import Context from '../Form/Context';
import Group, { ButtonGroupProps } from './Group';

export enum ButtonVariantEnum {
  primary = 'primary',
  primary_outline = 'primary_outline',
  secondary = 'secondary',
  accent = 'accent',
  accent_outline = 'accent_outline',
  positive = 'positive',
  positive_outline = 'positive_outline',
  negative = 'negative',
  negative_outline = 'negative_outline',
  white = 'white',
  white_outline = 'white_outline',
  link = 'link',
  default='default'
}

export type ButtonVariant = EnumToUnion<ButtonVariantEnum>;

export enum ButtonWidthEnum {
  full = 'full',
  auto = 'auto',
  min = 'min',
}

export interface ButtonProps extends AsProp, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The Button visual variant */
  variant?: ButtonVariant;
  /** Fixed className for text color, just available for variant: `primary`, `primary_outline`, `accent`, `accent_outline`  */
  textClassName?: string[] | string;
  /**
   * Button size variants
   * @default 'medium'
   * */
  size?: ComponentCommonSize;
  /** Render full-width or min-width 112px button */
  width?: EnumToUnion<ButtonWidthEnum>;
  /** Manually set the visual state of the button to :disabled */
  disabled?: boolean;
  /** @private */
  nonUppercase?: boolean;
  /**
   * Use when the button has only Icon
   * @default false
   * */
  onlyIcon?: boolean;
}

export type VariantsTextClassName = Extract<
  ButtonVariant
  , 'primary'
  | 'primary_outline'
  | 'accent'
  | 'accent_outline'
>

export const variantsTextClassName: Record<VariantsTextClassName, string> = {
  [ButtonVariantEnum.primary]: 'u-textWhite hover:u-textWhite',
  [ButtonVariantEnum.primary_outline]: 'u-textPrimary hover:u-textPrimary',
  [ButtonVariantEnum.accent]: 'u-textWhite hover:u-textWhite',
  [ButtonVariantEnum.accent_outline]: 'u-textAccent hover:u-textAccent',
};

export const variantsClassName = {
  [ButtonVariantEnum.primary]: 'u-backgroundPrimary hover:u-backgroundPrimaryDark u-border u-borderPrimary',
  [ButtonVariantEnum.primary_outline]: 'u-backgroundTransparent hover:u-backgroundPrimaryLighter u-border u-borderPrimary',
  [ButtonVariantEnum.secondary]: 'u-textDark hover:u-textDark u-backgroundWhite hover:u-backgroundLightest u-border',
  [ButtonVariantEnum.accent]: 'u-backgroundAccent hover:u-backgroundAccentDark u-border u-borderAccent',
  [ButtonVariantEnum.accent_outline]: 'u-backgroundTransparent hover:u-backgroundAccentLighter u-border u-borderAccent',
  [ButtonVariantEnum.positive]: 'u-textWhite hover:u-textWhite u-backgroundPositive hover:u-backgroundPositiveDark u-border u-borderPositive',
  [ButtonVariantEnum.positive_outline]: 'u-textPositive hover:u-textPositive u-backgroundTransparent hover:u-backgroundPositiveLighter u-border u-borderPositive',
  [ButtonVariantEnum.negative]: 'u-textWhite hover:u-textWhite u-backgroundNegative hover:u-backgroundNegativeDark u-border u-borderNegative',
  [ButtonVariantEnum.negative_outline]: 'u-textNegative hover:u-textNegative u-backgroundTransparent hover:u-backgroundNegativeLighter u-border u-borderNegative',
  [ButtonVariantEnum.white]: 'u-textPrimary hover:u-textPrimary u-backgroundWhite hover:u-backgroundLightest u-border u-borderWhite',
  [ButtonVariantEnum.white_outline]: 'u-textWhite hover:u-textPrimary u-backgroundTransparent hover:u-backgroundWhite u-border u-borderWhite',
  [ButtonVariantEnum.link]: 'u-textPrimary hover:u-textPrimaryDark hover:u-textUnderline u-backgroundTransparent u-border u-borderTransparent', //Button--link
  [ButtonVariantEnum.default]: '',
};

export const isVariantTextClassName = (variant: ButtonVariant): variant is VariantsTextClassName => Object.keys(variantsTextClassName).includes(variant);

const Button: AhaRefForwardingComponent<React.ElementType, ButtonProps> = React.forwardRef(
  (
    {
      className,
      variant = ButtonVariantEnum.primary,
      textClassName,
      children,
      size,
      disabled,
      width = ButtonWidthEnum.auto,
      nonUppercase = false,
      onlyIcon = false,
      as,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const { sizeControl, disabledControl } = useContext(Context);
    const sizeOri = size || sizeControl || ComponentSizeEnum.medium;

    const disabledOri = disabled || disabledControl || false;

    const Component = as || 'button';

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Button u-flexInline u-justifyContentCenter u-alignItemsCenter u-textDecorationNone u-roundedMedium u-fontMedium',
          variant && variantsClassName[variant],
          variant !== ButtonVariantEnum.link && 'hover:u-textDecorationNone',
          sizeOri && `Button--${sizeOri}`,
          (!disabledOri && variant !== 'default') && 'u-cursorPointer',
          //TODO: need active class
          disabledOri && 'is-disabled u-cursorNotAllow u-pointerEventsNone',
          width === ButtonWidthEnum.min && 'Button--minWidth',
          width === ButtonWidthEnum.full && 'u-widthFull',
          (!nonUppercase && sizeOri !== ComponentSizeEnum.small) && 'u-textUppercase',
          onlyIcon && 'is-onlyIcon',
          sizeOri === ComponentSizeEnum.small && 'u-text200',
          isVariantTextClassName(variant) && (textClassName || variantsTextClassName[variant]),
          className && className,
        )}
        disabled={(Component === 'button') ? disabledOri : undefined}
      >
        {children}
      </Component>
    );
  });

const Icon = createBlock('Button-icon u-inlineBlock', { Component: 'span' });
const Label = createBlock('Button-label u-inlineBlock', { Component: 'span' });

const ButtonCompound = Object.assign(Button, {
  Icon,
  Label,
  Group,
  displayName: 'Button',
});

export default ButtonCompound;
export type { ButtonGroupProps };
