const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // get token
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // find user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorised");
  }
  // if no token, not authorised
  if (!token) {
    res.status(401);
    throw new Error("User unauthorised");
  }
});

module.exports = protect;
