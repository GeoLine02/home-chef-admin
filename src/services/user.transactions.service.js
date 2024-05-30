const pool = require("../db/index");

async function getAllTransactions() {
  try {
    const query = `SELECT * FROM "PaymentTransactions"`;
    const transactions = await pool.query(query);
    return transactions.rows;
  } catch (error) {
    throw error;
  }
}

async function getTransactionById(userId) {
  try {
    const query = `SELECT * FROM "PaymentTransactions" WHERE "userID" = $1`;
    const transactionById = await pool.query(query, [userId]);
    return transactionById.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
};
