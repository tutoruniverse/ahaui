import React, { useContext } from 'react';
import classNames from 'classnames';
import warning from 'warning';
import {
  AhaRefForwardingComponent,
  AsProp,
  ComponentCommonSize,
  ComponentSizeEnum,
} from 'types/common';
import Context from './Context';

export interface FormLabelProps extends AsProp, React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Uses sizeControl from `<Form.Group>` if not explicitly specified.
   * @default 'medium'
   * */
  sizeLabel?: ComponentCommonSize;

  /**
   * Uses requiredId from `<Form.Group>` if not explicitly specified.
   * @default false
   * */
  required?: boolean;

  /** Uses controlId from `<Form.Group>` if not explicitly specified. */
  htmlFor?: string;
}

export const labelSizes: Record<ComponentCommonSize, string> = {
  small: 'u-text200',
  medium: '',
  large: '',
};

export const Label: AhaRefForwardingComponent<'label', FormLabelProps> = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    {
      className,
      sizeLabel,
      required,
      htmlFor,
      as,
      ...props
    }: FormLabelProps,
    ref: React.ForwardedRef<HTMLLabelElement>,
  ) => {
    const {
      controlId,
      sizeControl,
      requiredControl,
    } = useContext(Context);

    const Component = as || 'label';

    warning(
      !controlId || !htmlFor,
      '`controlId` is ignored on `<Form.Label>` when `htmlFor` is specified.',
    );

    const htmlForSet = htmlFor || controlId;
    const requiredSet = required || requiredControl || false;
    const sizeLabelSet = sizeLabel || sizeControl || ComponentSizeEnum.medium;

    return (
      <Component
        ref={ref}
        required={requiredSet}
        className={
          classNames(
            'FormLabel',
            'u-block u-marginBottomTiny',
            className && className,
            sizeLabelSet && labelSizes[sizeLabelSet],
          )
        }
        htmlFor={htmlForSet}
        {...props}
      />
    );
  });


export default Object.assign(Label, {
  displayName: 'FormLabel',
});
