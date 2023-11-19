import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth_router from "./routes/auth.route.js";
import authMiddleware from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
//routers
app.use("/auth", auth_router);
//public route
app.get("/home", (req, res) => {
  res.json({msg:"hello!"});
});
//protected route
app.get('/profile', authMiddleware, (req,res) => {
    res.json({msg:`Welcome, ${req.user.name}`})
})

app.listen(process.env.PORT, (err) =>
  console.log(err ? err : "run on " + process.env.PORT)
);
