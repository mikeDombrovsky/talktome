import { useAuth } from "../hooks/AuthProvider";
import { Auth } from "./Auth";
import { useNavigate } from "react-router-dom";

export const TalkToMe = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  if (!token) {
    console.log(token);
    navigate("/login");
  }

  return (
    <>
      <div className="container">
        <h1>Talk to me cards</h1>
      </div>
    </>
  );
};
