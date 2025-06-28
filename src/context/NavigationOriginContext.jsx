import React, { createContext, useContext, useState } from "react";

const NavigationOriginContext = createContext();

export const NavigationOriginProvider = ({ children }) => {
  const [origin, setOrigin] = useState(null); // "home", "history", or null
  return (
    <NavigationOriginContext.Provider value={{ origin, setOrigin }}>
      {children}
    </NavigationOriginContext.Provider>
  );
};

export const useNavigationOrigin = () => useContext(NavigationOriginContext);
