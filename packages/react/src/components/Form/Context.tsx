import React from 'react';
import { ButtonSize } from 'components/Button/Enum';
import { FormSize } from './Enum';

export interface FormContextInterface {
  controlId?: string;
  sizeControl?: FormSize | ButtonSize;
  requiredControl?: boolean;
  disabledControl?: boolean;
}
const Context = React.createContext<FormContextInterface>({});

export default Context;
