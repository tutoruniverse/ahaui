//fork react-overlays/src/useForkRef.js
import React from 'react';
import setRef from 'utils/setRef';
import { GenericFunction } from 'types/common';

export default function useForkRef<T = any>(
  refA?: React.MutableRefObject<T> | GenericFunction,
  refB?: React.MutableRefObject<T> | GenericFunction,
) {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue: T) => {
      if (refA) {
        setRef<T>(refA, refValue);
      }

      if (refB) {
        setRef<T>(refB, refValue);
      }
    };
  }, [refA, refB]);
}
