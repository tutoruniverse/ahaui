import React from 'react';
import { HeaderProps } from './Header';
import { BodyProps } from './Body';
import { FooterProps } from './Footer';

export interface PageLayoutContextValue {
  /**
   * Header props
   */
  headerProps?: HeaderProps,
  /**
   * Body props
   */
  bodyProps?: BodyProps,
  /**
   * Footer props
   */
  footerProps?: FooterProps,
}

const Context = React.createContext<PageLayoutContextValue>({});
export default Context;
