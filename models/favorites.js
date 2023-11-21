import { db } from "../config/db.js";

export const _addFavorite = (card_id, user_id) => {

  return db("favorites").insert(
    {
      card_id,
      user_id,
    },
    ["user_id", "card_id", "favorites"]
  );
};

export const _getFavorites = (user_id) => {
  return db("favorites")
    .select("user_id", "card_id")
    .where({ user_id });
};

export const _deleteFavorite = (card_id) => {

  return db("favorites")
    .where({ card_id })
    .del(["user_id", "cards", "favorites"]);
};
