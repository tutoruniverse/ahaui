import React from 'react';

const Context = React.createContext(
  {
    controlId: undefined,
    sizeControl: undefined,
    requiredControl: undefined,
    disabledControl: undefined,
  });

export default Context;
