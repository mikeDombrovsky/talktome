import Router from "express";
import {sendEmail} from "../controllers/email.controller.js";

const email_router = Router();

email_router.post("/email", sendEmail);

export default email_router;