import { GenericFunction } from 'types/common';

// TODO: Make it private only in v5
export default function setRef<T>(
  ref: React.MutableRefObject<T> | GenericFunction,
  value: T | unknown,
) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && Object.hasOwnProperty.call(ref, 'current')) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value as T;
  }
}
