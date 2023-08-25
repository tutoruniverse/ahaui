import React, {
  CSSProperties,
  forwardRef,
  RefObject,
} from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, Placement, PlacementEnum, VariantColors, VariantColorsEnum } from 'types/common';

export type TooltipVariants = Extract<VariantColors, 'white' | 'black'>;

export const variantsClassName = {
  [VariantColorsEnum.black]: 'u-textWhite u-backgroundBlack',
  [VariantColorsEnum.white]: 'u-textDark u-backgroundWhite u-border',
};

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'style'> {
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
  placement?: Placement;

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
  update?: () => void;
  /** @private */
  outOfBoundaries?: boolean;
}

const Tooltip: AhaRefForwardingComponent<React.ElementType, TooltipProps> = forwardRef(
  (
    {
      id,
      variant = VariantColorsEnum.black,
      noArrow = false,
      placement = PlacementEnum.right,
      styleTooltip,
      show,
      children,
      arrowProps,
      className,
      update: _,
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
      data-test-placement={placement}
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

const TooltipWithDisplayName = Object.assign(Tooltip, {
  displayName: 'Tooltip',
});

export default TooltipWithDisplayName;
