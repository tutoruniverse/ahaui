import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import warning from 'warning';
import Context from './Context';

const propTypes = {
  /**
   * The type of checkable.
   * @type {('radio' | 'checkbox' | 'checkbox_button')}
   */
  type: PropTypes.oneOf(['radio', 'checkbox', 'checkbox_button']).isRequired,
  /** A HTML id attribute, necessary for proper form accessibility. */
  id: PropTypes.string.isRequired,
  /** Custom label  */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  /**
   * Render inline `<Form.Check>`
   * @default false
   * */
  inline: PropTypes.bool,
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
  /**
   *  The underlying HTML element to use when rendering the Form.Check.
   * @default input
   */
  /**
   * Input size variants
   * @default 'medium'
   * */
  sizeInput: PropTypes.oneOf([
    'small',
    'medium',
    'large',
  ]),
  as: PropTypes.elementType,
};

const defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  type: 'checkbox',
};

const Check = React.forwardRef(({ className, sizeInput, type, id, label, inline, isValid, isInvalid, disabled, as: Component = 'div', ...props }, ref) => {
  const { controlId, disabledControl, sizeControl } = useContext(Context);

  warning(
    controlId == null || !id,
    '`controlId` is ignored on `<Form.Check>` when `id` is specified.',
  );
  const disabledOri = disabled || disabledControl;
  const sizeInputSet = sizeInput || sizeControl;
  const idSet = id || controlId;
  return (
    <Component
      className={classNames(
        'FormCheck',
        'u-positionRelative',
        inline && 'u-inlineBlock',
        sizeInputSet && `FormCheck--${sizeInputSet}`,
        sizeInputSet === 'small' ? 'u-text200' : 'u-text300',
        isValid && 'is-valid',
        isInvalid && 'is-invalid',
        !label && 'FormCheck--withoutLabel',
        type === 'checkbox_button' && 'FormCheck--button',
        className && className,
      )}
    >
      <input
        {...props}
        ref={ref}
        disabled={disabledOri}
        className="FormCheck-input u-positionAbsolute u-opacityNone"
        type={type === 'checkbox_button' ? 'checkbox' : type}
        id={idSet}
      />
      <label
        className={classNames(
          'FormCheck-label u-marginBottomNone',
          disabledOri ? 'u-cursorNotAllow u-pointerEventsNone u-textLight' : 'u-cursorPointer',
          sizeInputSet === 'small' && 'u-paddingVerticalExtraTiny',
        )}
        htmlFor={idSet}
      >
        {typeof (label) === 'function'
          ? label()
          : label}

      </label>
    </Component>
  );
});

Check.displayName = 'FormCheck';
Check.defaultProps = defaultProps;
Check.propTypes = propTypes;
export default Check;
