const express = require("express");
const {
  getUsers,
  getSelfUser,
  deleteSelfUser,
} = require("../controllers/userController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/self", protect, getSelfUser);
router.delete("/deleteSelf/:id", protect, deleteSelfUser);
router.get("/users", getUsers);

module.exports = router;
