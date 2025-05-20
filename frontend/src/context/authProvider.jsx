import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({});
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => setLoggedIn(true);
  const handleLogOut = () => setLoggedIn(false);

  const contextValue = {
    loggedIn: !!loggedIn,
    handleLogIn,
    handleLogOut
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
