const pool = require("../db/index");
const FilterParamsToSqlSelect = require("../helpers/paramsToSQL");

async function getRestaurants(page, limit, search) {
  try {
    const offset = Number(page - 1) * limit;

    if (typeof page !== "number") {
      console.log(page);
      return `page must be type of number`;
    } else if (typeof limit === "string") {
      return `limit must be type of number`;
    } else if (typeof search !== "string") {
      return `search must be type of string`;
    }

    const filteredQuery = new FilterParamsToSqlSelect(
      "Restaurants",
      search,
      offset,
      limit
    );

    const filteredQueryToSql = filteredQuery.toSqlSelect();

    const filterObj = {};
    search.split(",").forEach((item) => {
      const [key, value] = item.split(":");
      filterObj[key] = value;
    });

    const totalDataCount = `SELECT COUNT(*) FROM "Restaurants"`;
    const [result, totalRecords] = await Promise.all([
      pool.query(filteredQueryToSql[0], filteredQueryToSql[1]),
      pool.query(totalDataCount),
    ]);
    const totalPages = Math.ceil(totalRecords.rows[0].count / limit);

    return {
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        totalRecords: parseInt(totalRecords.rows[0].count),
        totalPages,
      },
      filters: filterObj,
    };
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

async function filterRestaurants({ name, id }) {
  try {
    let query = `SELECT * FROM "Restaurants" WHERE `;
    if (!name && !id) {
      return false;
    }

    const values = [];

    if (name && id) {
      query += "name=$1 AND id=$2";
      values.push(name, +id);
    } else if (name) {
      query += `name ILIKE $1`;
      values.push(name + "%");
    } else if (id) {
      query += "id = $1";
      values.push(+id);
    } else {
      query = "SELECT * FROM Restaurants";
    }
    const res = await pool.query(query, values);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRestaurants,
  createRestaurant,
  searchRestaurantByName,
  getRestaurantByID,
  deleteRestaurantByID,
  updateRestaurantByID,
  filterRestaurants,
};
