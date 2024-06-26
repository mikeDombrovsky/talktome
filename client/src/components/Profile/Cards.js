import Card from "./Card";

const Cards = ({ cards }) => {
  const addToFavorites = async (e, card_id) => {
    try {
      const resp = await fetch(`/api/favorites/add/${card_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        console.log(resp.ok);
        console.log(resp);
        return alert("oops, something went wrong");
      }
      const favorite = await resp.json();
      alert("Added to favorites")
      
      e.target.parentElement.remove();
    } catch (err) {
      console.log(err);
      alert("oops, something went wrong")
    }
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
      {cards.map((card) => (
        <div className="col my-2">
          <Card card={card} />
          <button
            className="btn btn-success my-1"
            onClick={(e) => addToFavorites(e, card.card_id)}
          >
            Choose
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
