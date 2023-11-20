import { useAuth } from "../hooks/AuthProvider";

const IHearYou = () => {
  const { token } = useAuth();
  if (!token) {
    console.log(token);
    window.location.replace("/login");
  }

  return (
    <>
      <div className="container">
        <h1>I Hear You cards</h1>
      </div>
    </>
  );
};

export default IHearYou;
