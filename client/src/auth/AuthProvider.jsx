import React, { useState } from 'react';
import authContext from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const loggedInUser = JSON.parse(localStorage.getItem('userId'));

  const [loggedIn, setLoggedIn] = useState(!!loggedInUser);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;