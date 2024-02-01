const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const getSelfUser = asyncHandler(async (req, res) => {
  console.log(`req.user: `, req.user);

  res.json({ success: true, self: req.user });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.json({ success: true, total: users.length, users });
});

module.exports = { getSelfUser, getUsers };
