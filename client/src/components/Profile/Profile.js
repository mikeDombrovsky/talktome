import { useAuth } from "../hooks/AuthProvider";

const Profile = () => {
  const { token } = useAuth();
  if (!token) {
    console.log(token);
    window.location.replace("/login");
  }
  return (
    <>
      <div className="container">
        <h1>Profile</h1>
      </div>
    </>
  );
};

export default Profile;
