import { useAuth } from "../hooks/AuthProvider";

const TalkToMe = () => {
  const { token } = useAuth();
  if (!token) {
    console.log(token);
    window.location.replace("/login");
  }

  return (
    <>
      <div className="container">
        <h1>Talk to me cards</h1>
      </div>
    </>
  );
};

export default TalkToMe;
