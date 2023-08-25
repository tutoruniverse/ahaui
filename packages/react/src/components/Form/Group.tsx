import React, { useMemo } from 'react';
import classNames from 'classnames';
import { AhaRefForwardingComponent, AsProp, ComponentCommonSize, ComponentSizeEnum } from 'types/common';
import Context, { FormContext } from './Context';

export interface FormGroupProps extends AsProp, React.HTMLAttributes<HTMLElement>, FormContext {
  /** Sets id on `<Form.Input>` and htmlFor on `<Form.Label>`. */
  controlId?: string;

  /**
   * Sets sizeInput on `<Form.Input>` and sizeLabel on `<Form.Label>`.
   * @default 'medium'
   * */
  sizeControl?: ComponentCommonSize;

  /**
   * Sets required on `<Form.Input>`.
   * @default false
   * */
  requiredControl?: boolean;
}

export const Group: AhaRefForwardingComponent<React.ElementType, FormGroupProps> = React.forwardRef(
  (
    {
      className,
      controlId,
      sizeControl = ComponentSizeEnum.medium,
      disabledControl = false,
      requiredControl = false,
      as,
      ...props
    }: FormGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const Component = as || 'div';
    const context = useMemo(() => ({
      controlId,
      sizeControl,
      requiredControl,
      disabledControl,
    }),
    [
      controlId,
      sizeControl,
      requiredControl,
      disabledControl,
    ]);
    return (
      <Context.Provider value={context}>
        <Component
          {...props}
          ref={ref}
          className={classNames(
            'FormGroup',
            'u-block u-marginBottomSmall',
            className && className,
          )}
        />
      </Context.Provider>
    );
  });

export default Object.assign(Group, {
  displayName: 'FormGroup',
});
