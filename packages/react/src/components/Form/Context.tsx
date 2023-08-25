import React from 'react';
import { ComponentCommonSize, ComponentSizeEnum } from 'types/common';

export interface FormContext {
  controlId?: string;
  sizeControl?: ComponentCommonSize;
  requiredControl?: boolean;
  disabledControl?: boolean;
}

const Context = React.createContext<FormContext>(
  {
    controlId: undefined,
    sizeControl: ComponentSizeEnum.medium,
    requiredControl: false,
    disabledControl: false,
  });

export default Context;
