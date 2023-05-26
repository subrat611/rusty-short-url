const express = require("express");
const connectDB = require("./config/mongodb");

const urlrouter = require("./routes/url.route");

const app = express();
const PORT = 8000;

connectDB("mongodb://localhost:27017/short-url").then(() =>
  console.log(`Database connected`)
);

// middlewares
app.use(express.json());

// routes
app.use("/url", urlrouter);

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
