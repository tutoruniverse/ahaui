import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';
import { AsProp, DirectionEnum, EnumToUnion } from 'types/common';

export enum MultiStepsVariantEnum {
  primary = 'primary',
  accent = 'accent',
  positive = 'positive',
  warning = 'warning',
  negative = 'negative',
  white = 'white',
}

export type MultiStepsVariant = EnumToUnion<MultiStepsVariantEnum>;

export interface MultiStepsItemProps extends AsProp, React.HTMLAttributes<HTMLElement> {
   /**
   * Defines if the step is the last item displayed.
   * @private
   *  */
  isLast?: boolean;

  /**
   * Defines if the step is completed.
   * @private
   * */
  isCompleted?: boolean;

  /**
   * Defines if the step is currently active.
   * @private
   * */
  isActive?: boolean;

  /** The title of the Step. */
  title: string;

  /**
   * Disables the item
   * @default false
   * */
  disabled?: boolean;

  variant?: MultiStepsVariant;

  onClick?: MouseEventHandler<HTMLDivElement>;

  direction?: DirectionEnum;

  /**
   * Defines the step.
   * */
  step?: number,
  /** Custom current label */
  currentLabel?: string,
}

export const multiStepsVariantStyle = {
  [MultiStepsVariantEnum.primary]: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundPrimary',
    textDefault: 'u-textLight',
    textActive: 'u-textPrimary',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundPrimary',
  },
  [MultiStepsVariantEnum.accent]: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundAccent',
    textDefault: 'u-textLight',
    textActive: 'u-textAccent',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundAccent',
  },
  [MultiStepsVariantEnum.positive]: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundPositive',
    textDefault: 'u-textLight',
    textActive: 'u-textPositive',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundPositive',
  },
  [MultiStepsVariantEnum.warning]: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundWarning',
    textDefault: 'u-textLight',
    textActive: 'u-textWarning',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundWarning',
  },
  [MultiStepsVariantEnum.negative]: {
    backgroundDefault: 'u-backgroundUltraLight',
    backgroundActive: 'u-backgroundNegative',
    textDefault: 'u-textLight',
    textActive: 'u-textNegative',
    dotDefault: 'u-textLight u-backgroundUltraLight',
    dotActive: 'u-textWhite u-backgroundNegative',
  },
  [MultiStepsVariantEnum.white]: {
    backgroundDefault: 'u-backgroundGray',
    backgroundActive: 'u-backgroundWhite',
    textDefault: 'u-textGray',
    textActive: 'u-textWhite',
    dotDefault: 'u-textLight u-backgroundGray',
    dotActive: 'u-textDark u-backgroundWhite',
  },
};

const Item = React.forwardRef(
  (
    { className,
      isLast,
      isCompleted,
      isActive,
      disabled = false,
      direction = DirectionEnum.horizontal,
      variant = MultiStepsVariantEnum.primary,
      onClick,
      currentLabel,
      step,
      title,
      as,
      ...props
    }: MultiStepsItemProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        {...props}
        aria-label={title}
        className={classNames(
          'MultiSteps-item',
          'u-positionRelative',
          direction !== DirectionEnum.vertical && ' u-textCenter',
          disabled ? 'u-cursorNotAllow u-pointerEventsNone' : 'u-cursorPointer',
          (isCompleted || isActive) ? multiStepsVariantStyle[variant].textActive : multiStepsVariantStyle[variant].textDefault,
          className && className,
        )}
      >
        {direction !== DirectionEnum.vertical && (
          <div
            className="MultiSteps-label u-paddingBottomExtraSmall u-hidden lg:u-inlineBlock"
            onClick={disabled ? undefined : onClick}
            data-testid="multi-steps-label"
          >
            {isActive ? currentLabel : title}
          </div>
        )}
        <div
          className={classNames(
            'u-positionRelative',
            direction === DirectionEnum.vertical ? 'u-flex u-alignItemsCenter' : 'u-lineHeightNone',
          )}
          onClick={disabled ? undefined : onClick}
        >
          <div
            className={classNames(
              'MultiSteps-dot',
              (isCompleted || isActive) ? multiStepsVariantStyle[variant].dotActive : multiStepsVariantStyle[variant].dotDefault,
              'u-inlineBlock u-roundedCircle u-positionRelative',
            )}
            data-testid="multi-steps-dot"
          >
            {isCompleted ? (
              <Icon name="checkmark" className="u-positionAbsolute u-positionCenter" size="extraSmall" data-testid="check-mark-icon" />
            ) : (
              <span className="u-positionAbsolute u-positionCenter">{step}</span>
            )}
          </div>
          {direction !== DirectionEnum.vertical && (
            !isLast && (
              <div
                className={classNames(
                  'MultiSteps-line',
                  isCompleted ? multiStepsVariantStyle[variant].backgroundActive : multiStepsVariantStyle[variant].backgroundDefault,
                  'u-widthFull u-positionAbsolute u-positionTop-50 u-positionLeft-50',
                )}
                data-testid="multi-steps-line"
              />
            )
          )}
          {direction === DirectionEnum.vertical && (
            <div
              className="u-paddingLeftSmall  u-hidden lg:u-inlineBlock"
              onClick={disabled ? undefined : onClick}
              data-testid="vertical-label"
            >
              {isActive ? currentLabel : title}
            </div>
          )}
        </div>
        {
        direction === DirectionEnum.vertical && (
          !isLast && (
            <div
              className={classNames(
                'MultiSteps-line',
                isCompleted ? multiStepsVariantStyle[variant].backgroundActive : multiStepsVariantStyle[variant].backgroundDefault,
                'u-positionAbsolute',
              )}
            />
          )
        )
      }
      </Component>
    );
  },
);

const MultiStepsItemWithDisplayName = Object.assign(Item, {
  displayName: 'MultiStepsItem',
});

export default MultiStepsItemWithDisplayName;
