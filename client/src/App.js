import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/AuthProvider";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import TalkToMe from "./components/TalkToMe";

function App() {
  const { token, handleLogout, handleLogin } = useAuth();

  useEffect(() => {
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
        window.location.replace("/login");
      }
    };
    verify();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/talktome" element={<TalkToMe />} />
          <Route path="/ihearyou" element={<IHearYou />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
