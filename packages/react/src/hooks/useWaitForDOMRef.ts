import { useState, useEffect, RefObject } from 'react';
import ownerDocument from 'dom-helpers/ownerDocument';

type ResolvedRef = HTMLElement | null | undefined;

const resolveRef = (
  ref: HTMLElement | RefObject<HTMLElement> | (() => HTMLElement),
) => {
  if (typeof document === 'undefined') return undefined;
  if (ref == null) return ownerDocument().body;
  // eslint-disable-next-line no-param-reassign
  if (typeof ref === 'function') ref = ref();

  // Add a type guard to ensure that ref is an HTMLElement
  if ('nodeType' in ref) {
    return ref;
  }

  // Check for a RefObject<HTMLElement>
  if (ref && 'current' in ref && ref.current && 'nodeType' in ref.current) {
    return ref.current;
  }

  return null;
};

export default function useWaitForDOMRef<T extends HTMLElement>(
  ref: RefObject<T> | ((() => T) | T | null | undefined),
  onResolved?: (ref: T) => void,
): T {
  const [resolvedRef, setRef] = useState<ResolvedRef>(() => resolveRef(ref));

  if (!resolvedRef) {
    const earlyRef = resolveRef(ref);
    if (earlyRef) setRef(earlyRef);
  }

  useEffect(() => {
    if (onResolved && resolvedRef) {
      onResolved(resolvedRef as T);
    }
  }, [onResolved, resolvedRef]);

  useEffect(() => {
    const nextRef = resolveRef(ref);
    if (nextRef !== resolvedRef) {
      setRef(nextRef);
    }
  }, [ref, resolvedRef]);

  return resolvedRef as T;
}
