import { db } from "../config/db.js";

export const _addCard = (card) => {
  const { user_id, message } = card;

  return db("cards").insert(
    {
      user_id,
      message,
    },
    ["user_id", "card_id", "message"]
  );
};

export const _updateCard = (card) => {
  const { user_id, card_id, message } = card;

  return db("cards").where({ user_id, card_id }).update(
    {
      message,
    },
    ["user_id", "card_id", "message"]
  );
};

export const _deleteCard = (card_id) => {
  return db("cards").where({ card_id }).del(["user_id", "card_id", "message"]);
};

export const _getCardsByUserId = (user_id) => {
  return db("cards").select("user_id", "card_id", "message").where({ user_id });
};

export const _getCardsByIds = (ids) => {
  return db("cards")
    .select("user_id", "card_id", "message")
    .whereIn("card_id", ids);
};
