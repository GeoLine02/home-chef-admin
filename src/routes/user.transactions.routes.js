const express = require("express");
const router = express.Router();
const userTransactionsController = require("../controllers/user.transactions.controller");

router.get("/", userTransactionsController.getAllTransactions);

module.exports = router;
