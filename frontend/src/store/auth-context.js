import React, { useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => { },
  logout: () => { },
});

const calculateExpiryTime = (expTime) => {
  const curTime = new Date().getTime();
  const adjusted = new Date(expTime).getTime();
  const remainingTime = adjusted - curTime;
  return remainingTime;
};

const retreiveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpTime = localStorage.getItem('expiry');
  const remainingTime = calculateExpiryTime(storedExpTime);
  if (remainingTime <= 3600) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retreiveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    localStorage.setItem('expiry', expirationTime);
    setToken(token);
    const remainingTime = calculateExpiryTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData]);

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