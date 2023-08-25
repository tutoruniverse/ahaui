import React from 'react';

interface ModalContext {
  onHide?: () => void;
}

const Context = React.createContext<ModalContext>({ onHide() {} });

export default Context;
