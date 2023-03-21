type RefObject<T> = { current: T | null };

function setRef<T>(
  ref: ((instance: T | null) => void) | RefObject<T> | null | undefined,
  value: T | null,
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export default setRef;
