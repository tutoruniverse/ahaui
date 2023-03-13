import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Icon from 'components/Icon';
import Context from './Context';

const propTypes = {
  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  id: PropTypes.string,
  /**
   * Make the control disabled
   * @default false
   * */
  disabled: PropTypes.bool,
  /**
   * Uses requiredControl from `<Form.Group>` if not explicitly specified.
   * @default false
   * */
  required: PropTypes.bool,
  /**
   * Input size variants
   * @default 'medium'
   * */
  sizeInput: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  /**
   * Add "valid" validation styles to the control
   * @default false
   * */
  isValid: PropTypes.bool,
  /**
   * Add "invalid" validation styles to the control and accompanying label
   * @default false
   * */
  isInvalid: PropTypes.bool,
  /** Remove border all state */
  isBorderNone: PropTypes.bool,
  /** Reset background to transparent*/
  isBackgroundReset: PropTypes.bool,
};

const defaultProps = {
};
const Select = React.forwardRef(({ className, sizeInput, required, multiple, id, type, disabled, isValid, isInvalid, isBorderNone, isBackgroundReset, as: Component = 'div', ...props }, ref) => {
  const { controlId, sizeControl, requiredControl, disabledControl } = useContext(Context);
  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<Form.Input>` when `id` is specified.',
  );
  const sizeInputSet = sizeInput || sizeControl;
  const requiredSet = required || requiredControl;
  const disabledOri = disabled || disabledControl;
  const [isFocus, setFocus] = useState(false);
  return (
    <Component
      className={classNames(
        'FormInput FormInput--select',
        'u-positionRelative u-flex u-overflowHidden',
        sizeInputSet && `FormInput--${sizeInputSet}`,
        sizeInputSet === 'small' && 'u-text200',
        disabled ? 'is-disabled u-cursorNotAllow u-textLight u-pointerEventsNone' : 'u-cursorPointer',
        isValid && 'is-valid',
        isInvalid && 'is-invalid',
        isBorderNone && 'is-borderNone',
        isBackgroundReset && 'is-backgroundReset',
        isFocus && 'is-focus',
        multiple ? 'is-multiple u-alignItemsStart' : 'u-alignItemsCenter ',
        className && className,
      )}
    >
      <select
        className={classNames(
          'FormInput-select u-widthFull u-borderNone u-backgroundTransparent u-marginLeftNone u-marginVerticalNone u-cursorPointer',
          multiple && 'u-webkitScrollbar',
        )}
        disabled={disabledOri}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        required={requiredSet}
        id={id || controlId}
        type={type}
        multiple={multiple}
        {...props}
        ref={ref}
      />
      {!multiple && (
        // TODO: fix these word-arounds
        <div className={classNames(
          'u-paddingVerticalTiny u-marginLeftTiny u-marginRightExtraSmall u-positionAbsolute u-positionRight u-pointerEventsNone',
          sizeInputSet === 'small' ? 'u-paddingHorizontalTiny' : 'u-paddingHorizontalExtraSmall',
        )}
        >
          <Icon
            className=""
            name="arrowDown"
            size="tiny"
          />
        </div>
      )}
    </Component>
  );
});
Select.displayName = 'FormSelect';
Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default Select;
