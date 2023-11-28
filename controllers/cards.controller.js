import {
  _addCard,
  _updateCard,
  _deleteCard,
  _getCardByUserId,
  _getCardsByIds,
  _getAllCards,
} from "../models/cards.js";

export const addCard = async (req, res) => {
  const { user_id, first_name } = req.user;
  const { message, phone, role} = req.body;

  try {
    const row = await _addCard({
      user_id,
      first_name,
      message,
      phone,
      role,
      is_public:false
    });
    res.status(200).json({ ...row[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const updateCard = async (req, res) => {
  const { user_id } = req.user;
  const { card_id, message, is_public, role } = req.body;

  try {
    const row = await _getCardsByIds([card_id]);
    if (row.length === 0) {
      return res.status(404).json({ msg: "card not found" });
    }

    if (row[0].user_id !== user_id) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    const row2 = await _updateCard({
      user_id,
      card_id,
      message,
      is_public,
      role
    });

    res.status(200).json({ ...row2[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const deleteCard = async (req, res) => {
  const { user_id } = req.user;

  try {
    const row = await _deleteCard(user_id);

    res.status(200).json({ ...row[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getCardByUserId = async (req, res) => {
  const { user_id } = req.user;

  try {
    //user may hold just one card. if row is empty card sets as undefined
    const row = await _getCardByUserId(user_id);

    res.status(200).json({
      user: req.user,
      card: row[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getCardsByIds = async (req, res) => {
  const { ids } = req.body;

  try {
    const row = await _getCardsByIds(ids);
    const cards = row[0];

    res.status(200).json({
      cards,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getAllCards = async (req, res) => {
  const { offset, role } = req.body;
  console.log(offset, role);
  try {
    const cards = await _getAllCards(offset, role);
   
    res.status(200).json(cards);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};
