import Card from "./Card";

const Cards = ({ cards }) => {
  const addToFavorites = async (card_id) => {
    try {
      const resp = fetch(`/api/favorites/add/${card_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        console.log(resp.ok);
        return console.log("oops, something went wrong");
      }
      const favorite = await resp.json();
      console.log(favorite);
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
            className="btn btn-success my-1"
            onClick={() => addToFavorites(card.card_id)}
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
