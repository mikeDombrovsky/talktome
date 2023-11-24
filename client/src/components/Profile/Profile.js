import Cards from "./Cards";
import { useState, useMemo } from "react";

const Profile = () => {
  const publicCard = async () => {
    
  }

  
  return (
    <>
      <div className="text-right container">
        <h1 className="my-5">Profile</h1>
        <p>Name: first_name</p>
        <p>Phone: 000-000-00-00</p>
        <button class=" btn btn-success" onClick={publicCard}>
          public my card
        </button>
        <div>
          Cards:
          <Cards />
        </div>
      </div>
    </>
  );
};

export default Profile;
