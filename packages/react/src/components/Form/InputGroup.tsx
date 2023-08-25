import React, { useContext } from 'react';
import classNames from 'classnames';
import createBlock from 'utils/createBlock';
import { AhaRefForwardingComponent, AsProp } from 'types/common';
import Context from './Context';

export interface FormInputGroupProps extends AsProp, React.HTMLAttributes<HTMLElement> {}

const InputGroup: AhaRefForwardingComponent<React.ElementType, FormInputGroupProps> = React.forwardRef(
  (
    {
      className,
      as,
      ...props
    }: FormInputGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { sizeControl } = useContext(Context);

    const Component = as || 'div';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          'FormInputGroup',
          'u-flex u-positionRelative u-flexWrap u-alignItemsStretch',
          sizeControl && `FormInputGroup--${sizeControl}`,
          className && className,
        )}
      />
    );
  });

const Append = createBlock('FormInputGroup-append u-flex');
const Prepend = createBlock('FormInputGroup-prepend u-flex ');
const Text = createBlock('FormInputGroup-text u-flex u-alignItemsCenter u-textGray u-textCenter u-backgroundLightest u-textNoWrap');

const CompoundInputGroup = Object.assign(
  InputGroup,
  {
    Append,
    Prepend,
    Text,
    displayName: 'InputGroup',
  });
export default CompoundInputGroup;
