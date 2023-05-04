import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
  };

  useEffect(() => {
    let logoutTimer;
    if (userIsLoggedIn) {
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }
    return () => {
      clearTimeout(logoutTimer);
    };
  }, [userIsLoggedIn, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: loginHandler,
    logOut: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
