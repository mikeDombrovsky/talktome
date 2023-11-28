import { db } from "../config/db.js";

export const _addCard = (card) => {
  const { user_id, message, first_name, phone, is_public, role } = card;

  return db("cards").insert(
    {
      user_id,
      message,
      first_name,
      phone,
      is_public,
      role,
    },
    [
      "user_id",
      "card_id",
      "message",
      "first_name",
      "phone",
      "is_public",
      "role",
    ]
  );
};

export const _updateCard = (card) => {
  const { user_id, card_id, message, is_public, role } = card;

  return db("cards").where({ user_id, card_id }).update(
    {
      message,
      is_public,
      role,
    },
    ["user_id", "card_id", "message", "is_public", "role"]
  );
};

export const _deleteCard = (user_id) => {
  return db("cards")
    .where({ user_id })
    .del(["user_id", "card_id", "message", "is_public", "role"]);
};

export const _getCardByUserId = (user_id) => {
  return db("cards").select().where({ user_id });
};

export const _getCardsByIds = (ids) => {
  return db("cards").select().whereIn("card_id", ids);
};

export const _getAllCards = (offset, role) => {
  return db("cards")
    .select()
    .where("is_public", true)
    .andWhere("role", role)
    .offset(offset)
    .limit(25);
};
