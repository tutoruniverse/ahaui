import { MutableRefObject, Ref } from 'react';


type PossibleRef<T> = Ref<T> | undefined;
/**
 * Credit to material-ui for this snippet
 */

export default function setRef<T>(ref: PossibleRef<T> | null, value: T) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = value;
  }
}
