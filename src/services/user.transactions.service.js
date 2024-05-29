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

module.exports = {
  getAllTransactions,
};
