import React from 'react';

export type AccordionOnSelectFn = ((eventKey: string | null, e: React.MouseEvent) => void) | null;
export type AccordionActiveKey = string | null;

export const SelectableContext = React.createContext<AccordionOnSelectFn>(null);
const AccordionContext = React.createContext<AccordionActiveKey | undefined>(null);

export default AccordionContext;
