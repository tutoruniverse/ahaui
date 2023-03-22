import React from 'react';

export type AccordionEventKey = string | string[] | null | undefined;

export type AccordionSelectCallback = (eventKey: AccordionEventKey, e: React.SyntheticEvent<unknown>) => void;

export interface AccordionContextInterface {
  activeEventKey?: AccordionEventKey;
  onSelect?: AccordionSelectCallback;
}

export interface AccordionItemContextInterface {
  eventKey: string;
}

export const AccordionItemContext = React.createContext<AccordionItemContextInterface>({
  eventKey: '',
});
export function isAccordionItemSelected(activeEventKey: AccordionEventKey, eventKey: string): boolean {
  return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}

AccordionItemContext.displayName = 'AccordionItemContext';

export const AccordionContext = React.createContext<AccordionContextInterface>({});

AccordionContext.displayName = 'AccordionContext';
