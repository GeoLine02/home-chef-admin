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

async function setRestaurantTypes(restaurantId, restaurntTypes) {
  try {
    const restaurntTypesToArry = restaurntTypes.split(",");
    console.log(restaurntTypesToArry);
    const query = `INSERT INTO "RestaurantTypesJunctions" ("restaurantID", "typeID") SELECT $1, unnest($2::int[])`;
    const res = await pool.query(query, [restaurantId, restaurntTypesToArry]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteRestaurantTypesJucntions(restaurantId) {
  try {
    const query = `DELETE FROM "RestaurantTypesJunctions" WHERE "restaurantID" = $1`;
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
