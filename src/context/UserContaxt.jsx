
import React, { createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUserContext] = useState(() => {
   return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  });

  const removeCrad = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setContextUser(null)
  };

  const value = {
    user,
    setUserContext,
    removeCrad
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
