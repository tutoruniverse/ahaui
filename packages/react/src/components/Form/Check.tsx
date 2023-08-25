import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { ComponentCommonSize, EnumToUnion, ComponentSizeEnum, AsProp, AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

export enum CheckTypeEnum {
  radio = 'radio',
  checkbox = 'checkbox',
  checkboxButton = 'checkbox_button'
}

type CheckType = EnumToUnion<CheckTypeEnum>;

export interface FormCheckProps extends AsProp, React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The type of checkable.
   */
  type?: CheckType;

  /** A HTML id attribute, necessary for proper form accessibility. */
  id?: string;

  /** Custom label  */
  label?: React.FC | string;

  /**
   * Render inline `<Form.Check>`
   * @default false
   * */
  inline?: boolean;

  /**
   * Add "valid" validation styles to the control
   * @default false
   * */
  isValid?: boolean;

  /**
   * Add "invalid" validation styles to the control and accompanying label
   * @default false
   * */
  isInvalid?: boolean;

  /**
   * Input size variants
   * @default 'medium'
   * */
  sizeInput?: ComponentCommonSize;
}

const Check: AhaRefForwardingComponent<React.ElementType, FormCheckProps> = React.forwardRef(
  (
    {
      className,
      sizeInput,
      type = CheckTypeEnum.checkbox,
      id,
      label,
      inline = false,
      isValid = false,
      isInvalid = false,
      disabled,
      as,
      ...props
    }: FormCheckProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { controlId,
      disabledControl,
      sizeControl,
    } = useContext(Context);

    const Component = as || 'div';

    warning(
      !controlId || !id,
      '`controlId` is ignored on `<Form.Check>` when `id` is specified.',
    );

    const disabledOri = disabled || disabledControl || false;
    const sizeInputSet = sizeInput || sizeControl || ComponentSizeEnum.medium;
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
          {(typeof label === 'function')
            ? label({})
            : label}
        </label>
      </Component>
    );
  });

export default Object.assign(Check, {
  displayName: 'FormCheck',
});
