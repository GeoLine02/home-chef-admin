const pool = require("../db/index");

async function getAllRestaurants() {
  try {
    const res = await pool.query(`SELECT * FROM "Restaurants"`);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function getRestaurantByID(restaurantId) {
  try {
    const res = await pool.query(`SELECT * FROM "Restaurants" WHERE id = $1`, [
      restaurantId,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

async function searchRestaurantByName(restaurantName) {
  try {
    const res = await pool.query(
      `SELECT * FROM "Restaurants" WHERE name LIKE '${restaurantName}%'`
    );
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteRestaurantByID(restaurantId) {
  try {
    const deleteRestaurantQuery = `DELETE FROM "Restaurants" WHERE id = $1`;
    const deleteRestaurantTypeJuntionsQuery = `DELETE FROM "RestaurantTypesJunctions" WHERE "restaurantID" = $1`;
    const [restaurantsResult, typesJunctionsResult] = await Promise.all([
      pool.query(deleteRestaurantQuery, [restaurantId]),
      pool.query(deleteRestaurantTypeJuntionsQuery, [restaurantId]),
    ]);
    const restaurants = restaurantsResult.rows[0];
    const typesJunctions = typesJunctionsResult.rows[0];

    return [restaurants, typesJunctions];
  } catch (error) {
    throw error;
  }
}

async function updateRestaurantByID(
  restaurantId,
  { name, address, city, email, phoneNumber, ownerId, img }
) {
  try {
    const query = `UPDATE "Restaurants" SET name = $1, address = $2, city= $3, email = $4, "phoneNumber" = $5, "ownerId" = $6, img = $7 WHERE id = $8`;
    const res = await pool.query(query, [
      name,
      address,
      city,
      email,
      phoneNumber,
      ownerId,
      img,
      restaurantId,
    ]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function createRestaurant({
  name,
  address,
  city,
  email,
  phoneNumber,
  ownerId,
  img,
}) {
  try {
    const query = `INSERT INTO "Restaurants" (name, address, city, email, "phoneNumber", "ownerId", img) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    const res = await pool.query(query, [
      name,
      address,
      city,
      email,
      phoneNumber,
      ownerId,
      img,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllRestaurants,
  createRestaurant,
  searchRestaurantByName,
  getRestaurantByID,
  deleteRestaurantByID,
  updateRestaurantByID,
};
