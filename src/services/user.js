const pool = require("../db/index");

async function authUser(email, password) {
  try {
    if (!email || !password) {
      throw new Error("please provide credentials");
    }

    const res = await pool.query(`SELECT * FROM Users WHERE Email`);
  } catch (error) {
    throw error;
  }
}
