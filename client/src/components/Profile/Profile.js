import Cards from "./Cards";
import { useState, useMemo, useEffect } from "react";

const Profile = () => {
  const [myCards, setMyCards] = useState([]);
  const [myCard, setMyCard] = useState({});
  const [name, setName] = useState("");
  const publicCard = async () => {};

  useEffect(() => {
    const getCards = async () => {
      try {
        const response = await fetch("/api/cards/byuserid");
        if (!response.ok) {
          return console.log("oops, cannot get cards");
        }
        const body = await response.json();
        const { user, cards } = body;

        setMyCards(cards);
        setName(user.first_name);
        console.log(cards, name, body);
      } catch (err) {
        console.log(err);
      }
    };

    getCards();
  }, []);

  return (
    <>
      <div className="text-right container">
        <h1 className="my-5">Profile</h1>
        <p>Name: {name}</p>
        <p>Phone: 000-000-00-00</p>
        <button class=" btn btn-success" onClick={publicCard}>
          add new card
        </button>
        <div>
          My favorite cards:
          <Cards cards={myCards} />
        </div>
      </div>
    </>
  );
};

export default Profile;
