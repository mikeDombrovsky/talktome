import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth_router from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import "dotenv/config";
import cards_router from "./routes/cards.route.js";
import favorites_router from "./routes/favorites.route.js";
import email_router from "./routes/email.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

//public route
app.use("/api/auth", auth_router);
app.use("api/sendemail", email_router);

//protected routes
app.use("/api/cards", authMiddleware, cards_router);
app.use("/api/favorites", authMiddleware, favorites_router);


//routes for client
// All other requests not handled before will return our React app
app.use(express.static(path.join(__dirname, "/client/build")));

//for all get requests to server but now front-end copes with it as well
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.SERVER_PORT, (err) =>
    console.log(err ? err : "run on " + process.env.SERVER_PORT)
);
