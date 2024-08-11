const pool = require("../db/index");

async function setRestaurantAssets(restaurantID, introImage, coverImage) {
  try {
    const query = `INSERT INTO "RestaurantAssets" ("restaurantID", "introImage", "coverImage") VALUES ($1, $2, $3)`;
    const res = await pool.query(query, [restaurantID, introImage, coverImage]);
    if (res) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateRestaurantAssets(restaurantID, introImage, coverImage) {
  try {
    const query = `UPDATE "RestaurantAssets" SET "introImage" = $2, "coverImage" = 3$ WHERE "restaurantID" = $1`;
    const res = await pool.query(query, [restaurantID, introImage, coverImage]);
    if (res) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  setRestaurantAssets,
  updateRestaurantAssets,
};
