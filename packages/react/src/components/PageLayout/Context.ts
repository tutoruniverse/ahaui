import React from 'react';
import { PageLayoutHeaderProps } from './Header';
import { PageLayoutBodyProps } from './Body';
import { PageLayoutFooterProps } from './Footer';

export interface PageLayoutContextValue {
  /**
   * Header props
   */
  headerProps?: PageLayoutHeaderProps,
  /**
   * Body props
   */
  bodyProps?: PageLayoutBodyProps,
  /**
   * Footer props
   */
  footerProps?: PageLayoutFooterProps,
}

const Context = React.createContext<PageLayoutContextValue>({});
export default Context;
