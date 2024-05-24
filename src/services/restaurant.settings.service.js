const pool = require("../db/index");

async function setActiveHours(workingFrom, workingTill) {
  try {
    const query = `INSERT INTO "RestaurantSettings" (workingFrom, workingTill) VALUES (${workingFrom}, ${workingTill})`;
    const res = await pool.query(query, [activeFrom, activeTill]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  setActiveHours,
};
