import { _login, _register } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { role, first_name, last_name, email, password, phone } = req.body;
  console.log(req.body);
  try {
    //try to add user to db, error if email and phone not unique
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password + "", salt);
    const row = await _register({
      role,
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
    });
    //create new 1 hour access token
    const secret = process.env.SECRET;
    const user_id = row[0].user_id;

    const token = jwt.sign({ user_id, first_name }, secret, {
      expiresIn: "1h",
    });
    //set token to server cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 });
    res.status(201).json({ msg: "user registered", token });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "email or phone already exist" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const lower_email = email.toLowerCase();
    //find in db user with this email, return arr
    const row = await _login(lower_email);
    if (row.length === 0) {
      return res.status(404).json({ msg: "wrong credentials" });
    }
    const match = await bcrypt.compare(password + "", row[0].password);

    if (!match) {
      return res.status(404).json({ msg: "wrong credentials" });
    }
    //create new access token
    const user_id = row[0].user_id;
    const first_name = row[0].first_name;
    const secret = process.env.SECRET;

    const accessToken = jwt.sign({ user_id, first_name }, secret, {
      expiresIn: "60s",
    });
    //create new refresh token
    const refreshToken = jwt.sign({ user_id, first_name }, secret, {
      expiresIn: "7d",
    });
    //set tokens to server cookie
    res.cookie("token", accessToken, { httpOnly: true, maxAge: 1000 * 60 });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.json({ token: accessToken });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "something went wrong" });
  }
};

export const refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  //if user didn't login for a week
  if (!refreshToken) {
    return res.status(401).json({ msg: "refresh token expired" });
  }
  //verify if 7day token is valid
  const secret = process.env.SECRET;
  jwt.verify(refreshToken, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "refresh token verification failed" });
    }

    //new access 1 hour token generation
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      secret,
      { expiresIn: "1h" }
    );

    // Set the new access token as an HTTP cookie
    res.cookie("token", accessToken, { httpOnly: true });
    res.status(200).json({ msg: "token refreshed", token: accessToken });
  });
};

export const logout = (req, res) => {
  //remove tokens from server cookie
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "logged out" });
};
