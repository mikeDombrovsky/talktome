import { Router } from "express";
import {
  addCard,
  updateCard,
  deleteCard,
  getCardsByUserId,
  getCardsByIds,
} from "../controllers/cards.controller.js";

const cards_router = Router();

cards_router.post("/add", addCard);

cards_router.put("/update", updateCard);

cards_router.delete("/delete", deleteCard);

cards_router.get("/users", getCardsByUserId);

cards_router.post("/ids", getCardsByIds);

export default cards_router;
