import { Router } from "express";
import { sendMeEmail } from "../controllers/email.controller.js";

const email_router = Router();

email_router.post("/send", sendMeEmail);

export default email_router;