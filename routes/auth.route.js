import { Router } from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/users.controller.js";

const auth_router = Router();

auth_router.post("/register", register);

auth_router.post("/login", login);

auth_router.post("/refresh", refresh);

auth_router.post("/logout", logout);

export default auth_router;
