const jwt = require("jsonwebtoken");
const User = require("../model/UserModel.js");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.SALT);
    console.log("decoded: ", decoded);
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      res.status(401);
      next(new Error("Authentication Error"));
    }
    req.userData = user;
    req.userToken = token;
    next();
  } catch (error) {
    console.log("auth error =>", error);
    next(error);
  }
};

module.exports = auth;
