import Card from "./Card";

const Cards = ({ cards }) => {
  console.log(cards);
  return (
    <>
      {cards.map((card) => {
        return <Card card={card} />;
      })}
    </>
  );
};

export default Cards;
