const express = require("express");
const {
  addToMyBooks,
  getMyBooks,
  removeFromMyBooks,
} = require("../controllers/bookController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/add-to-my-books", protect, addToMyBooks);
router.get("/", protect, getMyBooks);
router.delete("/remove-from-my-books", protect, removeFromMyBooks);

module.exports = router;
