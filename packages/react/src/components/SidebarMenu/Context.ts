import React from 'react';
import { EnumToUnion } from 'types/common';
import { createContext } from 'utils/context';

export enum SidebarMenuSizeEnum {
  small = 'small',
  medium = 'medium',
}

export type SidebarMenuSizeType = EnumToUnion<SidebarMenuSizeEnum>;

export interface SidebarMenuContextType {
  current: string;
  onSelect: React.Dispatch<React.SetStateAction<string>> | ((path: string) => void);
  size: SidebarMenuSizeType;
}

export const [useSidebarContext, SidebarContext] = createContext<SidebarMenuContextType>();
