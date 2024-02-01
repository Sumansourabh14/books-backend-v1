const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// @desc  Register new user
// @route POST /api/v1/register
// @access  Public
const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // check if user exists in the db
  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password using 'bcrypt'
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({ name, email, password: hashedPassword });

  if (user) {
    res.status(201).json({
      success: true,
      message: "User registered!",
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Login a user
// @route POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // find the user in the db
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = generateToken(user.id);

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { signUp, login };
