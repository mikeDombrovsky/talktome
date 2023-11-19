import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
    // Cookies.set("token", newToken);
  };

  const handleLogout = async () => {
    setToken(null);
    // Cookies.remove("token");
    // Cookies.remove("refreshToken");
    try {
      fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
