import {
  _addFavorite,
  _getFavorites,
  _deleteFavorite,
} from "../models/favorites.js";

export const addFavorite = async (req, res) => {
  const { user_id } = req.user;
  const { card_id } = req.params;
  try {
    const row = await _addFavorite(card_id, user_id);
    return res.status(200).json(row);
  } catch (err) {
    console.log(err);
    return res.status(500).json("oops, something went wrong");
  }
};

export const getFavorites = async (req, res) => {
  const { user_id } = req.user;

  try {
    const row = await _getFavorites(user_id);
    res.status(200).json(row);
  } catch (err) {
    console.log(err);
    res.status(500).json("oops, something went wrong");
  }
};

export const deleteFavorite = async (req, res) => {
  const { user_id } = req.user;
  const { card_id } = req.params;
  try {
    const row = await _deleteFavorite(card_id, user_id);
    return res.status(200).json(row);
  } catch (err) {
    console.log(err);
    return res.status(500).json("oops, something went wrong");
  }
};
