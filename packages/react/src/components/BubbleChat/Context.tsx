import React from 'react';

interface BubbleChat {
  type: string;
}

const Context = React.createContext<BubbleChat | undefined>(undefined);

export default Context;
