import { db } from "../config/db.js";

export const _addFavorite = (card_id, user_id) => {
  return db("favorites").insert(
    {
      card_id,
      user_id,
    },
    ["card_id", "user_id"]
  );
};

export const _getFavorites = (user_id) => {
  return db("favorites")
    .select(
      "cards.card_id",
      "cards.user_id",
      "cards.message",
      "cards.first_name",
      "cards.phone",
      "cards.is_public",
      "cards.role"
    )
    .join("cards", "favorites.card_id", "cards.card_id")
    .where({ "favorites.user_id": user_id });
};

export const _deleteFavorite = (card_id, user_id) => {
  return db("favorites")
    .where({ card_id, user_id })
    .del(["card_id", "user_id"]);
};
