import LoadingScreen from "../LoadingScreen";
import Card from "./Card";
import Cards from "./Cards";
import { useState, useMemo, useEffect } from "react";

const Profile = () => {
  const [myFavoriteCards, setMyFavoriteCards] = useState([]);
  const [myCard, setMyCard] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    first_name: "",
    email: "",
    phone: "",
    message: "",
    is_public: false,
  });
  const [loading, setLoading] = useState(true);
  const { user_id, first_name, email, phone, message, is_public } = userInfo;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resp_info = await fetch("/api/auth/info");
        if (!resp_info.ok) {
          return console.log("oops, cannot get your info");
        }
        const user_info = await resp_info.json();

        const resp_card = await fetch("/api/cards/byuserid");
        if (!resp_card.ok) {
          return console.log("oops, cannot get your card");
        }
        const body = await resp_card.json();
        const { card } = body;
        //if card undefined - user didn't add his card
        if (card) {
          setMyCard(card);
        }

        console.log(user_info);
        setUserInfo({
          ...userInfo,
          user_id: user_info.user_id,
          first_name: user_info.first_name,
          email: user_info.email,
          phone: user_info.phone,
        });

        console.log(card, body);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchUserData();
  }, []);

  const addCard = async (e) => {
    e.preventDefault();
    const role = e.target.role.value;

    try {
      const resp = await fetch("/api/cards/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, phone, role }),
      });
      if (resp.ok) {
        const card = await resp.json();
        console.log("card added", card);
        setMyCard(card);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="text-right container">
            <h1 className="my-5">Hello, {first_name}</h1>
            <p>
              email: <b>{email}</b> phone: <b>{phone}</b>
            </p>
            <hr />
            {myCard ? (
              <>
              <Card card={myCard}/>
              </>
            ) : (
              <form onSubmit={(e) => addCard(e)}>
                <p>Type message below and add your own card</p>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="talktome"
                    value="talktome"
                  />
                  <label class="form-check-label" for="talktome">
                    I need to talk
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="role"
                    id="ihearyou"
                    value="ihearyou"
                  />
                  <label class="form-check-label" for="ihearyou">
                    I want to listen
                  </label>
                </div>
                <input
                  type="text"
                  name="message"
                  placeholder="type your message here"
                  className="form-control my-3"
                  required
                  value={userInfo.message}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, message: e.target.value });
                  }}
                />
                <button class=" btn btn-success">add new card</button>
              </form>
            )}
            <hr />
            <div>
              My favorite cards:
              <Cards cards={myFavoriteCards} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
