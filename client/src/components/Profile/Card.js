const Card = ({ card }) => {
  const { card_id, first_name, message, phone, role } = card;
  return (
    <div className="card" id={card_id}>
      <img src="./candle.png" className="card-img-top" alt="heart" />
      <div className="card-body">
        <h5 className="card-title">{first_name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{phone}</h6>
        <p className="card-text">{message}</p>
      </div>
      <div class="card-footer text-center">{role}</div>
    </div>
  );
};

export default Card;
