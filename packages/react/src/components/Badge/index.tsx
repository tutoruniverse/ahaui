import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RefForwardingComponent, PrefixProps } from 'interfaces/helpers';

export enum BadgeVariant {
  DEFAULT = 'default',
  WHITE = 'white',
  BLACK = 'black',
  PRIMARY = 'primary',
  PRIMARY_SUBTLE = 'primary_subtle',
  WARNING = 'warning',
  WARNING_SUBTLE = 'warning_subtle',
  POSITIVE = 'positive',
  POSITIVE_SUBTLE = 'positive_subtle',
  INFORMATION = 'information',
  INFORMATION_SUBTLE = 'information_subtle',
  NEGATIVE = 'negative',
  NEGATIVE_SUBTLE = 'negative_subtle',
}

const propTypes = {
  /** The Badge visual variant */
  variant: PropTypes.string,

  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`  */
  textClassName: PropTypes.string,
  /**
   * You can use a custom element type for this component.
   * @default span
   */
  as: PropTypes.elementType,
};
const defaultProps = {
  variant: BadgeVariant.DEFAULT,
};

const variantsTextClassName = {
  primary: 'u-textWhite hover:u-textWhite',
  primary_subtle: 'u-textPrimary hover:u-textPrimary',
};

const variantsClassName = {
  default: 'u-texDark hover:u-texDark u-backgroundUltraLight',
  white: 'u-textDark hover:u-textDark u-backgroundWhite',
  black: 'u-textWhite hover:u-textWhite u-backgroundBlack',
  primary: 'u-backgroundPrimary',
  primary_subtle: 'u-backgroundPrimaryLighter',
  information: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  information_subtle:
    'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  warning: 'u-textDark hover:u-textDark u-backgroundWarning',
  warning_subtle: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  positive: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  positive_subtle:
    'u-textPositive hover:u-textPositive u-backgroundPositiveLighter',
  negative: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  negative_subtle:
    'u-textNegative hover:u-textNegative u-backgroundNegativeLighter',
};

interface BadgeProps extends PrefixProps, React.HTMLAttributes<HTMLElement> {
  /** The Badge visual variant */
  variant?: BadgeVariant;
  /** Fixed className for text color, just available for variant: `primary`, `primary_subtle`  */
  textClassName?: string;
}

/**
 * A badge contains a status or a numeric value, to indicate a running tally or quantity-based summary.
 */

export const Badge: RefForwardingComponent<'span', BadgeProps> =
  React.forwardRef(
    (
      {
        className,
        textClassName,
        variant,
        as: Component = 'span',
        ...props
      }: BadgeProps,
      ref,
    ) => {
      return (
        <Component
          {...props}
          ref={ref}
          className={classNames(
            'Badge',
            'u-inlineBlock u-textCenter u-text200 u-fontMedium u-textNoWrap u-roundedInfinity hover:u-textDecorationNone',
            variant && variantsClassName[variant],
            (variant === 'primary' || variant === 'primary_subtle') &&
              textClassName
              ? textClassName
              : variantsTextClassName[variant],
            className && className,
          )}
        />
      );
    },
  );

Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps;
Badge.propTypes = propTypes;
