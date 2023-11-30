import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/AuthProvider";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import TalkToMe from "./components/TalkToMe";
import IHearYou from "./components/IHearYou";
import LoadingScreen from "./components/LoadingScreen";
import Call from "./components/CallRoom/VideoCall/Call";
import VoiceApp from "./components/CallRoom/VoiceCall/VoiceApp";

function App() {
  const { token, handleLogout, handleLogin } = useAuth();
  const [loading, setLoading] = useState(true);

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
      } finally {
        setTimeout(()=> setLoading(false), 1000);
      }
    };
    verify();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
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
              <Route
                path="/call/*"
                element={token ? <Call /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </>
      )}
    </>
  );
}

export default App;
