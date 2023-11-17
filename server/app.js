import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get('/',async (req, res) => {
    
    res.send('fart');
})

app.listen(process.env.PORT, (err) =>
  console.log(err ? err : "run on " + process.env.PORT)
);
