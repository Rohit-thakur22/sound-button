'use client'
import React, { createContext, useState } from "react";

// Create a context
const MyContext = createContext();

// Create a provider component
const MyProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState();

  return (
    <MyContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
