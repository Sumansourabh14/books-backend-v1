const express = require("express");
const { signUp, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", signUp);
router.post("/auth/login", login);

module.exports = router;
