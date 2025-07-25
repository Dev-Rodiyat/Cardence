import { createContext, useContext, useState } from 'react';

const defaultUserData = {
  name: '',
  title: '',
  bio: '',
  email: '',
  phone: '',
  location: '',
  company: '',
  position: '',
  avatar: '',
  links: [],
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(defaultUserData);

  const resetUserData = () => setUserData(defaultUserData);

  return (
    <UserContext.Provider value={{ userData, setUserData, resetUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
