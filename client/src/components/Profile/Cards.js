import Card from "./Card";

const Cards = ({ cards }) => {
  
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
      {cards.map((card) => (
        <div className="col my-2">
          <Card card={card} />
          <button className="btn btn-success my-1">Choose</button>
        </div>
      ))}
    </div>
  );
};

export default Cards;
