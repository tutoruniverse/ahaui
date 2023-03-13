import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import Group from './Group';
import Context from '../Form/Context';

const propTypes = {
  /** The Button visual variant */
  variant: PropTypes.oneOf([
    'primary',
    'primary_outline',
    'secondary',
    'accent',
    'accent_outline',
    'positive',
    'positive_outline',
    'negative',
    'negative_outline',
    'white',
    'white_outline',
    'link',
  ]),
  /** Fixed className for text color, just available for variant: `primary`, `primary_outline`, `accent`, `accent_outline`  */
  textClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
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
  /** @private */
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
  width: 'auto',
  variant: 'primary',
};

const variantsTextClassName = {
  primary: 'u-textWhite hover:u-textWhite',
  primary_outline: 'u-textPrimary hover:u-textPrimary',
  accent: 'u-textWhite hover:u-textWhite',
  accent_outline: 'u-textAccent hover:u-textAccent',
};

const variantsClassName = {
  primary: 'u-backgroundPrimary hover:u-backgroundPrimaryDark u-border u-borderPrimary',
  primary_outline: 'u-backgroundTransparent hover:u-backgroundPrimaryLighter u-border u-borderPrimary',
  secondary: 'u-textDark hover:u-textDark u-backgroundWhite hover:u-backgroundLightest u-border',
  accent: 'u-backgroundAccent hover:u-backgroundAccentDark u-border u-borderAccent',
  accent_outline: 'u-backgroundTransparent hover:u-backgroundAccentLighter u-border u-borderAccent',
  positive: 'u-textWhite hover:u-textWhite u-backgroundPositive hover:u-backgroundPositiveDark u-border u-borderPositive',
  positive_outline: 'u-textPositive hover:u-textPositive u-backgroundTransparent hover:u-backgroundPositiveLighter u-border u-borderPositive',
  negative: 'u-textWhite hover:u-textWhite u-backgroundNegative hover:u-backgroundNegativeDark u-border u-borderNegative',
  negative_outline: 'u-textNegative hover:u-textNegative u-backgroundTransparent hover:u-backgroundNegativeLighter u-border u-borderNegative',
  white: 'u-textPrimary hover:u-textPrimary u-backgroundWhite hover:u-backgroundLightest u-border u-borderWhite',
  white_outline: 'u-textWhite hover:u-textPrimary u-backgroundTransparent hover:u-backgroundWhite u-border u-borderWhite',
  link: 'u-textPrimary hover:u-textPrimaryDark hover:u-textUnderline u-backgroundTransparent u-border u-borderTransparent', //Button--link
};
const Button = React.forwardRef(({ className, variant, textClassName, children, size, disabled, width, nonUppercase, onlyIcon, isFocus, as: Component = 'button', ...props }, ref) => {
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
        variant !== 'link' && 'hover:u-textDecorationNone',
        sizeOri && `Button--${sizeOri}`,
        (!disabledOri && variant !== 'default') && 'u-cursorPointer',
        //TODO: need active class
        disabledOri && 'is-disabled u-cursorNotAllow u-pointerEventsNone',
        width === 'min' && 'Button--minWidth',
        width === 'full' && 'u-widthFull',
        (!nonUppercase && sizeOri !== 'small') && 'u-textUppercase',
        onlyIcon && 'is-onlyIcon',
        sizeOri === 'small' && 'u-text200',
        ((variant === 'primary' || variant === 'accent' || variant === 'accent_outline' || variant === 'primary_outline') && textClassName) ? textClassName : variantsTextClassName[variant],
        className && className,
      )}
      disabled={(Component === 'button') ? disabled : undefined}
    >
      {children}
    </Component>
  );
});

const Icon = createBlock('Button-icon u-inlineBlock', { Component: 'span' });
const Label = createBlock('Button-label u-inlineBlock', { Component: 'span' });
Button.Icon = Icon;
Button.Label = Label;
Button.Group = Group;
Button.displayName = 'Button';
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
export default Button;
