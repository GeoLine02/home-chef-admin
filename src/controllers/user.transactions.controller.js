const userTransactionsService = require("../services/user.transactions.service");

const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await userTransactionsService.getAllTransactions();
    res.status(200).json(allTransactions);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getTransactionById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(404).send(`user with ID${userId} does not exist`);
    }
    const transactionById =
      await userTransactionsService.getTransactionById(userId);
    res.status(200).json(transactionById);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
};
