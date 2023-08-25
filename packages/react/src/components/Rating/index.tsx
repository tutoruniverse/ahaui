import React, { ChangeEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import useIsFocusVisible from 'hooks/useIsFocusVisible';
import useForkRef from 'hooks/useForkRef';
import Icon, { IconNameEnum } from 'components/Icon';
import { AhaRefForwardingComponent, AsProp } from 'types/common';

export function getDecimalPrecision(num: number) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

export function roundValueToPrecision(value: number | null, precision: number) {
  if (!value) {
    return 0;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

export function defaultLabelText(value: number | any) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

export function clamp(value: number, min: number, max: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

export enum RatingSize {
  tiny = 'tiny',
  extraSmall = 'extraSmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export interface RatingProps extends AsProp, Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  /**
   * If true, the rating will be disabled.
   * @default false
   * */
  disabled?: boolean;

  /** The icon to display when empty. */
  emptyIcon?: IconNameEnum;

  /** The icon to display. The name can get from Component Icon */
  icon?: IconNameEnum;

  /** Removes all hover effects and pointer events. */
  readOnly?: boolean;

  /**
   * Callback fired when the value changes.
   * @controllable value
   * */
  onChange?: (event: React.MouseEvent<Element, MouseEvent> | ChangeEvent<HTMLInputElement>, value: number) => void;

  /** Callback function that is fired when the hover state changes. */
  onChangeActive?: (event: React.MouseEvent<Element, MouseEvent> | ChangeEvent<HTMLInputElement> | React.FocusEvent<Element>, value: number) => void;

  /** @private */
  onMouseMove?: React.MouseEventHandler;

  /** @private */
  onMouseLeave?: React.MouseEventHandler;

  /** Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.*/
  getLabelText?: (value: number) => string;

  /**
   * The rating value.
   * @controllable onChange
   * */
  value?: number | null;

  /** Maximum rating. */
  max?: number;

  /** The minimum increment value change allowed. */
  precision?: number;

  /** The name attribute of the radio `input` elements. If `readOnly` is false, the prop is required, this input name`should be unique within the parent form. */
  name?: string;

  /** The size of the rating.*/
  size?: RatingSize;
}

export const Rating: AhaRefForwardingComponent<React.ElementType, RatingProps> = React.forwardRef(
  (
    {
      readOnly = false,
      disabled = false,
      icon = IconNameEnum.star,
      value: valueProp2 = null,
      size = RatingSize.medium,
      max = 5,
      precision = 1,
      getLabelText = defaultLabelText,
      className,
      emptyIcon,
      name,
      onChange,
      onChangeActive,
      onMouseLeave,
      onMouseMove,
      as,
      ...props
    }: RatingProps,
    ref: React.ForwardedRef<HTMLSpanElement>,
  ) => {
    const Component = as || 'span';

    const valueProp = roundValueToPrecision(valueProp2, precision);
    const rootRef = useRef<HTMLElement>();
    const { isFocusVisible, handleBlurVisible: onBlurVisible, ref: focusVisibleRef } = useIsFocusVisible();
    const [focusVisible, setFocusVisible] = useState(false);
    const handleFocusRef = useForkRef<unknown>(focusVisibleRef, rootRef);
    const handleRef = useForkRef<TextDecoderCommon | HTMLSpanElement>(handleFocusRef, ref);
    const [{ hover, focus }, setState] = useState({
      hover: -1,
      focus: -1,
    });

    let value = valueProp;
    if (hover !== -1) {
      value = hover;
    }
    if (focus !== -1) {
      value = focus;
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      if (onChange) {
        onChange(event, parseFloat(event.target.value));
      }
    };

    const handleMouseMove: React.MouseEventHandler = (event) => {
      if (onMouseMove) {
        onMouseMove(event);
      }

      const rootNode = rootRef.current;
      if (rootNode) {
        const { left } = rootNode.getBoundingClientRect();

        if (rootNode.firstChild) {
          const { width } = (rootNode.firstChild as Element).getBoundingClientRect();
          const percent = (event.clientX - left) / (width * max);
          let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
          newHover = clamp(newHover, precision, max); // always greater than presicion and less than max
          setState((prev) => (prev.hover === newHover && prev.focus === newHover
            ? prev
            : {
              hover: newHover,
              focus: newHover,
            }),
          );
          setFocusVisible(false);

          if (onChangeActive && hover !== newHover) {
            onChangeActive(event, newHover);
          }
        }
      }
    };

    const handleMouseLeave: React.MouseEventHandler = (event) => {
      if (onMouseLeave) {
        onMouseLeave(event);
      }

      const newHover = -1;
      setState({
        hover: newHover,
        focus: newHover,
      });

      if (onChangeActive && hover !== newHover) {
        onChangeActive(event, newHover);
      }
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
      if (isFocusVisible(event)) {
        setFocusVisible(true);
      }

      const newFocus = parseFloat(event.target.value);
      setState((prev) => ({
        hover: prev.hover,
        focus: newFocus,
      }));

      if (onChangeActive && focus !== newFocus) {
        onChangeActive(event, newFocus);
      }
    };

    const handleBlur: React.FocusEventHandler = (event) => {
      if (hover !== -1) {
        return;
      }

      if (focusVisible !== false) {
        setFocusVisible(false);
        onBlurVisible();
      }

      const newFocus = -1;
      setState((prev) => ({
        hover: prev.hover,
        focus: newFocus,
      }));

      // focus (updated from handleFocus and handleMouseMove) is always different than newFocus (-1)
      if (onChangeActive) {
        onChangeActive(event, newFocus);
      }
    };

    const renderItem = (
      propsItem: {
        value: number;
      },
      state: {
        active?: boolean;
        filled: boolean;
        hover: boolean;
        checked: boolean;
      },
    ) => {
      const id = `${name}-${String(propsItem.value).replace('.', '-')}`;
      const container = (
        <Icon
          name={emptyIcon && !state.filled ? emptyIcon : icon}
          className={classNames(
            !state.filled && 'u-textLight',
            state.hover && 'is-focus',
            (state.filled || state.active) && 'u-textWarning',
          )}
          size={size}
        />
      );
      if (readOnly || disabled) {
        return <div className="Rating-item" key={propsItem.value}>{container}</div>;
      }
      return (
        <div
          className={classNames('Rating-item', className && className)}
          key={propsItem.value}
        >
          <label className="Rating-itemLabel u-cursorPointer" htmlFor={id}>
            {container}
            <span className="Rating-visuallyHidden u-widthMiniscule u-heightMiniscule u-positionAbsolute u-overflowHidden">{getLabelText(propsItem.value)}</span>
          </label>
          <input
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={propsItem.value}
            id={id}
            type="radio"
            name={name}
            checked={state.checked}
            className="Rating-visuallyHidden u-widthMiniscule u-heightMiniscule u-positionAbsolute u-overflowHidden"
          />
        </div>
      );
    };

    return (
      <Component
        ref={handleRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
        className={classNames(
          'Rating',
          'u-positionRelative u-flexInline',
          readOnly && 'is-readOnly u-pointerEventsNone',
          disabled && 'u-opacityHalf is-disabled u-pointerEventsNone',
        )}
        aria-label={readOnly ? getLabelText(value) : undefined}
      >
        {Array.from(new Array(max)).map((_, index) => {
          const itemValue = index + 1;
          if (precision < 1) {
            const items = Array.from(new Array(1 / precision));
            return (
              <span className="Rating-itemDecimal u-positionRelative" key={itemValue}>
                {items.map(($, indexDecimal) => {
                  const itemDecimalValue = roundValueToPrecision(
                    itemValue - 1 + (indexDecimal + 1) * precision,
                    precision,
                  );

                  return renderItem({ value: itemDecimalValue }, {
                    filled: itemDecimalValue <= value,
                    hover: itemDecimalValue <= hover,
                    checked: itemDecimalValue === valueProp,
                  });
                })}
              </span>
            );
          }
          return renderItem({ value: itemValue }, {
            active: itemValue === value && (hover !== -1 || focus !== -1),
            hover: itemValue <= hover,
            filled: itemValue <= value,
            checked: itemValue === valueProp,
          });
        })}
      </Component>
    );
  });

const RatingWithDisplayName = Object.assign(Rating, {
  displayName: 'Rating',
});

export default RatingWithDisplayName;
