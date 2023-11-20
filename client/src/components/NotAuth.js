import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect } from "react";

export const NotAuth = (props) => {
  const { token, handleLogin } = useAuth();
  let navigate = useNavigate();
  if (token) {
    navigate("/home");
  }
  //   useEffect( () => {
  // const verify = async () => {
  //   try {
  //     const response = await fetch("/api/auth/refresh", {
  //       method: "POST",
  //     });
  //     const data = await response.json();
  //     handleLogin(data.token);

  //   } catch (err) {
  // console.log(err);
  // handleLogout();
  // navigate("/login");
  //   }
  // };
  // verify();
  //   },[token]);

  return token === null ? props.children : null;
};
