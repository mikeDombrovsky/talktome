import LoadingScreen from "../LoadingScreen";
import Card from "./Card";
import CardForm from "./CardForm";
import Cards from "./Cards";
import { useState, useMemo, useEffect } from "react";
import FavoriteCards from "./FavoriteCards";

const Profile = () => {
  const [myFavoriteCards, setMyFavoriteCards] = useState([]);
  const [myCard, setMyCard] = useState(null);
  const [userInfo, setUserInfo] = useState({
    user_id: "",
    first_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const { user_id, first_name, email, phone, message } = userInfo;

  const fetchFavorites = async () => {
    if (!loading) {
      setLoading(true);
    }
    try {
      const resp_favorites = await fetch(`/api/favorites/all`);
      if (!resp_favorites.ok) {
        return console.log("oops, cannot get your favorites");
      }
      const favorites = await resp_favorites.json();
      if (!favorites) {
        return console.log("oops, something went wrong");
      }
      setMyFavoriteCards(favorites);
      console.log("mounted favorites", favorites);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };
  const fetchUserData = async () => {
    try {
      //fetch user info
      const resp_info = await fetch("/api/auth/info");
      if (!resp_info.ok) {
        return console.log("oops, cannot get your info");
      }
      const user_info = await resp_info.json();
      //fetch user's card info
      const resp_card = await fetch("/api/cards/byuserid");
      if (!resp_card.ok) {
        return console.log("oops, cannot get your card");
      }
      const body = await resp_card.json();
      const { card } = body;

      if (!user_info) {
        return console.log("oops, something went wrong");
      }

      console.log("user_info", user_info);
      setUserInfo({
        ...user_info,
        user_id: user_info.user_id,
        first_name: user_info.first_name,
        email: user_info.email,
        phone: user_info.phone,
      });
      //if card undefined - user didn't add his card
      if (card) {
        setMyCard(card);
      }
      console.log("mounted card", card);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchFavorites();
  }, []);

  const setMessage = (message) => {
    setUserInfo({ ...userInfo, message });
  };

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

  const togglePublicity = async () => {
    try {
      const newCard = { ...myCard, is_public: !myCard.is_public };

      const resp = await fetch("/api/cards/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newCard),
      });
      if (resp.ok) {
        const card = await resp.json();
        console.log("card updated", card);
        setMyCard(card);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCard = async () => {
    try {
      const resp = await fetch("/api/cards/delete", {
        method: "DELETE",
      });
      if (resp.ok) {
        const card = await resp.json();
        console.log("card deleted", card);
        setMyCard(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateCard = async (e) => {
    e.preventDefault();
    const role = e.target.role.value;
    const message = e.target.message.value;
    try {
      const newCard = { ...myCard, role, message };

      const resp = await fetch("/api/cards/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newCard),
      });
      if (resp.ok) {
        const card = await resp.json();
        console.log("card updated", card);
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
          <div className="container">
            <h1 className="my-5">Hello, {first_name}</h1>
            <p>
              email: <b>{email}</b> phone: <b>{phone}</b>
            </p>
            <hr />
            <h2>Your card</h2>
            {myCard ? (
              <>
                <div className="row">
                  <div className="col">
                    <Card card={myCard} />
                  </div>
                  <div className="col-auto cal-xs-6 col-sm-6 col-lg-8"></div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <>
                      {myCard.is_public ? (
                        <button
                          className="btn btn-secondary ms-1 my-2"
                          onClick={togglePublicity}
                        >
                          unpublish
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary ms-1 my-2"
                          onClick={togglePublicity}
                        >
                          publish
                        </button>
                      )}
                    </>
                    <button
                      className="btn btn-danger ms-1 my-1"
                      onClick={removeCard}
                    >
                      remove
                    </button>
                    <p className="d-inline-block">
                      <button
                        className="btn btn-warning ms-1 my-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        // aria-expanded="false"
                        // aria-controls="collapseExample"
                      >
                        change
                      </button>
                    </p>
                    <div className="collapse w-50" id="collapseExample">
                      <CardForm
                        message={userInfo.message}
                        handleSubmit={updateCard}
                        setMessage={setMessage}
                        btn_text="update card"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col"></div>
                <div className="col-6 text-end">
                  <CardForm
                    message={userInfo.message}
                    handleSubmit={addCard}
                    setMessage={setMessage}
                    btn_text="add card"
                  />
                </div>
              </div>
            )}

            <hr />
            <div>
              <h2>My favorite cards:</h2>
              <FavoriteCards cards={myFavoriteCards} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
