import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { Router } from "express";

const auth_router = Router();

const users = [];
const secretKey = "12345";

auth_router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (user) {
    return res.status(409).json({ msg: "username already taken" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, username }, secretKey, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({ msg: "user registered", token });
});

auth_router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user, username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ msg: "invalid credentials" });
  }

  // Generate an access token for the authenticated user
  const token = jwt.sign({ id: user.id, username }, secretKey, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ id: user.id, username }, secretKey, {
    expiresIn: "7d",
  });

  res.cookie("token", token, { httpOnly: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });
  res.status(200).json({ msg: "login success", token });
});

auth_router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ msg: "refresh token not valid" });
  }

  jwt.verify(refreshToken, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "refresh token verification failed" });
    }

    //new access token generation
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    // Set the new access token as an HTTP cookie
    res.cookie("token", accessToken, { httpOnly: true });
    res.status(200).json({msg:'token refreshed', token:accessToken})
  });
});

auth_router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.status(200).json({ msg: "logged out" });
});

export default auth_router;
