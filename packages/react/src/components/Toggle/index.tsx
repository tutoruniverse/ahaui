import React from 'react';
import classNames from 'classnames';
import { PolymorphicRef, PolymorphicComponentPropsWithRef } from 'types/common';

type ToggleProps<T extends React.ElementType> = PolymorphicComponentPropsWithRef<
T,
{
    /** Set the visual state of the Toggle to active */
    checked?: boolean,
    /** Disables the disabled, preventing mouse events, even if the underlying component is an `<a>` element */
    disabled?: boolean,
    /** Disable the label */
    nonLabel?: boolean,
    textLabelOn?: string,
    /** Custom label for the on-state */
    textLabelOff?: string,
    /** Custom aria label for accessibility */
    ariaLabel?: string
}
>;

type ToggleComponent = <T extends React.ElementType = 'button'>(props: ToggleProps<T>) => React.ReactElement | null;

const Toggle : ToggleComponent = React.forwardRef(
  <T extends React.ElementType>(
    { className,
      checked = false,
      disabled = false,
      nonLabel = false,
      textLabelOn = 'On',
      textLabelOff = 'Off',
      ariaLabel = 'Toggle',
      as,
      ...props }: ToggleProps<T>,
    ref: PolymorphicRef<T>) => {
    const Component = as || 'button';
    return (
      <div
        className={classNames(
          'u-flexInline u-alignItemsCenter',
          className && className,
        )}
        {...props}
        ref={ref}
      >
        <Component
          className={classNames(
            'Toggle',
            'u-positionRelative u-backgroundSemiLight u-textDark u-paddingNone u-borderNone u-cursorPointer',
            checked && 'checked u-backgroundPrimary',
            disabled && 'is-disabled u-cursorNotAllow u-pointerEventsNone',
          )}
          aria-label={ariaLabel}
          disabled={(Component === 'button') ? disabled : undefined}
        >
          <div className="Toggle-handle u-positionAbsolute u-backgroundWhite" />
        </Component>
        {!nonLabel && (
        <div className={classNames(
          'u-marginLeftExtraSmall',
          disabled && 'u-textLight',
        )}
        >
          {checked ? textLabelOn : textLabelOff}
        </div>
        )}
      </div>
    );
  });

export default Toggle;
