import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Context from './Context';

const propTypes = {
  /** The HTML input type, which is only relevant if as is 'input' (the default). */
  type: PropTypes.string,
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
   * Make the control readonly
   * @default false
   * */
  readOnly: PropTypes.bool,
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
  /**
   * The underlying HTML element to use when rendering the FormControl.
   *
   * @type {('input'|'textarea')}
   * @default input
   */
  as: PropTypes.elementType,
};

const defaultProps = {
};
const Input = React.forwardRef(({ className, sizeInput, required, id, type, disabled, isValid, isInvalid, isBorderNone, isBackgroundReset, as: Component = 'input', ...props }, ref) => {
  const { controlId, sizeControl, requiredControl, disabledControl } = useContext(Context);
  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<Form.Input>` when `id` is specified.',
  );
  const sizeInputSet = sizeInput || sizeControl;
  const requiredSet = required || requiredControl;
  const disabledOri = disabled || disabledControl;
  return (
    <Component
      className={classNames(
        'FormInput',
        'u-block u-widthFull u-webkitScrollbar',
        sizeInputSet && `FormInput--${sizeInputSet}`,
        sizeInputSet === 'small' && 'u-text200',
        className && className,
        isValid && 'is-valid',
        isBorderNone && 'is-borderNone',
        isBackgroundReset && 'is-backgroundReset',
        isInvalid && 'is-invalid',
      )}
      disabled={disabledOri}
      required={requiredSet}
      id={id || controlId}
      type={type}
      {...props}
      ref={ref}
    />
  );
});
Input.displayName = 'FormInput';
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
export default Input;
