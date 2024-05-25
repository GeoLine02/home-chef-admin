const pool = require("../db/index");

async function setRestaurantTypes(restaurantId, restaurantTypes) {
  try {
    const query = `INSERT INTO "RestaurantTypesJunctions" (restaurantId, restaurantTypes) VALUES (${restaurantId}, ${restaurantTypes})`;
    restaurantTypes.map(async (typeID) => {
      const res = await pool.query(query, [restaurantId, typeID]);
      return res.rows;
    });
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  setRestaurantTypes,
};
