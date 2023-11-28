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
    .join("cards", "favorites.card_id", "cards.card_id")
    .select("*")
    .where({ user_id });
};

export const _deleteFavorite = (card_id, user_id) => {
  return db("favorites").where({ card_id, user_id }).del(["card_id", "user_id"]);
};
