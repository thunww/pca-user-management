const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.use("/api", userRoutes);

app.use(errorHandler);

module.exports = app;
