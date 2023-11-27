import { Router } from "express";
import {
  addCard,
  updateCard,
  deleteCard,
  getCardByUserId,
  getCardsByIds,
  getAllCards,
} from "../controllers/cards.controller.js";

const cards_router = Router();

cards_router.post("/add", addCard);

cards_router.put("/update", updateCard);

cards_router.delete("/delete", deleteCard);

cards_router.get("/byuserid", getCardByUserId);

cards_router.post("/ids", getCardsByIds);

cards_router.post("/all", getAllCards);

export default cards_router;
