import { useState, useEffect } from "react";
import Cards from "./Profile/Cards";
import LoadingScreen from "../components/LoadingScreen";

const TalkToMe = () => {
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [cards, setCards] = useState([]);
  const [size, setSize] = useState(0);
  const role = "talktome";
  const cardsOnPage = 12;

  const next = () => {
    console.log(offset, cards.length, size);
    if (offset < size && size > cardsOnPage) {
      setOffset(offset + cardsOnPage);
      fetchCards();
    }
  };

  const prev = () => {
    console.log(offset, cards.length);
    if (offset >= size) {
      setOffset(offset - cardsOnPage);
      fetchCards();
    }
  };

  const fetchCards = async () => {
    setLoading(true);
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

      const {cards, size} = await resp.json();
      setCards(cards);
      setSize(size)
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    console.log(offset, cards.length, size);
    fetchCards();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className="container">
          <hr />
          <h2>Talk To Me</h2>
          <p>
            Here you can shoose some people that need to cope with enxaity to
            talk with. Choosen cards will be saved in your profile
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

export default TalkToMe;
