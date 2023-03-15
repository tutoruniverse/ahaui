import React, {
  ComponentPropsWithRef,
  CSSProperties,
  forwardRef,
  RefObject,
} from 'react';
import classNames from 'classnames';
import { EnumToUnion, VariantColors, VariantColorsEnum } from 'types/common';

export type TooltipVariants = Extract<VariantColors, 'white' | 'black'>;

export const variantsClassName = {
  [VariantColorsEnum.black]: 'u-textWhite u-backgroundBlack',
  [VariantColorsEnum.white]: 'u-textDark u-backgroundWhite u-border',
};

export enum Placement {
  autoStart = 'auto-start',
  auto = 'auto',
  autoEnd = 'auto-end',
  topStart = 'top-start',
  top = 'top',
  topEnd = 'top-end',
  rightStart = 'right-start',
  right = 'right',
  rightEnd = 'right-end',
  bottomEnd = 'bottom-end',
  bottom = 'bottom',
  bottomStart = 'bottom-start',
  leftEnd = 'left-end',
  left = 'left',
  leftStart = 'left-start',
}

type HTMLDivProps = ComponentPropsWithRef<'div'>;

interface TooltipProps extends Omit<HTMLDivProps, 'id' | 'style'> {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: string | number;
  /**
   * Remove arrow
   * @default false
   */
  noArrow?: boolean;
  /**
   * Sets the direction the Tooltip is positioned towards.
   *
   * This is generally provided by the `Overlay` component positioning the tooltip
   * @default "right"
   */
  placement?: EnumToUnion<Placement>;

  /**
   * Style for tooltip container
   */
  styleTooltip?: CSSProperties;
  /**
   * Style for tooltip's body container
   */
  style?: CSSProperties;

  /**
   * An Overlay injected set of props for positioning the tooltip arrow.
   *
   * This is generally provided by the `Overlay` component positioning the tooltip
   * @type {{ ref: ReactRef, style: CSSProperties }}
   */
  arrowProps?: {
    ref?: RefObject<HTMLDivElement>;
    style?: CSSProperties;
  };

  show?: boolean;
  /** The Tooltip visual variant
   * @default "black"
   */
  variant?: TooltipVariants;
  /** @private */
  scheduleUpdate?: () => void;
  /** @private */
  outOfBoundaries?: boolean;
}

const Tooltip = forwardRef(
  (
    {
      id,
      variant = VariantColorsEnum.black,
      noArrow = false,
      placement = Placement.right,
      styleTooltip,
      show,
      children,
      arrowProps,
      className,
      scheduleUpdate: _,
      outOfBoundaries: _1,
      ...props
    }: TooltipProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      id={id.toString()}
      ref={ref}
      {...props}
      style={styleTooltip}
      x-placement={placement}
      className={classNames(
        'Tooltip',
        variant && `Tooltip--${variant}`,
        'u-positionAbsolute u-zIndexTooltip u-roundedMedium',
        show
          ? 'u-opacityReset u-visibilityVisible'
          : 'u-opacityNone u-visibilityHidden',
        placement && `Tooltip--${placement}`,
        variant && variantsClassName[variant],
        className && className,
      )}
    >
      {!noArrow && (
        <div
          className={classNames(
            'Tooltip-arrow',
            'u-positionAbsolute',
          )}
          {...arrowProps}
        />
      )}
      <div
        style={{ ...props.style }}
        className={classNames(
          'Tooltip-body',
          'u-text200 u-paddingExtraSmall',
        )}
      >
        {children}
      </div>
    </div>
  ),
);

export default Tooltip;
