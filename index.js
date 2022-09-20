require("express-async-errors");
require("dotenv").config();
const cors = require("cors");

const orders = require("./routes/orders");

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use("api/orders", orders);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});