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

async function setRestaurantTypes(restaurantId, types) {
  try {
    const query = `INSERT INTO "RestaurantTypesJunctions" (restaurantID, typeID) VALUES (${(restaurantId, typeID)})`;
    types.map(async (type) => {
      const restaurantType = await pool.query(query, [restaurantId, type]);
      return restaurantType.rows;
    });
  } catch (error) {
    throw error;
  }
}

async function deleteRestaurantTypesJucntions(restaurantId) {
  try {
    const query = `DELETE FROM "RestaurantTypesJucntions" WHERE restaurantID = $1`;
    const deletedTypeJucntion = await pool.query(query, [restaurantId]);
    return deletedTypeJucntion.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRestaurantTypes,
  setRestaurantTypes,
  deleteRestaurantTypesJucntions,
};
