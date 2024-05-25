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

async function setWorkingDays(workingDays) {
  try {
    const query = `INSERT INTO "Restaurants" (workingDays) VALUES (${workingDays})`;
    const res = await pool.query(query, [workingDays]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function changeRestaurantStatus(isActive, restaurantId) {
  try {
    const query = `UPDATE "Restaurants" SET "isActive" = $1 WHERE id = $2`;
    const res = await pool.query(query, [isActive, restaurantId]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  setActiveHours,
  setWorkingDays,
  changeRestaurantStatus,
};
