import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
  getInfo,
} from "../controllers/users.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const auth_router = Router();

auth_router.post("/register", register);

auth_router.post("/login", login);

auth_router.post("/refresh", refresh);

auth_router.post("/logout", logout);

auth_router.get("/info", authMiddleware, getInfo);

export default auth_router;
