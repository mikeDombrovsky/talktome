// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/AuthProvider";
// import { useEffect, useState } from "react";
// import { redirect } from "react-router-dom";

// export const Auth = (props) => {
//   const { token, handleLogout, handleLogin } = useAuth();
//   const { isAuth, setIsAuth} = useState(false);
//   let navigate = useNavigate();
  

//   useEffect( () => {
//     const verify = async () => {
//       try {
//         const response = await fetch("/api/auth/refresh", {
//           method: "POST",
//         });
//         const data = await response.json();
//         handleLogin(data.token);
//         setIsAuth(true);
//       } catch (err) {
//         console.log(err);
//         handleLogout();
//         setIsAuth(false);
//         redirect("/login");
//       }
//     };
//     verify();
//   }, []);

//   return isAuth ? props.children : null;
// };
