// Ref: https://github.com/imbhargav5/rooks/blob/main/packages/rooks/src/hooks/useForkRef.ts
// Ref: https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useForkRef.ts

import { useMemo } from 'react';
import setRef from 'utils/setRef';

/**
 * useForkRef
 * Joins refs together and returns a combination of the two as a new ref
 */
export default function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
}
