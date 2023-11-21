import { db } from "../config/db.js";

export const _addCard = (card) => {
 const { user_id, card_id, message, phone, name } = card;

  return db("cards").insert(
    {
      user_id,
      card_id,
      message,
      phone,
      name,
    },
    ["user_id", "cards", "favorites"]
  );
};

export const _getCardsByUserId = (user_id) => {
  return db("cards")
    .select("user_id", "card_id", "message", "phone", "name")
    .where({ user_id });
};

export const _getCardsByids = (ids) => {
  return db("cards")
    .select("user_id", "card_id", "message", "phone", "name")
    .whereIn(user_id, ids);
};

export const _updateCard = (card) => {
  const { user_id, card_id, message, phone, name } = card;

  return db("cards")
  .where({ user_id, card_id })
  .update(
    {
      message,
      phone,
      name,
    },
    ["user_id", "card_id", "message", "phone", "name"]
  );
};

export const _deleteCard = (card_id) => {
    return db("cards")
      .where({ card_id })
      .del(["user_id", "card_id", "message", "phone", "name"]);
}

