import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateExpiryTime = (expTime) => {
  const curTime = new Date().getTime();
  const adjusted = new Date(expTime).getTime();
  const remainingTime = adjusted - curTime;
  return remainingTime;
};

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.clear();
  };

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    setToken(token);
    const remainingTime = calculateExpiryTime(expirationTime);
    setTimeout(logoutHandler, remainingTime);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;