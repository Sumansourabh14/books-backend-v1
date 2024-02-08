const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(
  cors({
    origin: [process.env.FRONTEND_URI, process.env.LIVE_FRONTEND_URI],
  })
);

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDatabase = require("./config/connectDb");
const errorHandler = require("./middlewares/errorMiddleware");

connectDatabase();

const PORT = process.env.PORT || 6011;

// accept req.body
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
