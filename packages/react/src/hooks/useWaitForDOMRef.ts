//fork react-overlays/src/utils/useWaitForDOMRef.js
import ownerDocument from 'dom-helpers/ownerDocument';
import { useState, useEffect } from 'react';

export type DOMContainer<T extends HTMLElement = HTMLElement> =
  | React.RefObject<T | null>
  | (() => T | React.RefObject<T | null> | null)
  | T
  | null;

export const resolveRef = <T extends HTMLElement>(
  ref: DOMContainer<T> | undefined,
) : T | HTMLElement | undefined | null => {
  if (typeof document === 'undefined') return undefined;
  if (ref == null) return ownerDocument().body;
  // eslint-disable-next-line no-param-reassign
  if (typeof ref === 'function') ref = ref();

  // eslint-disable-next-line no-param-reassign
  if (ref && 'current' in ref && ref.current) ref = ref.current;
  if (ref && 'nodeType' in ref && ref.nodeType) return ref;

  return null;
};

export default function useWaitForDOMRef<T extends HTMLElement = HTMLElement>(
  ref: DOMContainer<T> | undefined,
  onResolved?: (element: T | HTMLElement) => void,
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
