const pool = require("../db/index");

async function getRestaurantTypes() {
  try {
    const query = `SELECT * FROM "RestaurantTypes"`;
    const restaurantTypes = await pool.query(query);
    return restaurantTypes.rows;
  } catch (error) {
    throw error;
  }
}

async function chooseRestaurantTypes(typeName) {
  try {
    const query = `SELECT * FROM "RestaurantTypes" WHERE typeName = $1`;
    const choosenRestaurantTypes = await pool.query(query, [typeName]);
    return choosenRestaurantTypes.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRestaurantTypes,
};
