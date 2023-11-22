import Cards from "./Cards";

const Profile = () => {
  return (
    <>
      <div className="text-right container">
        <h1 className="my-5">Profile</h1>
        <p>Name: first_name</p>
        <p>Phone: 000-000-00-00</p>
        <div>
          Cards:
          <Cards />
        </div>
      </div>
    </>
  );
};

export default Profile;
