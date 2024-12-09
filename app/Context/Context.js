

import React, { createContext,useState } from 'react';

// Create a context object
const MyContext = createContext();





export const AppContextProvider = ({ children }) => {

  return (
    <MyContext.Provider >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;