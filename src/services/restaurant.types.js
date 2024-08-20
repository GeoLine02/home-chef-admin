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
    const query = `INSERT INTO "RestaurantTypesJunctions" ("restaurantID", "typeID") SELECT $1, unnest($2::int[])`;
    const res = await pool.query(query, [restaurantId, restaurntTypes]);
    if (res) {
      console.log("RestaurantTypesJunctions", 1);
      return 1;
    } else {
      console.log("RestaurantTypesJunctions", 0);
      return 0;
    }
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function updateRestaurantTypes(restaurantID, restaurntTypes) {
  try {
    const parsedRestaurantTypes = JSON.parse(restaurntTypes);

    const existingRestaurantTypesResult = await pool.query(
      `SELECT "typeID" FROM "RestaurantTypesJunctions" WHERE "restaurantID" = $1`,
      [restaurantID]
    );

    const existingTypeIDs = existingRestaurantTypesResult.rows.map(
      (row) => row.typeID
    );

    const typesToAdd = parsedRestaurantTypes.filter(
      (typeID) => !existingTypeIDs.includes(typeID)
    );

    const typesToRemove = parsedRestaurantTypes.filter(
      (typeID) => !existingTypeIDs.includes(typeID)
    );

    if (typesToRemove.length) {
      await pool.query(
        `DELETE FROM "RestaurantTypesJunctions" WHERE "restaurantID" = $1 AND "typeID" = ANY($2::int[])`,
        [restaurantID, typesToRemove]
      );
    }

    if (typesToAdd.length) {
      const values = typesToAdd
        .map((typeID) => `(${restaurantID}, ${typeID})`)
        .join(",");
      await pool.query(
        `INSERT INTO "RestaurantTypesJunctions" ("restaurantID", "typeID") VALUES ${values}`
      );
    }

    console.log("restaurant types updated successfully");

    return 1;
  } catch (error) {
    console.log(error);
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
  updateRestaurantTypes,
  deleteRestaurantTypesJucntions,
};
