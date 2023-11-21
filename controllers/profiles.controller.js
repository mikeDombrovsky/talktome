import { _addProfile, _getProfile, _updateProfile } from "../models/profiles";

export const addProfile = async (req, res) => {
  const { user_id } = req.user;
  const { cards, favorites } = req.body;

  try {
    const row = await _addProfile({
      user_id,
      cards,
      favorites,
    });
    res.status(200).json({ msg: row[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const getProfile = async (req, res) => {
  const { user_id, first_name } = req.user;

  try {
    const row = await _getProfile(user_id);
    if (row.length === 0) {
      return res.status(404).json({ msg: "profile not found" });
    }
    const { cards, favorites } = row[0];

    cards = JSON.parse(cards);
    favorites = JSON.parse(favorites);

    res.status(200).json({
      user_id,
      first_name,
      cards,
      favorites,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { user_id, first_name } = req.user;
  const { cards, favorites } = req.body;

  try {
    const row = await _getProfile(user_id);
    if (row.length === 0) {
      return res.status(404).json({ msg: "profile not found" });
    }
    const row2 = await _updateProfile({
      user_id,
      cards,
      favorites,
    });

    res.status(200).json({ msg: row2[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong" });
  }
};
