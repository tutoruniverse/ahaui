import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PrefixProps, RefForwardingComponent } from 'interfaces/helpers';

export enum ToggleValue {
  ON = 'On',
  OFF = 'Off',
}

const propTypes = {
  /** Set the visual state of the Toggle to active */
  checked: PropTypes.bool,
  /** Disables the disabled, preventing mouse events, even if the underlying component is an `<a>` element */
  disabled: PropTypes.bool,
  /** Disable the label */
  nonLabel: PropTypes.bool,
  /** Custom label for the on-state */
  textLabelOn: PropTypes.string,
  /** Custom label for the off-state */
  textLabelOff: PropTypes.string,
  /** Custom aria label for accessibility */
  ariaLabel: PropTypes.string,
};

const defaultProps = {
  checked: false,
  disabled: false,
  nonLabel: false,
  textLabelOn: ToggleValue.ON,
  textLabelOff: ToggleValue.OFF,
  ariaLabel: 'Toggle',
};

interface ToggleProps extends PrefixProps, React.HTMLAttributes<HTMLDivElement> {
  /** Set the visual state of the Toggle to active */
  checked: boolean;
  /** Disables the disabled, preventing mouse events, even if the underlying component is an `<a>` element */
  disabled: boolean;
  /** Disable the label */
  nonLabel: boolean;
  /** Custom label for the on-state */
  textLabelOn: string;
  /** Custom label for the off-state */
  textLabelOff: string;
  /** Custom aria label for accessibility */
  ariaLabel: string;
}

export const Toggle: RefForwardingComponent<'div', ToggleProps> = React.forwardRef<any, ToggleProps>(
  (
    {
      className,
      checked,
      disabled,
      nonLabel,
      textLabelOn,
      textLabelOff,
      ariaLabel,
      as: Component = 'button',
      ...props
    },
    ref
  ) => (
    <div
      className={classNames('u-flexInline u-alignItemsCenter', className && className)}
      {...props}
      ref={ref}
    >
      <Component
        className={classNames(
          'Toggle',
          'u-positionRelative u-backgroundSemiLight u-textDark u-paddingNone u-borderNone u-cursorPointer',
          checked && 'checked u-backgroundPrimary',
          disabled && 'is-disabled u-cursorNotAllow u-pointerEventsNone'
        )}
        aria-label={ariaLabel}
        // data-label-on={!nonLabel ? textLabelOn : undefined}
        // data-label-off={!nonLabel ? textLabelOff : undefined}
        disabled={Component === 'button' ? disabled : undefined}
      >
        <div className={classNames('Toggle-handle', 'u-positionAbsolute u-backgroundWhite')} />
      </Component>
      {!nonLabel && (
        <div className={classNames('u-marginLeftExtraSmall', disabled && 'u-textLight')}>
          {checked ? textLabelOn : textLabelOff}
        </div>
      )}
    </div>
  )
);
Toggle.displayName = 'Toggle';
Toggle.defaultProps = defaultProps;
Toggle.propTypes = propTypes;
