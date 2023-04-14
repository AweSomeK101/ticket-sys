import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", {});
  const [token, setToken] = useLocalStorage("token", "");

  function login(u, t) {
    console.log("login is called");
    setUser({ username: u.username, role: u.role, isAdmin: u.admin });
    setToken(t);
  }

  async function logout(cb) {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    fetch(`${baseUrl}/api/user/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("res not okay", res.status, res.statusText);
          throw new Error(`${res.status} - ${res.statusText}`);
        }
        setUser({});
        setToken("");
        cb(null);
      })
      .catch((error) => {
        console.log(error);
        cb(error.message);
      });
  }

  async function getAllEmp() {
    const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/user/all`, {
      headers: { Authorization: token },
    });
    return await res.json();
  }

  return (
    <UserContext.Provider value={{ user, token, login, logout, getAllEmp }}>
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  return useContext(UserContext);
}
