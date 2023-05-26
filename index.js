const express = require("express");

const app = express();
const PORT = 8000;

// middlewares
app.use(express.json());

// routes

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
