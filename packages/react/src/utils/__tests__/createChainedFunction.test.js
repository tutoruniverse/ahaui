import createChainedFunction from 'utils/createChainedFunction';

describe('utils/createChainedFunction', () => {
  const func1 = jest.fn();
  const func2 = jest.fn();

  it('createChainedFunction should run', () => {
    const chainedFunction = createChainedFunction(func1, func2);

    const params = ['param1', 'param2'];
    chainedFunction(...params);

    expect(func1).toBeCalled();
    expect(func1).toBeCalledWith(...params);

    expect(func2).toBeCalled();
    expect(func2).toBeCalledWith(...params);
  });

  it.each([1, 'string', [], {}, true])(
    'should throw error with param = "%s"',
    (param) => {
      expect(() => {
        createChainedFunction(func1, func2, param);
      }).toThrow(
        'Invalid Argument Type, must only provide functions, undefined, or null.',
      );
    },
  );
});
