import React from 'react';
import { PopperDirection } from 'hooks/usePopper';

export interface DropdownContextInterface {
  alignRight?: boolean;
  setContainer: (ref: HTMLElement | null) => void;
  containerElement: HTMLElement | null;
  toggleElement: HTMLElement | null;
  setToggle: (ref: HTMLElement | null) => void;
  toggle: (nextShow: boolean, event?: React.SyntheticEvent | Event) => void;
  show?: boolean;
  drop?: PopperDirection;
}

export const DropdownContext = React.createContext<DropdownContextInterface | null>(null);
