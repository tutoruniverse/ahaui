import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import { AhaRefForwardingComponent, AsProp, ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import Context from './Context';

export interface FormFileProps extends AsProp, React.InputHTMLAttributes<HTMLInputElement> {
  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  /**
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  sizeInput?: ComponentCommonSize;

  /** File name */
  fileName?: string;

  /** Custom browse button text  */
  browseText?: string;

  /**
   * Add "invalid" validation styles to the control and accompanying label
   * @default false
   * */
  isValid?: boolean;

  /**
   * Add "valid" validation styles to the control
   * @default false
   * */
  isInvalid?: boolean;

  /** Remove border all state */
  isBorderNone?: boolean;

  /** Reset background to transparent*/
  isBackgroundReset?: boolean;

  /** The underlying HTML element to use when rendering the Form.Input. */
  placeholder?: string;
}

const File: AhaRefForwardingComponent<React.ElementType, FormFileProps> = React.forwardRef(
  (
    {
      className,
      sizeInput,
      id,
      fileName,
      placeholder = '',
      browseText = 'Browse',
      isValid = false,
      isInvalid = false,
      isBorderNone = false,
      isBackgroundReset = false,
      disabled,
      as: Component = 'div',
      ...props
    }: FormFileProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const {
      sizeControl,
      controlId,
      disabledControl,
    } = useContext(Context);
    const sizeInputSet = sizeInput || sizeControl || ComponentSizeEnum.medium;
    const idSet = id || controlId;
    const isDisabled = disabled || disabledControl || false;

    warning(
      !controlId || !id,
      '`controlId` is ignored on `<Form.File>` when `id` is specified.',
    );
    return (
      <Component
        className={classNames(
          'FormInput FormInput--file',
          'u-positionRelative u-flex u-alignItemsCenter u-overflowHidden',
          sizeInputSet && `FormInput--${sizeInputSet}`,
          sizeInputSet === 'small' && 'u-text200',
          isDisabled ? 'u-cursorNotAllow u-textLight u-pointerEventsNone' : 'u-cursorPointer',
          fileName && 'is-selected',
          isValid && 'is-valid',
          isInvalid && 'is-invalid',
          isBorderNone && 'is-borderNone',
          isBackgroundReset && 'is-backgroundReset',
          className && className,
        )}
      >
        <input
          className="FormInput-file u-positionAbsolute u-widthFull u-opacityNone u-marginNone u-heightFull u-paddingNone u-positionLeft"
          type="file"
          ref={ref}
          {...props}
          id={id || controlId}
        />
        <label
          className={classNames(
            'FormInput-label u-marginBottomNone u-heightFull u-widthFull',
            isDisabled ? 'u-cursorNotAllow' : 'u-cursorPointer',
          )}
          data-browse={browseText}
          htmlFor={idSet}
        >
          {(placeholder && !fileName) && (
          <span className="u-textLight">{placeholder}</span>
          )}
          {fileName}
        </label>

      </Component>
    );
  });


export default Object.assign(File, {
  displayName: 'FormFile',
});
