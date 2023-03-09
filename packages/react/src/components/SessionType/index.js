import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/Icon';

const propTypes = {
  /** Custom label */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /** Custom label of left side */
  leftLabel: PropTypes.string,
  /**
   * The `SessionType` visual variant
   */
  variant: PropTypes.oneOf([
    'default',
    'positive',
    'warning',
    'accent',
  ]),
};

const defaultProps = {
  variant: 'default',
  leftLabel: 'Open guide',
};
const variantsClassName = {
  default: 'u-textWhite hover:u-textWhite u-backgroundLight hover:u-backgroundSemiGray',
  positive: 'u-textWhite hover:u-textWhite u-backgroundPositive hover:u-backgroundPositiveDark',
  warning: 'u-textDark hover:u-textDark u-backgroundWarning hover:u-backgroundWarningDark',
  accent: 'u-textWhite hover:u-textWhite u-backgroundAccent hover:u-backgroundAccentDark',
};
const SessionType = React.forwardRef(({ className, label, leftLabel, variant, as: Component = 'div', ...props }, ref) => (
  <Component
    ref={ref}
    {...props}
    className={classNames(
      'SessionType',
      'u-roundedMedium u-paddingExtraSmall u-flex u-alignItemsCenter u-justifyContentBetween u-cursorPointer',
      variant && variantsClassName[variant],
      className && className,
    )}
  >
    <div className="u-flexShrink0 u-flex u-alignItemsCenter">
      <Icon name="informationCircleOutline" />
      {label && (
      <span className="u-text300 u-fontMedium u-marginHorizontalExtraSmall">
        {typeof (label) === 'function'
          ? label()
          : label}
      </span>
      )}
    </div>
    <span className="u-flex u-alignItemsCenter u-textUppercase u-text100">
      {leftLabel}
      <Icon name="arrowRoundForward" className="u-marginLeftTiny" size="tiny" />
    </span>
  </Component>
));

SessionType.displayName = 'SessionType';
SessionType.defaultProps = defaultProps;
SessionType.propTypes = propTypes;
export default SessionType;
