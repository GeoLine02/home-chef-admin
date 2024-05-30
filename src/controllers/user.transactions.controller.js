const userTransactionsService = require("../services/user.transactions.service");

const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await userTransactionsService.getAllTransactions();
    res.status(200).json(allTransactions);
  } catch (error) {
    if (res.status(404)) {
      res.json({ message: "failed to fetch transactions data" });
    } else if (res.status(500)) {
      res.json({ message: "internal server error" });
    }
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.body;
    const transactionById =
      await userTransactionsService.getTransactionById(id);
    res.status(200).json(transactionById);
  } catch (error) {
    if (res.status(404)) {
      res.json({ message: `transaction with ${id} does not exists` });
    } else if (res.status(500)) {
      res.json({ message: "internal server error" });
    }
  }
};

module.exports = {
  getAllTransactions,
  getTransactionById,
};
