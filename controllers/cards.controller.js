import {
  _addCard,
  _updateCard,
  _deleteCard,
  _getCardsByUserId,
  _getCardsByIds,
} from "../models/cards.js";

export const addCard = async (req, res) => {
  const { user_id } = req.user;
  const { message } = req.body;

  try {
    const row = await _addCard({
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
    });

    res.status(200).json({ msg: row2[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const deleteCard = async (req, res) => {
  const { user_id } = req.user;

  try {
    const row = await _getCardsByIds([card_id]);
    if (row.length === 0) {
      return res.status(404).json({ msg: "card not found" });
    }

    if (row[0].user_id !== user_id) {
      return res.status(401).json({ msg: "unauthorized" });
    }

    const row2 = await _deleteCard(card_id);

    res.status(200).json({ msg: row2[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getCardsByUserId = async (req, res) => {
  const { user_id } = req.user;

  try {
    const row = await _getCardsByUserId(user_id);
    const cards = row[0];

    res.status(200).json({
      cards,
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
