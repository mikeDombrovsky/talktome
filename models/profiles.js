import { db } from "../config/db.js";

export const _addProfile = (profile) => {
  const { user_id, cards, favorites } = profile;

  return db("profiles").insert(
    {
      user_id,
      cards,
      favorites,
    },
    ["user_id", "cards", "favorites"]
  );
};

export const _getProfile = (user_id) => {
  return db("profiles")
    .select("user_id", "cards", "favorites")
    .where({ user_id });
};

export const _updateProfile = (profile) => {
  const { user_id, cards, favorites } = profile;

  return db("profiles")
  .where({user_id})
  .update(
    {
      cards: JSON.stringify(cards),
      favorites: JSON.stringify(favorites),
    },
    ["user_id", "cards", "favorites"]
  );
};
