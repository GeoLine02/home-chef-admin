const pool = require("../db/index");

async function setIntroImage(restaurantID, introImage) {
  try {
    const query = `INSERT INTO "RestaurantAssets" ("restaurantID", "introImage") VALUES ($1, $2) RETURNING *`;
    const res = await pool.query(query, [restaurantID, introImage]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function updateIntroImage(restaurantID, introImage) {
  try {
    const query = `UPDATE "RestaurantAssets" SET "introImage" = $2 WHERE "restaurantID" = $1`;
    const res = await pool.query(query, [restaurantID, introImage]);
    if (res) {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

async function setCoverImage(restaurantID, coverImage) {
  try {
    const query = `INSERT INTO "RestaurantAssets" ("restaurantID", "coverImage") VALUES ($1, $2) RETURNING *`;
    const res = await pool.query(query, [restaurantID, coverImage]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function updateCoverImage(restaurantID, coverImage) {
  try {
    const query = `UPDATE "RestaurantAssets" SET "coverImage" = $2 WHERE "restaurantID" = $1`;
    const res = await pool.query(query, [restaurantID, coverImage]);
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
  setIntroImage,
  setCoverImage,
  updateIntroImage,
  updateCoverImage,
};
