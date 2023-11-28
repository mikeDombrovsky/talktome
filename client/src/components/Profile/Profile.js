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
            <p>Role: {myCard && myCard.role ? myCard.role : "not chosen"}</p>
            <hr />
            {myCard ? (
              <>
                <div className="row">
                  <div className="col-6 col-md-9 col-lg-9"></div>
                  <Card card={myCard} />
                </div>
                <div className="row">
                  <div className="col"></div>
                  <div className="col-6">
                    <>
                      {myCard.is_public ? (
                        <button
                          class="btn btn-secondary m-2"
                          onClick={togglePublicity}
                        >
                          hide
                        </button>
                      ) : (
                        <button
                          class="btn btn-primary m-2"
                          onClick={togglePublicity}
                        >
                          public
                        </button>
                      )}
                    </>
                    <button class="btn btn-danger m-2" onClick={removeCard}>
                      remove
                    </button>
                    <p class="d-inline-block m-2">
                      <button
                        class="btn btn-warning m-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        change
                      </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                      form
                    </div>
                    
                    <p class="d-inline-flex gap-1">
                      <a
                        class="btn btn-primary"
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Link with href
                      </a>
                      <button
                        class="btn btn-primary"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                      >
                        Button with data-bs-target
                      </button>
                    </p>
                    <div class="collapse" id="collapseExample">
                      <div class="card card-body">
                        Some placeholder content for the collapse component.
                        This panel is hidden by default but revealed when the
                        user activates the relevant trigger.
                      </div>
                    </div>
                  </div>
                </div>
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
                    required
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
