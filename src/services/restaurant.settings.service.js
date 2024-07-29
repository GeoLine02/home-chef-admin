const pool = require("../db/index");

async function setActiveHours(restaurantID, workingFrom, workingTill) {
  try {
    const query = `INSERT INTO "RestaurantSettings" ("restaurantID", "workingFrom", "workingTill") VALUES ($1, $2, $3)`;
    const res = await pool.query(query, [
      restaurantID,
      workingFrom,
      workingTill,
    ]);
    if (res) {
      console.log("restaurantSettings", 1);
      return 1;
    } else {
      console.log("restaurantSettings", 0);
      return 0;
    }
  } catch (error) {
    throw error;
  }
}

async function updateActiveHours(restaurantID, workingFrom, workingTill) {
  try {
    const query = `UPDATE "RestaurantSettings" SET "workingFrom"=$2, "workingTill"=$3 WHERE "restaurantID"=$1`;
    const res = await pool.query(query, [
      restaurantID,
      workingFrom,
      workingTill,
    ]);

    if (res) {
      console.log("activeHours", 1);
      return 1;
    } else {
      console.log("activeHours", 0);
      return 0;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function deleteActiveHours(restaurantID) {
  try {
    const query = `DELETE FROM "RestaurantSettings" WHERE "restaurantID" = $1`;
    const res = await pool.query(query, [restaurantID]);
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
  updateActiveHours,
  deleteActiveHours,
  changeRestaurantStatus,
};
