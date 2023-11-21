import { _addCard, _updateCard, _deleteCard, _getCardsById, _getCardsByUserId} from '../models/cards'

export const addCard = async (req, res) => {
  const { user_id } = req.user;
  const { message } = req.body;

  try {
    const row = await _addProfile({
      user_id,
      message,
    });
    res.status(200).json({ msg: row[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const updateCard = async (req, res) => {
  const { user_id } = req.user;
  const { card_id, message } = req.body;

  try {
    const row = await _getCardsById([card_id]);
    if (row.length === 0) {
      return res.status(404).json({ msg: "card not found" });
    }
    const row2 = await _updateCard({
      user_id,
      card_id,
      message,
    });

    res.status(200).json({ msg: row2[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};



export const getCardsById = async (req, res) => {
  const { user_id, first_name } = req.user;
  
  try {
    const row = await _getProfile(user_id);
    if (row.length === 0) {
      return res.status(404).json({ msg: "profile not found" });
    }
    const { cards, favorites } = row[0];

    cards = JSON.parse(cards);
    favorites = JSON.parse(favorites);

    res.status(200).json({
      user_id,
      first_name,
      cards,
      favorites,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

