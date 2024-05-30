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

async function getTransactionById(id) {
  try {
    const query = `SELECT * FROM "PaymentTransactions" WHERE id = $1`;
    const transactionById = await pool.query(query, [id]);
    return transactionById.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllTransactions,
  getTransactionById,
};
