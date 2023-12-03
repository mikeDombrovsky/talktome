import { useState, useEffect } from "react";
import Cards from "./Profile/Cards";
import LoadingScreen from "../components/LoadingScreen";

const IHearYou = () => {
  const [offset, setOffset] = useState(0);
  const [cards, setCards] = useState([]);
  const role = "ihearyou";
  const [loading, setLoading] = useState(true);
  const cardsOnPage = 12;

  const next = () => {
    console.log(offset, cards.length);
    if (offset < cards.length && cards.length > cardsOnPage) {
      setOffset(offset + cardsOnPage);
      fetchCards();
    }
  };

  const prev = () => {
    console.log(offset, cards.length);
    if (offset > 0) {
      setOffset(offset - cardsOnPage);
      fetchCards();
    }
  };

  const fetchCards = async () => {
    try {
      const resp = await fetch("/api/cards/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offset, role }),
      });

      if (!resp.ok) {
        return console.log("cannot fetch cards");
      }

      const cards = await resp.json();
      setCards(cards);
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <hr />
          <h2>I hear you cards</h2>
          <hr />
          <p>
            Here you can shoose some people that want to talk with you to help.
            Choosen cards will be saved in your profile
          </p>
          <hr />
          <Cards cards={cards} />
          <hr />
          <div className="text-center my-5">
            <button class="btn btn-success m-2 m-sm-1" onClick={prev}>
              prev
            </button>
            <span className="m-2 m-sm-1">
              {offset} - {offset + cardsOnPage}
            </span>
            <button class="btn btn-success m-2 m-sm-1" onClick={next}>
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IHearYou;
