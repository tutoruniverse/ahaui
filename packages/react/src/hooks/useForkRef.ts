import React from 'react';
import setRef from 'utils/setRef';

export default function useForkRef<T>(
  refA: React.MutableRefObject<T> | ((instance: T | null) => void) | null | undefined,
  refB: React.MutableRefObject<T> | ((instance: T | null) => void) | null | undefined
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
    return (refValue: T | null) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
