import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});
  const [token, setToken] = useLocalStorage("token", "");

  function login(u, t) {
    setUser({ username: u.username, role: u.role, isAdmin: u.admin });
    setToken(t);
  }

  function logout() {
    setUser({});
    setToken("");
  }

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>{children}</UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
