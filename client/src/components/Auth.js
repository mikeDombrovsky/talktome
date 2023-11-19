import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect } from "react";
const { token, handleLogout, handleLogin } = useAuth();

export const Auth = (props) => {
  let navigate = useNavigate();

  useEffect(async () => {
    const verify = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
        });
        const data = await response.json();
        handleLogin(data.token);
      } catch (err) {
        console.log(err);
        handleLogout();
        navigate("/login");
      }
    };
    
    verify();
  }, []);

  return token ? props.children : null;
};
