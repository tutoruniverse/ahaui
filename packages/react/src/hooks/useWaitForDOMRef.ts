//fork react-overlays/src/utils/useWaitForDOMRef.js
import ownerDocument from 'dom-helpers/ownerDocument';
import { useState, useEffect } from 'react';

export type Ref =
  React.MutableRefObject<HTMLElement | null>
  | (() => React.MutableRefObject<HTMLElement | null>)
  | HTMLElement
  | null;

const resolveRef = (ref: Ref) => {
  if (typeof document === 'undefined') return undefined;
  if (ref == null) return ownerDocument().body;
  // eslint-disable-next-line no-param-reassign
  if (typeof ref === 'function') ref = ref();

  // eslint-disable-next-line no-param-reassign
  if (ref && 'current' in ref && ref.current) ref = ref.current;
  if (ref && 'nodeType' in ref && ref.nodeType) return ref;

  return null;
};

export default function useWaitForDOMRef(
  ref: Ref,
  onResolved: (resolvedRef: HTMLElement | null) => void,
) {
  const [resolvedRef, setRef] = useState(() => resolveRef(ref));

  if (!resolvedRef) {
    const earlyRef = resolveRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  useEffect(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef);
    }
  }, [onResolved, resolvedRef]);

  useEffect(() => {
    const nextRef = resolveRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);

  return resolvedRef;
}
