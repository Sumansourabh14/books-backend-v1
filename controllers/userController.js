const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const getSelfUser = asyncHandler(async (req, res) => {
  res.json({ success: true, self: req.user });
});

const deleteSelfUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    res.status(403);
    throw new Error(
      "Forbidden - You do not have permission to delete this user"
    );
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("User not found.");
  }

  const deletedUser = await User.findByIdAndDelete(id);

  res.json({ success: true, message: "User has been deleted", deletedUser });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.json({ success: true, total: users.length, users });
});

module.exports = { getSelfUser, deleteSelfUser, getUsers };
