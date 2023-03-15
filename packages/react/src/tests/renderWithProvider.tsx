import React from 'react';
import { render } from '@testing-library/react';
import { BasicProps } from 'types/common';

export const renderWithProvider = <P extends BasicProps, C>({
  Component,
  props,
  Provider,
  contextValue,
}: {
  Component: React.FC<P>,
  props: P,
  Provider: React.Provider<C>,
  contextValue: C,
}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );

  return render((<Component {...props} />), { wrapper: Wrapper });
};
