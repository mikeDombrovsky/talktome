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
app.use("/api/auth", auth_router);
//public route
app.get("/api/home", (req, res) => {
  res.json({ msg: "hello!" });
});
//protected route
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({ msg: `Welcome, ${req.body.user_name}` });
});

//routes for client
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// All other GET requests not handled before will return our React app
app.listen(process.env.PORT, (err) =>
  console.log(err ? err : "run on " + process.env.PORT)
);
