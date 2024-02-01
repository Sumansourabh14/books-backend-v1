const express = require("express");
const { getUsers, getSelfUser } = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/self", protect, getSelfUser);
router.get("/users", getUsers);

module.exports = router;
