import { createRef } from 'react';
import setRef from 'utils/setRef';

describe('utils/setRef', () => {
  describe('Method setRef should run', () => {
    it('should run with ref is React Ref', () => {
      const ref = createRef();

      const testValue = 'test';
      setRef(ref, testValue);
      expect(ref.current).toBe(testValue);
    });

    it('should run with ref is function', () => {
      const ref = jest.fn();

      const testValue = {
        test: 'test',
      };

      setRef(ref, testValue);
      expect(ref).toBeCalled();
      expect(ref).toBeCalledWith(testValue);
    });
  });

  describe('Method setRef should not run', () => {
    it('should not run with ref is not React Ref or function', () => {
      const ref = 'abc';

      const testValue = 'test';
      setRef(ref, testValue);
      expect(ref.current).not.toBe(testValue);
    });
  });
});
