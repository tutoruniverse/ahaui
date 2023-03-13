import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from 'components/Icon';

const propTypes = {
  /**
   * Defines if the step is the last item displayed.
   * @private
   *  */
  isLast: PropTypes.bool,
  /**
   * Defines if the step is completed.
   * @private
   * */
  isCompleted: PropTypes.bool,
  /**
   * Defines if the step is currently active.
   * @private
   * */
  isActive: PropTypes.bool,
  /** The title of the Step. */
  title: PropTypes.string,
  /**
   * Disables the item
   * @default false
   * */
  disabled: PropTypes.bool,
};

const defaultProps = {

};

const variantCSS = {
  primary: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundPrimary',
    textDefault: 'u-textLight',
    textActive: 'u-textPrimary',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundPrimary',
  },
  accent: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundAccent',
    textDefault: 'u-textLight',
    textActive: 'u-textAccent',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundAccent',
  },
  positive: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundPositive',
    textDefault: 'u-textLight',
    textActive: 'u-textPositive',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundPositive',
  },
  warning: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundWarning',
    textDefault: 'u-textLight',
    textActive: 'u-textWarning',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundWarning',
  },
  negative: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundNegative',
    textDefault: 'u-textLight',
    textActive: 'u-textNegative',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundNegative',
  },
  white: {
    backgroundDefault: 'u-backgroundGray',
    backgroundActive: 'u-backgroundWhite',
    textDefault: 'u-textGray',
    textActive: 'u-textWhite',
    dotDefault: 'u-textLight u-backgroundGray',
    dotActive: 'u-textDark u-backgroundWhite',
  },
};

const Item = React.forwardRef(({ className, isLast, isCompleted, isActive, disabled, direction, variant, onClick, currentLabel, step, title, as: Component = 'div', ...props }, ref) => (
  <Component
    ref={ref}
    {...props}
    aria-label={title}
    className={classNames(
      'MultiSteps-item',
      'u-positionRelative',
      direction !== 'vertical' && ' u-textCenter',
      disabled ? 'u-cursorNotAllow u-pointerEventsNone' : 'u-cursorPointer',
      (isCompleted || isActive) ? variantCSS[variant].textActive : variantCSS[variant].textDefault,
      className && className,
    )}
  >
    {direction !== 'vertical' && (
    <div
      className="u-paddingBottomExtraSmall MultiSteps-label u-hidden lg:u-inlineBlock"
      onClick={disabled ? null : onClick}
    >
      {isActive ? currentLabel : title}

    </div>
    )}
    <div
      className={classNames(
        'u-positionRelative',
        direction !== 'vertical' && 'u-lineHeightNone',
        direction === 'vertical' && 'u-flex u-alignItemsCenter',
      )}
      onClick={disabled ? null : onClick}
    >
      <div
        className={classNames(
          'MultiSteps-dot',
          (isCompleted || isActive) ? variantCSS[variant].dotActive : variantCSS[variant].dotDefault,
          'u-inlineBlock u-roundedCircle u-positionRelative',
        )}
      >
        {isCompleted ? (
          <Icon name="checkmark" className="u-positionAbsolute u-positionCenter" size="extraSmall" />
        ) : (
          <span className="u-positionAbsolute u-positionCenter">{step}</span>
        )}
      </div>
      {direction !== 'vertical' && (
        !isLast && (
        <div
          className={classNames(
            'MultiSteps-line',
            isCompleted ? variantCSS[variant].backgroundActive : variantCSS[variant].backgroundDefault,
            'u-widthFull u-positionAbsolute u-positionTop-50 u-positionLeft-50',
          )}
        />
        )
      )}
      {direction === 'vertical' && (
      <div
        className="u-paddingLeftSmall  u-hidden lg:u-inlineBlock"
        onClick={disabled ? null : onClick}
      >
        {isActive ? currentLabel : title}

      </div>
      )}
    </div>
    {
        direction === 'vertical' && (
          !isLast && (
            <div
              className={classNames(
                'MultiSteps-line',
                isCompleted ? variantCSS[variant].backgroundActive : variantCSS[variant].backgroundDefault,
                'u-positionAbsolute',
              )}
            />
          )
        )
      }
  </Component>
));

Item.displayName = 'MultiStepsItem';
Item.propTypes = propTypes;
Item.defaultProps = defaultProps;
export default Item;
