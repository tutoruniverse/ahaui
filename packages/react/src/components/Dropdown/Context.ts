import { createContext } from 'utils/context';
import { DropdownDirection } from 'types/common';
import { SyntheticEvent } from 'react';

export interface DropdownContextValue {
  show?: boolean;
  alignRight: boolean;
  drop: DropdownDirection;
  containerElement: HTMLElement | null;
  toggleElement: HTMLElement | null;
  setContainer: (ref: HTMLElement) => void;
  setToggle: (ref: HTMLElement | null) => void;
  toggle: (e: SyntheticEvent | Event) => void;
}

export const [useDropdownContext, DropdownContext] = createContext<DropdownContextValue>();
