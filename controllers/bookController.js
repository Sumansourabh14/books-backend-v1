const asyncHandler = require("express-async-handler");
const MyBooks = require("../models/MyBooksModel");

const addToMyBooks = asyncHandler(async (req, res) => {
  const { userId, workId } = req.body;

  if (!userId || !workId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let myBooks = await MyBooks.findOne({ userId });

  if (myBooks) {
    const isBookExists = myBooks.books.find((book) => book.workId === workId);

    if (!!isBookExists) {
      res.status(400);
      throw new Error("Book already exists in MyBooks");
    }

    myBooks.books.push({ workId });
    myBooks = await myBooks.save();

    res.status(201).json({ success: true, myBooks });
  } else {
    // no myBooks collection for user, create new myBooks
    const newBook = await MyBooks.create({
      userId,
      books: [{ workId }],
    });

    res.status(201).json({
      success: true,
      message: "Created new myBooks collection",
      newBook,
    });
  }
});

const getMyBooks = asyncHandler(async (req, res) => {
  const books = await MyBooks.find();

  const myBooks = books[0];

  res.json({
    success: true,
    total: myBooks.books.length,
    myBooks: myBooks.books,
  });
});

const removeFromMyBooks = asyncHandler(async (req, res) => {
  const { userId, workId } = req.body;

  if (!userId || !workId) {
    res.status(400);
    throw new Error("All fields are required");
  }

  let myBooks = await MyBooks.findOne({ userId });

  if (myBooks) {
    const bookIndex = myBooks.books.findIndex((book) => book.workId === workId);

    if (bookIndex === -1) {
      res.status(400);
      throw new Error("Book does not exist in MyBooks");
    }

    myBooks.books.splice(bookIndex, 1); // Remove the book from the array
    myBooks = await myBooks.save();

    res.status(200).json({
      success: true,
      message: "Book has been removed from MyBooks",
      myBooks,
    });
  } else {
    res.status(400);
    throw new Error("The user does not have any collected books");
  }
});

module.exports = { addToMyBooks, getMyBooks, removeFromMyBooks };
