import React from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import { AhaRefForwardingComponent, AsProp, EnumToUnion } from 'types/common';

export enum ProgressVariantEnum {
  primary = 'primary',
  accent = 'accent',
  warning = 'warning',
  positive = 'positive',
  negative = 'negative',
}

type ProgressVariant = EnumToUnion<ProgressVariantEnum>;

export interface ProgressProps extends AsProp, React.HTMLAttributes<HTMLElement> {
  /** Sets the background class of the progress bar. */
  variant?: ProgressVariant,
  /** Current value of progress */
  now?: number,
  /** Set the height of the progress bar */
  height?: number,
  /** Show label that represents visual percentage. EG. 60% */
  label?: React.ReactNode,
  /** Custom `class` for label */
  labelClassName?: string,
  /** Change to style border */
  border?: boolean,
  /** Uses a gradient to create a striped effect. */
  striped?: boolean,
  /** Animate's the stripes from right to left */
  animated?: boolean,
}

export const variantsClassName = {
  backgroundColor: {
    [ProgressVariantEnum.primary]: 'u-backgroundPrimary',
    [ProgressVariantEnum.accent]: 'u-backgroundAccent',
    [ProgressVariantEnum.warning]: 'u-backgroundWarning',
    [ProgressVariantEnum.positive]: 'u-backgroundPositive',
    [ProgressVariantEnum.negative]: 'u-backgroundNegative',
  },
  textColor: {
    [ProgressVariantEnum.primary]: 'u-textWhite',
    [ProgressVariantEnum.accent]: 'u-textWhite',
    [ProgressVariantEnum.warning]: 'u-textDark',
    [ProgressVariantEnum.positive]: 'u-textWhite',
    [ProgressVariantEnum.negative]: 'u-textWhite',
  },
  borderColor: {
    [ProgressVariantEnum.primary]: 'u-borderPrimary',
    [ProgressVariantEnum.accent]: 'u-borderAccent',
    [ProgressVariantEnum.warning]: 'u-borderWarning',
    [ProgressVariantEnum.positive]: 'u-borderPositive',
    [ProgressVariantEnum.negative]: 'u-borderNegative',
  },
};

const Progress: AhaRefForwardingComponent<React.ElementType, ProgressProps> = React.forwardRef(
  (
    { className,
      labelClassName = 'u-text100 u-fontMedium',
      border = false,
      striped = false,
      animated = false,
      now = 100,
      height = 8,
      label = null,
      variant = ProgressVariantEnum.primary,
      as,
      ...props
    }: ProgressProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';

    return (
      <Component
        {...props}
        ref={ref}
        style={{ height }}
        className={classNames(
          'Progress',
          'u-roundedInfinity u-overflowHidden u-widthFull u-positionRelative',
          striped && 'Progress--striped',
          animated && 'Progress--animated',
          border ? `u-border ${variantsClassName.borderColor[variant]}` : 'u-backgroundUltraLight',
          className && className,
        )}
        data-testid="progress"
      >
        <div
          className={classNames(
            'Progress-bar',
            'u-heightFull u-positionRelative u-easeInOut u-duration300 u-transitionAll',
            variant && variantsClassName.backgroundColor[variant],
          )}
          style={{ width: `${now}%` }}
          data-testid="progress-bar"
        >
          {label && (
          <div
            className={classNames(
              'u-positionAbsolute u-positionCenter',
              labelClassName && labelClassName,
              variant && variantsClassName.textColor[variant],
            )}
            data-testid="progress-label"
          >
            {label}
          </div>
          )}
        </div>
      </Component>
    );
  });


const Group = createBlock('ProgressGroup u-flex u-flexNoWrap');

const ProgressCompound = Object.assign(Progress, {
  Group,
  displayName: 'Progress',
});

export default ProgressCompound;
