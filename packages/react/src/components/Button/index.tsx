import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';
import { createBlock } from 'utils/createBlock';
import Context from 'components/Form/Context';
import { ButtonSize, ButtonVariant, ButtonWidth } from './Enum';
import { Group } from './Group';

const propTypes = {
  /** The Button visual variant */
  variant: PropTypes.string,
  /** Fixed className for text color, just available for variant: `primary`, `primary_outline`, `accent`, `accent_outline`  */
  textClassName: PropTypes.string,
  /**
   * Button size variants
   * @default 'medium'
   * */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  /** Render full-width or min-width 112px button */
  width: PropTypes.oneOf(['full', 'auto', 'min']),
  /** Manually set the visual state of the button to :disabled */
  disabled: PropTypes.bool,
  /**
   * You can use a custom element type for this component.
   * @default button
   * */
  as: PropTypes.elementType,
  /** @ignore */
  nonUppercase: PropTypes.bool,
  /**
   * Use when the button has only Icon
   * @default false
   * */
  onlyIcon: PropTypes.bool,
};

const defaultProps = {
  nonUppercase: false,
  disabled: false,
  width: ButtonWidth.AUTO,
  variant: ButtonVariant.PRIMARY,
};

const variantsTextClassName = {
  [ButtonVariant.PRIMARY]: 'u-textWhite hover:u-textWhite',
  [ButtonVariant.PRIMARY_OUTLINE]: 'u-textPrimary hover:u-textPrimary',
  [ButtonVariant.ACCENT]: 'u-textWhite hover:u-textWhite',
  [ButtonVariant.ACCENT_OUTLINE]: 'u-textAccent hover:u-textAccent',
};

const variantsClassName = {
  [ButtonVariant.PRIMARY]: 'u-backgroundPrimary hover:u-backgroundPrimaryDark u-border u-borderPrimary',
  [ButtonVariant.PRIMARY_OUTLINE]: 'u-backgroundTransparent hover:u-backgroundPrimaryLighter u-border u-borderPrimary',
  [ButtonVariant.SECONDARY]: 'u-textDark hover:u-textDark u-backgroundWhite hover:u-backgroundLightest u-border',
  [ButtonVariant.ACCENT]: 'u-backgroundAccent hover:u-backgroundAccentDark u-border u-borderAccent',
  [ButtonVariant.ACCENT_OUTLINE]: 'u-backgroundTransparent hover:u-backgroundAccentLighter u-border u-borderAccent',
  [ButtonVariant.POSITIVE]:
    'u-textWhite hover:u-textWhite u-backgroundPositive hover:u-backgroundPositiveDark u-border u-borderPositive',
  [ButtonVariant.POSITIVE_OUTLINE]:
    'u-textPositive hover:u-textPositive u-backgroundTransparent hover:u-backgroundPositiveLighter u-border u-borderPositive',
  [ButtonVariant.NEGATIVE]:
    'u-textWhite hover:u-textWhite u-backgroundNegative hover:u-backgroundNegativeDark u-border u-borderNegative',
  [ButtonVariant.NEGATIVE_OUTLINE]:
    'u-textNegative hover:u-textNegative u-backgroundTransparent hover:u-backgroundNegativeLighter u-border u-borderNegative',
  [ButtonVariant.WHITE]:
    'u-textPrimary hover:u-textPrimary u-backgroundWhite hover:u-backgroundLightest u-border u-borderWhite',
  [ButtonVariant.WHITE_OUTLINE]:
    'u-textWhite hover:u-textPrimary u-backgroundTransparent hover:u-backgroundWhite u-border u-borderWhite',
  [ButtonVariant.LINK]:
    'u-textPrimary hover:u-textPrimaryDark hover:u-textUnderline u-backgroundTransparent u-border u-borderTransparent', //Button--link
};

export interface ButtonProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  /** The Button visual variant */
  variant?: ButtonVariant;
  /** Fixed className for text color, just available for variant: `primary`, `primary_outline`, `accent`, `accent_outline`  */
  textClassName?: string;
  /**
   * Button size variants
   * @default 'medium'
   * */
  size?: ButtonSize;
  /** Render full-width or min-width 112px button */
  width?: ButtonWidth;
  /** Manually set the visual state of the button to :disabled */
  disabled?: boolean;
  /** @ignore */
  nonUppercase?: boolean;
  /**
   * Use when the button has only Icon
   * @default false
   * */
  onlyIcon?: boolean;
}

interface ButtonRefForwardingButtonComponent<TInitial extends React.ElementType, P = unknown>
  extends RefForwardingComponent<TInitial, P> {
  Icon?: typeof Icon;
  Label?: typeof Label;
  Group?: typeof Group;
}

export const Button: ButtonRefForwardingButtonComponent<'button', ButtonProps> = React.forwardRef(
  (
    {
      className,
      variant,
      textClassName,
      children,
      size,
      disabled,
      width,
      nonUppercase,
      onlyIcon,
      as: Component = 'button',
      ...props
    }: ButtonProps,
    ref
  ) => {
    const { sizeControl, disabledControl } = useContext(Context);
    const sizeOri = size || sizeControl;
    const disabledOri = disabled || disabledControl;
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'Button u-flexInline u-justifyContentCenter u-alignItemsCenter u-textDecorationNone u-roundedMedium u-fontMedium',
          variant && variantsClassName[variant],
          variant !== ButtonVariant.LINK && 'hover:u-textDecorationNone',
          sizeOri && `Button--${sizeOri}`,
          //TODO: need active class
          disabledOri ? 'is-disabled u-cursorNotAllow u-pointerEventsNone' : 'u-cursorPointer',
          width === ButtonWidth.MIN && 'Button--minWidth',
          width === ButtonWidth.FULL && 'u-widthFull',
          !nonUppercase && sizeOri !== ButtonSize.SMALL && 'u-textUppercase',
          onlyIcon && 'is-onlyIcon',
          sizeOri === ButtonSize.SMALL && 'u-text200',
          (variant === ButtonVariant.PRIMARY ||
            variant === ButtonVariant.ACCENT ||
            variant === ButtonVariant.ACCENT_OUTLINE ||
            variant === ButtonVariant.PRIMARY_OUTLINE) &&
            textClassName
            ? textClassName
            : variantsTextClassName[variant],
          className && className
        )}
        disabled={Component === 'button' ? disabled : undefined}
      >
        {children}
      </Component>
    );
  }
);

const Icon = createBlock('Button-icon u-inlineBlock', {
  Component: 'span',
});
const Label = createBlock('Button-label u-inlineBlock', {
  Component: 'span',
});

Button.Icon = Icon;
Button.Label = Label;
Button.Group = Group;
Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
