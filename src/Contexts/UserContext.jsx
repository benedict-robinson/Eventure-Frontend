import { createContext, useEffect, useState } from "react";
import { fetchUserByUsername } from "../api.js";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const username = localStorage.getItem("username") || "user1";

  const [user, updateUserState] = useState({});

  const setUser = (newUser) => {
    localStorage.setItem("username", newUser.username);
    updateUserState(newUser); 
  };

  useEffect(() => {
    fetchUserByUsername(username).then((response) => {
      setUser(response); 
    });
  }, [username]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};