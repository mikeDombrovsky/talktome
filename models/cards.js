import { db } from "../config/db.js";

export const _addCard = (card) => {
  const { user_id, message, is_public } = card;

  return db("cards").insert(
    {
      user_id,
      message,
      is_public,
    },
    ["user_id", "card_id", "message", "is_public"]
  );
};

export const _updateCard = (card) => {
  const { user_id, card_id, message, is_public } = card;

  return db("cards").where({ user_id, card_id }).update(
    {
      message,
      is_public,
    },
    ["user_id", "card_id", "message", "is_public"]
  );
};

export const _deleteCard = (card_id) => {
  return db("cards")
    .where({ card_id })
    .del(["user_id", "card_id", "message", "is_public"]);
};

export const _getCardsByUserId = (user_id) => {
  return db("cards")
    .select("user_id", "card_id", "message", "is_public")
    .where({ user_id });
};

export const _getCardsByIds = (ids) => {
  return db("cards")
    .select("user_id", "card_id", "message", "is_public")
    .whereIn("card_id", ids);
};

export const _getAllCards = (offset) => {
  return db("cards")
    .select()
    .where("is_public", true)
    .offset(offset)
    .limit(25);
};
