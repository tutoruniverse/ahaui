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
  [BadgeVariant.PRIMARY]: 'u-textWhite hover:u-textWhite',
  [BadgeVariant.PRIMARY_SUBTLE]: 'u-textPrimary hover:u-textPrimary',
};

const variantsClassName = {
  [BadgeVariant.DEFAULT]: 'u-texDark hover:u-texDark u-backgroundUltraLight',
  [BadgeVariant.WHITE]: 'u-textDark hover:u-textDark u-backgroundWhite',
  [BadgeVariant.BLACK]: 'u-textWhite hover:u-textWhite u-backgroundBlack',
  [BadgeVariant.PRIMARY]: 'u-backgroundPrimary',
  [BadgeVariant.PRIMARY_SUBTLE]: 'u-backgroundPrimaryLighter',
  [BadgeVariant.INFORMATION]: 'u-textWhite hover:u-textWhite u-backgroundInformation',
  [BadgeVariant.INFORMATION_SUBTLE]: 'u-textInformation hover:u-textInformation u-backgroundInformationLighter',
  [BadgeVariant.WARNING]: 'u-textDark hover:u-textDark u-backgroundWarning',
  [BadgeVariant.WARNING_SUBTLE]: 'u-textDark hover:u-textDark u-backgroundWarningLighter',
  [BadgeVariant.POSITIVE]: 'u-textWhite hover:u-textWhite u-backgroundPositive',
  [BadgeVariant.POSITIVE_SUBTLE]: 'u-textPositive hover:u-textPositive u-backgroundPositiveLighter',
  [BadgeVariant.NEGATIVE]: 'u-textWhite hover:u-textWhite u-backgroundNegative',
  [BadgeVariant.NEGATIVE_SUBTLE]: 'u-textNegative hover:u-textNegative u-backgroundNegativeLighter',
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

export const Badge: RefForwardingComponent<'span', BadgeProps> = React.forwardRef(
  ({ className, textClassName, variant, as: Component = 'span', ...props }: BadgeProps, ref) => {
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          'Badge',
          'u-inlineBlock u-textCenter u-text200 u-fontMedium u-textNoWrap u-roundedInfinity hover:u-textDecorationNone',
          variant && variantsClassName[variant],
          (variant === BadgeVariant.PRIMARY || variant === BadgeVariant.PRIMARY_SUBTLE) && textClassName
            ? textClassName
            : variantsTextClassName[variant],
          className && className
        )}
      />
    );
  }
);

Badge.displayName = 'Badge';
Badge.defaultProps = defaultProps;
Badge.propTypes = propTypes;
