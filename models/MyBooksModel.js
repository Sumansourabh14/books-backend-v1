const mongoose = require("mongoose");

const myBooksSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    books: [
      {
        workId: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MyBooks = mongoose.model("my-book", myBooksSchema);
module.exports = MyBooks;
