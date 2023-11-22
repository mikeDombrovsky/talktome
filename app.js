import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth_router from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//routers
//public route
app.use("/api/auth", auth_router);

//protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ msg: `Welcome, ${req.body.user.user_name}`, user: req.body.user });
});

//routes for client
// All other requests not handled before will return our React app
app.use(express.static(path.join(__dirname, "/client/build")));

//for all get requests to server but now front-end copes with it as well
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(process.env.PORT, (err) =>
  console.log(err ? err : "run on " + process.env.PORT)
);
