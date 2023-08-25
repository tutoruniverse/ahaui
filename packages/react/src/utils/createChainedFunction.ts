import { GenericFunction } from 'types/common';

const isValidFunction = (
  func: GenericFunction | null | undefined,
): func is GenericFunction => !!func;

function createChainedFunction(
  ...funcs: Array<GenericFunction | null | undefined>
): ((...args: any[]) => void) {
  return funcs
    .filter(isValidFunction)
    .reduce((acc, f) => {
      if (typeof f !== 'function') {
        throw new Error(
          'Invalid Argument Type, must only provide functions, undefined, or null.',
        );
      }

      // "acc" will be a combined function of previous functions and this loop function
      return function chainedFunction(this: any, ...args: any[]) {
        acc.apply(this, args);
        f.apply(this, args);
      };
    });
}

export default createChainedFunction;
