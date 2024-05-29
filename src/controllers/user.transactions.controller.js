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

module.exports = {
  getAllTransactions,
};
