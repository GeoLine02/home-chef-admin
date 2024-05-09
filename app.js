require("dotenv").config();

const express = require("express");
const app = express();

const {
  app: { port },
} = require("./src/config/index");

app.listen(port, () => console.log(`App is up and working on port ${port}`));
