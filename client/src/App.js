import { useEffect } from "react";
import NavBar from "./components/NavBar/NavBar";
import { useAuth } from "./hooks/AuthProvider";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  const { token, handleLogout, handleLogin } = useAuth();

  useEffect(async () => {
    const response = await fetch("/api/refresh", {
      method: "POST",
    });
    const data = await response.json();
    handleLogin(data.token);
  },[]);

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
