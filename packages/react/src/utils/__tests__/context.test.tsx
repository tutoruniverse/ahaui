import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { createContext } from '../context';

describe('utils/context', () => {
  it('should return context value', () => {
    const [useContext, Context] = createContext();
    const { result } = renderHook(() => useContext(), {
      wrapper: ({ children }) => <Context.Provider value="test value">{children}</Context.Provider>,
    });
    expect(result.current).toEqual('test value');
  });

  it('should throw no context error', () => {
    const [useContext] = createContext();
    const { result } = renderHook(() => useContext());
    expect(result.error).toEqual(Error('useContext must be inside a Provider with a value'));
  });
});
