import React, { createContext, useState } from 'react';

export const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [sharedVariable, setSharedVariable] = useState([]);

  return (
    <SharedContext.Provider value={{ sharedVariable, setSharedVariable }}>
      {children}
    </SharedContext.Provider>
  );
};
