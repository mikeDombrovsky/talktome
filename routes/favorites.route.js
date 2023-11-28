import { Router } from "express";
import {
  addFavorite,
  deleteFavorite,
  getFavorites,
} from "../controllers/favorites.controller";

const favorites_router = Router();

favorites_router.post("/add/:card_id", addFavorite);

favorites_router.get("/all", getFavorites);

favorites_router.delete("/:card_id", deleteFavorite);

export default favorites_router;