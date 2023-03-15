import React from 'react';
import { render } from '@testing-library/react';

export const renderWithProvider = ({
  Component,
  props,
  Provider,
  contextValue,
}) => {
  render(
    <Provider value={contextValue}>
      <Component {...props} />
    </Provider>,
  );
};
