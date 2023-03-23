import React from 'react';

export interface TopMenuContextInterface {
  current?: string;
  onSelect?: (path: string) => void;
}
const Context = React.createContext<TopMenuContextInterface>({});

export default Context;
