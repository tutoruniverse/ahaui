import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { EnumToUnion, ComponentCommonSize, ComponentSizeEnum, AsProp, AhaRefForwardingComponent } from 'types/common';
import Context from './Context';

export enum InputTypeEnum {
  button = 'button',
  checkbox = 'checkbox',
  color = 'color',
  date = 'date',
  datetimeLocal = 'datetime-local',
  email = 'email',
  file = 'file',
  hidden = 'hidden',
  image = 'image',
  month = 'month',
  number = 'number',
  password = 'password',
  radio = 'radio',
  range = 'range',
  reset = 'reset',
  search = 'search',
  submit = 'submit',
  tel = 'tel',
  text = 'text',
  time = 'time',
  url = 'url',
  week = 'week',
}

export type InputType = EnumToUnion<InputTypeEnum>;

type FormInputElement = HTMLInputElement | HTMLTextAreaElement;
export interface FormInputProps extends AsProp, React.HTMLAttributes<FormInputElement> {
  /** The HTML input type, which is only relevant if as is 'input' (the default). */
  type?: InputType;

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value?: number | string;

  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  id?: string;

  /**
   * Make the control disabled
   * @default false
   * */
  disabled?: boolean;

  /**
   * Uses requiredControl from `<Form.Group>` if not explicitly specified.
   * @default false
   * */
  required?: boolean;

  /**
   * Make the control readonly
   * @default false
   * */
  readOnly?: boolean;

  /**
   * Input size variants
   * @default 'medium'
   * */
  sizeInput?: ComponentCommonSize;

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
   * Add "warning" styles to the control and accompanying label
   * @default false
   * */
  isWarning?: boolean;

  /** Remove border all state */
  isBorderNone?: boolean;

  /** Reset background to transparent*/
  isBackgroundReset?: boolean;

  /** For textarea element */
  rows?: number;

  /** For input element */
  step?: string | number;
}

const Input: AhaRefForwardingComponent<React.ElementType, FormInputProps> = React.forwardRef(
  (
    {
      className,
      sizeInput,
      required,
      id,
      type,
      disabled,
      isValid = false,
      isInvalid = false,
      isWarning = false,
      isBorderNone = false,
      isBackgroundReset = false,
      as,
      ...props
    }: FormInputProps,
    ref: React.ForwardedRef<FormInputElement>,
  ) => {
    const {
      controlId,
      sizeControl,
      requiredControl,
      disabledControl,
    } = useContext(Context);

    warning(
      !controlId || !id,
      '`controlId` is ignored on `<Form.Input>` when `id` is specified.',
    );
    const sizeInputSet = sizeInput || sizeControl || ComponentSizeEnum.medium;
    const requiredSet = required || requiredControl || false;
    const disabledOri = disabled || disabledControl || false;
    const inputId = id || controlId;

    const Component = as || 'input';

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
          isWarning && 'is-warning',
        )}
        disabled={disabledOri}
        required={requiredSet}
        id={inputId}
        type={type}
        {...props}
        ref={ref}
      />
    );
  });

export default Object.assign(Input, {
  displayName: 'FormInput',
});
