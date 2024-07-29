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
    if (res) {
      console.log("RestaurantAddress", 1);
      return 1;
    } else {
      console.log("RestaurantAddress", 0);
      return 0;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function upateRestaurantAddress(
  restaurantID,
  countryID,
  address,
  latitude,
  longitude,
  city
) {
  try {
    const query = `UPDATE "RestaurantAddress" SET "countryID"=$1, address=$2, latitude=$3, longitude=$4, city=$5 WHERE "restaurantID"=$6`;
    const countryIDToInteger = parseInt(countryID);
    const res = await pool.query(query, [
      countryIDToInteger,
      address,
      latitude,
      longitude,
      city,
      restaurantID,
    ]);
    if (res) {
      console.log("RestaurantAddress", 1);
      return 1;
    } else {
      console.log("RestaurantAddress", 0);
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRestaurantAddress,
  upateRestaurantAddress,
};
