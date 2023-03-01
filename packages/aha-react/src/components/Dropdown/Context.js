import React from 'react';

const DropdownContext = React.createContext({
  containerRef() {},
  toggleRef() {},
  onToggle() {},
  show: null,
  drop: null,
});

export default DropdownContext;
