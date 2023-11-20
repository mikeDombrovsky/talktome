import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";

export const Auth = (props) => {
  const { token, handleLogout, handleLogin } = useAuth();
  const {redirect, setRedirect} = useState(false);
  let navigate = useNavigate();

  useEffect( () => {
    const verify = async () => {
      try {
        const response = await fetch("/api/auth/refresh", {
          method: "POST",
        });
        const data = await response.json();
        handleLogin(data.token);
        setRedirect(true)
      } catch (err) {
        console.log(err);
        handleLogout();
        setRedirect(false)
        navigate("/login");
      }
    };
    verify();
  }, []);

  return redirect ? props.children : null;
};
