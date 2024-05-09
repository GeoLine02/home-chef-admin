const express = require("express");
const router = express.Router();
const { rba } = require("../middleware/rba");

router.post("/login", rba([]), (req, res) => {
  try {
  } catch (error) {
    res.status(500).send();
  }
});
