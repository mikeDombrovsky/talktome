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
      "card_id",
      "user_id",
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
    [
      "card_id",
      "user_id",
      "message",
      "first_name",
      "phone",
      "is_public",
      "role",
    ]
  );
};

export const _deleteCard = (user_id) => {
  return db("cards")
    .where({ user_id })
    .del([
      "card_id",
      "user_id",
      "message",
      "first_name",
      "phone",
      "is_public",
      "role",
    ]);
};

export const _getCardByUserId = (user_id) => {
  return db("cards").select().where({ user_id });
};

export const _getCardsByIds = (ids) => {
  return db("cards").select().whereIn("card_id", ids);
};

export const _getAllCards = async (offset, role, user_id) => {
  const row = await db("cards")
    .select()
    .count("user_id")
    .whereRaw(
      "cards.card_id NOT IN (SELECT favorites.card_id FROM favorites WHERE favorites.user_id = ?)",
      [user_id]
    )
    .andWhere("cards.is_public", true)
    .andWhere("cards.role", role);

  const size  = row[0].count;
  console.log(size, row);

  const cards = await db("cards")
    .select(
      "cards.card_id",
      "cards.user_id",
      "cards.message",
      "cards.first_name",
      "cards.phone",
      "cards.is_public",
      "cards.role"
    )
    .whereRaw(
      "cards.card_id NOT IN (SELECT favorites.card_id FROM favorites WHERE favorites.user_id = ?)",
      [user_id]
    )
    .andWhere("cards.is_public", true)
    .andWhere("cards.role", role)
    .offset(offset)
    .limit(12);

  return { size, cards };
};
