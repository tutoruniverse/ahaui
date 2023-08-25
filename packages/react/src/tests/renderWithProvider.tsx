import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { BasicProps } from 'types/common';

export const renderWithProvider = <P extends BasicProps, C>({
  Component,
  props,
  Provider,
  contextValue,
  ref,
}: {
  Component: React.FC<P>,
  props: P,
  Provider: React.Provider<C>,
  contextValue: C,
  ref?: React.RefObject<any>,
  }): RenderResult => {
  const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => (
    <Provider value={contextValue}>
      {children}
    </Provider>
  );

  return render((<Component {...props} ref={ref} />), { wrapper: Wrapper });
};
