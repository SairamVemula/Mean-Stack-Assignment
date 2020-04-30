const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // const token = req.header("X-Auth-Header");
  // const token = req.headers["X-Auth-Header"].split(" ")[1];
  // const token = req.headers["Authorization"].split(" ")[1];
  // console.log(req.token);
  const token = req.token;
  if (!token)
    return res
      .status(401)
      .send({ success: false, message: "Access Denied No Token Provied" });
  // console.log("in auth.js");
  try {
    const user = jwt.verify(token, config.get("jwtPrivateKey"));
    // console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ success: false, message: "Invalid Token \n" + err });
  }
};
