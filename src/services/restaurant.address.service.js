const pool = require("../db/index");

async function createRestaurantAddress(
  restaurantID,
  countryID,
  address,
  latitude,
  longitude,
  city
) {
  try {
    const query = `INSERT INTO "RestaurantAddress" ("restaurantID", "countryID", address, latitude, longitude, city) VALUES ($1, $2, $3, $4, $5, $6)`;
    const res = await pool.query(query, [
      restaurantID,
      countryID,
      address,
      latitude,
      longitude,
      city,
    ]);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createRestaurantAddress,
};
