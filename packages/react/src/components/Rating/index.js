import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useIsFocusVisible from 'hooks/useIsFocusVisible';
import useForkRef from 'hooks/useForkRef';
import Icon from 'components/Icon';

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToPrecision(value, precision) {
  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}
function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

const propTypes = {
  /**
   * If true, the rating will be disabled.
   * @default false
   * */
  disabled: PropTypes.bool,
  /** The icon to display when empty. */
  emptyIcon: PropTypes.string,
  /** The icon to display. The name can get from Component Icon */
  icon: PropTypes.string,
  /** Removes all hover effects and pointer events. */
  readOnly: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   * @controllable value
   * */
  onChange: PropTypes.func,
  /** Callback function that is fired when the hover state changes. */
  onChangeActive: PropTypes.func,
  /** @private */
  onMouseMove: PropTypes.func,
  /** @private */
  onMouseLeave: PropTypes.func,
  /** Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.*/
  getLabelText: PropTypes.func,
  /**
   * The rating value.
   * @controllable onChange
   * */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
  /** Maximum rating. */
  max: PropTypes.number,
  /** The minimum increment value change allowed. */
  precision: PropTypes.number,
  /** The name attribute of the radio `input` elements. If `readOnly` is false, the prop is required, this input name`should be unique within the parent form. */
  name: PropTypes.string,
  /** The size of the rating.*/
  size: PropTypes.oneOf(['tiny', 'extraSmall', 'small', 'medium', 'large']),
  /** Customized class name for active icon.*/
  activeIconClassName: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  readOnly: false,
  max: 5,
  icon: 'star',
  getLabelText: defaultLabelText,
  precision: 1,
  size: 'medium',
};

const Rating = React.forwardRef(
  (
    {
      className,
      readOnly,
      icon,
      emptyIcon,
      value: valueProp2 = null,
      disabled,
      max,
      size,
      name,
      activeIconClassName,
      onChange,
      onChangeActive,
      onMouseLeave,
      onMouseMove,
      getLabelText,
      precision,
      as: Component = 'span',
      ...props
    },
    ref,
  ) => {
    const valueProp = roundValueToPrecision(valueProp2, precision);
    const rootRef = useRef();
    const {
      isFocusVisible,
      onBlurVisible,
      ref: focusVisibleRef,
    } = useIsFocusVisible();
    const [focusVisible, setFocusVisible] = useState(false);
    const handleFocusRef = useForkRef(focusVisibleRef, rootRef);
    const handleRef = useForkRef(handleFocusRef, ref);
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
    const handleChange = (event) => {
      if (onChange) {
        onChange(event, parseFloat(event.target.value));
      }
    };
    const handleMouseMove = (event) => {
      if (onMouseMove) {
        onMouseMove(event);
      }
      const rootNode = rootRef.current;
      const { left } = rootNode.getBoundingClientRect();
      const { width } = rootNode.firstChild.getBoundingClientRect();
      const percent = (event.clientX - left) / (width * max);
      let newHover = roundValueToPrecision(
        max * percent + precision / 2,
        precision,
      );
      newHover = clamp(newHover, precision, max);
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
    };
    const handleMouseLeave = (event) => {
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
    const handleFocus = (event) => {
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
    const handleBlur = (event) => {
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

      if (onChangeActive && focus !== newFocus) {
        onChangeActive(event, newFocus);
      }
    };
    const item = (propsItem, state) => {
      const id = `${name}-${String(propsItem.value).replace('.', '-')}`;
      const container = (
        <Icon
          name={emptyIcon && !state.filled ? emptyIcon : icon}
          className={classNames(
            !state.filled && 'u-textGray',
            state.hover && 'is-focus',
            (state.filled || state.active)
              && (activeIconClassName || 'u-textWarning'),
          )}
          size={size}
        />
      );
      if (readOnly || disabled) {
        return (
          <div className="Rating-item" key={propsItem.value}>
            {container}
          </div>
        );
      }
      return (
        <div className="Rating-item" key={propsItem.value}>
          <label className="Rating-itemLabel u-cursorPointer" htmlFor={id}>
            {container}
            <span className="Rating-visuallyHidden u-widthMiniscule u-heightMiniscule u-positionAbsolute u-overflowHidden">
              {getLabelText(propsItem.value)}
            </span>
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
        aria-label={readOnly ? getLabelText(value) : null}
      >
        {Array.from(new Array(max)).map((_, index) => {
          const itemValue = index + 1;
          if (precision < 1) {
            const items = Array.from(new Array(1 / precision));
            return (
              <span
                className="Rating-itemDecimal u-positionRelative"
                key={itemValue}
              >
                {items.map(($, indexDecimal) => {
                  const itemDeciamlValue = roundValueToPrecision(
                    itemValue - 1 + (indexDecimal + 1) * precision,
                    precision,
                  );
                  return item(
                    { value: itemDeciamlValue },
                    {
                      filled: itemDeciamlValue <= value,
                      hover: itemDeciamlValue <= hover,
                      checked: itemDeciamlValue === valueProp,
                    },
                  );
                })}
              </span>
            );
          }
          return item(
            { value: itemValue },
            {
              active: itemValue === value && (hover !== -1 || focus !== -1),
              hover: itemValue <= hover,
              filled: itemValue <= value,
              checked: itemValue === valueProp,
            },
          );
        })}
      </Component>
    );
  },
);

Rating.displayName = 'Rating';
Rating.propTypes = propTypes;
Rating.defaultProps = defaultProps;
export default Rating;
