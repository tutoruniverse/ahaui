import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import Icon from 'components/Icon';
import { ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import Context from './Context';

export interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: string | number;

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

  /** Remove border all state */
  isBorderNone?: boolean;

  /** Reset background to transparent*/
  isBackgroundReset?: boolean;

  /**
  * The underlying HTML element to use when rendering the Form.Select.
  * @default div
  * */
  as?: React.ElementType;
}

const Select = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({
    className,
    sizeInput,
    required,
    multiple = false,
    id,
    disabled,
    isValid = false,
    isInvalid = false,
    isBorderNone = false,
    isBackgroundReset = false,
    as,
    ...props
  }: FormSelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>,
  ) => {
    const {
      controlId,
      sizeControl,
      requiredControl,
      disabledControl,
    } = useContext(Context);

    const Component = as || 'div';

    warning(
      !controlId || !id,
      '`controlId` is ignored on `<Form.Input>` when `id` is specified.',
    );

    const sizeInputSet = sizeInput || sizeControl || ComponentSizeEnum.medium;
    const requiredSet = required || requiredControl || false;
    const disabledOri = disabled || disabledControl || false;

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
              name="arrowDown"
              size="tiny"
            />
          </div>
        )}
      </Component>
    );
  });

export default Object.assign(Select, {
  displayName: 'FormSelect',
});
