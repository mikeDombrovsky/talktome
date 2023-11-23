import jwt from "jsonwebtoken";

function authenticate(req, res, next) {
  const accessToken = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ msg: "token not found" });
  }
  // Attempt to refresh the access token using the refresh token
  const secret = process.env.SECRET;
  jwt.verify(refreshToken, secret, (err, user) => {
    //if token invalid
    if (err) {
      //if refresh token invalid - access denied
      if (!refreshToken) {
        return res.status(403).json({ msg: "invalid refresh token" });
      }

      //new access token generation
      const user_id = user.user_id;
      const first_name = user.first_name;
      const newToken = jwt.sign({ user_id, first_name }, secret, {
        expiresIn: "60s",
      });

      //set to cookie
      res.cookie("token", newToken, { httpOnly: true, maxAge: 1000 * 60 });
    }
    //attach user obj to request
    req.user = user;
    next();
  });
}

export default authenticate;
