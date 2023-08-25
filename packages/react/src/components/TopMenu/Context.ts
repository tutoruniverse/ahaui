import { createContext } from 'utils/context';

export interface TopMenuContextValue {
  currentPath: string,
  onPathSelect: (path: string) => void,
}

export const [useTopMenuContext, TopMenuContext] = createContext<TopMenuContextValue>();
