const Card = ({ card }) => {
  const { card_id, message, is_public } = card;
  return (
    <>
      <p>{card_id}</p>
      <p>{message}</p>
      <p>{is_public}</p>
    </>
  );
};

export default Card;
