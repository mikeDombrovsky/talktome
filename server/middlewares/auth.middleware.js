import jwt from "jsonwebtoken";

const secretKey = "12345";

function authenticate2(req, res, next) {
  const accessToken = req.cookies.token;
  const refreshToken = req.cookies.refreshtoken;

  if (!accessToken) {
    return res.status(401).json({ msg: "token not found" });
  }
  // Attempt to refresh the access token using the refresh token
  jwt.verify(refreshToken, secretKey, (err, user) => {
    //if token invalid
    if (err) {
      //if refresh token invalid - access denied
      if (!refreshToken) {
        return res.status(403).json({ msg: "invalid refresh token" });
      }

      //new access token generation
      const newToken = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      //set to cookie
      res.cookie("token", newToken, { httpOnly: true });
    }
    //attach user obj to request
    req.user = user;
    next();
  });
}

export default authenticate2;
