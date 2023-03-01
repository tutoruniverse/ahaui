import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  /** The visual style of the tag */
  variant: PropTypes.oneOf([
    'black',
    'white',
    'primary',
    'primary_subtle',
    'accent',
    'accent_subtle',
    'warning',
    'warning_subtle',
    'positive',
    'positive_subtle',
    'information',
    'information_subtle',
    'negative',
    'negative_subtle',
  ]),
  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`, `accent`, `accent_subtle` */
  textClassName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * You can use a custom element type for this component.
   * @default span
   * */
  as: PropTypes.elementType,
};
const defaultProps = {
  variant: 'primary',
  textClassName: '',
};


const variantsTextClassName = {
  primary: 'u-textWhite hover:u-textWhite',
  primary_subtle: 'u-textPrimary hover:u-textPrimary',
  accent: 'u-textWhite hover:u-textWhite ',
  accent_subtle: 'u-textDark hover:u-textDark ',
};

const variantsClassName = {
  black: 'u-textWhite hover:u-textWhite u-backgroundDarker',
  white: 'u-textGray hover:u-textGray u-backgroundWhite',
  primary: 'u-textWhite hover:u-textWhite u-backgroundPrimary',
  primary_subtle: 'u-textDark hover:u-textDark u-backgroundPrimaryLighter',
  information: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  information_subtle: 'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  accent: 'u-backgroundAccent',
  accent_subtle: 'u-backgroundAccentLighter',
  warning: 'u-textDark hover:u-textDark u-backgroundWarning',
  warning_subtle: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  positive: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  positive_subtle: 'u-textDark hover:u-textDark u-backgroundPositiveLighter',
  negative: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  negative_subtle: 'u-textDark hover:u-textDark u-backgroundNegativeLighter',
};

const Tag = React.forwardRef(({ className, textClassName, variant, as: Component = 'span', ...props }, ref) => (
  <Component
    {...props}
    ref={ref}
    className={classNames(
      'Tag',
      'u-flexInline u-alignItemsCenter u-textCenter u-textNoWrap u-roundedMedium u-text200 hover:u-textDecorationNone',
      variant && variantsClassName[variant],
      ((variant === 'primary' || variant === 'accent' || variant === 'primary_subtle' || variant === 'accent_subtle') && textClassName) ? textClassName : variantsTextClassName[variant],
      className && className
    )}
  />
));

Tag.displayName = 'Tag';
Tag.defaultProps = defaultProps;
Tag.propTypes = propTypes;
Tag.variantsClassName = variantsClassName;

export default Tag;
