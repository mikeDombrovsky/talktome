import { useEffect } from "react";
import Card from "./Card";

const FavoriteCards = ({ cards, fetchFavorites }) => {
  const deleteFavorite = async (card_id) => {
    try {
      const resp = await fetch(`/api/favorites/${card_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        console.log(resp.ok);
        console.log(resp);
        return console.log("oops, something went wrong");
      }
      const favorite = await resp.json();
      console.log("deleted favorite:", favorite);
      fetchFavorites();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
      {cards.map((card) => (
        <div className="col my-2">
          <Card card={card} />
          <button
            className="btn btn-danger my-1"
            onClick={() => deleteFavorite(card.card_id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteCards;
