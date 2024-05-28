const pool = require("../db/index");

async function setActiveHours(restaurantID, workingFrom, workingTill) {
  try {
    const query = `INSERT INTO "RestaurantSettings" ("restaurantID", "workingFrom", "workingTill") VALUES ($1, $2, $3)`;
    const res = await pool.query(query, [
      restaurantID,
      workingFrom,
      workingTill,
    ]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function setWorkingDays(workingDays) {
  try {
    const query = `INSERT INTO "Restaurants" ("workingDays") VALUES (${workingDays})`;
    const res = await pool.query(query, [workingDays]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function getWorkingDays() {
  try {
    const query = `SELECT * FROM "RestaurantWorkingDays"`;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function changeRestaurantStatus(isActive, restaurantId) {
  try {
    const query = `UPDATE "RestaurantSettings" SET "isRestaurantActive" = $1 WHERE id = $2`;
    const res = await pool.query(query, [isActive, restaurantId]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  setActiveHours,
  setWorkingDays,
  getWorkingDays,
  changeRestaurantStatus,
};
