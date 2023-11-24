import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/AuthProvider";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import TalkToMe from "./components/TalkToMe";
import IHearYou from "./components/IHearYou";

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
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/profile" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/profile" />}
          />
          <Route
            path="/profile"
            element={token ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/talktome"
            element={token ? <TalkToMe /> : <Navigate to="/login" />}
          />
          <Route
            path="/ihearyou"
            element={token ? <IHearYou /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
