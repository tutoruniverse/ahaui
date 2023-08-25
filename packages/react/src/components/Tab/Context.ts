import { VariantColors } from 'types/common';
import { createContext } from 'utils/context';

export type VariantForTag = Extract<VariantColors, 'dark'>;

export interface SidebarMenuContextValue {
  current?: string;
  onSelect?: (path?: string) => void;
  variant?: VariantForTag;
}

export const [useTabContext, TabContext] = createContext<SidebarMenuContextValue>();
