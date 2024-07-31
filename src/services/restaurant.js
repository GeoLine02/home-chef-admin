const pool = require("../db/index");

async function getRestaurants(page, limit, filterBy, search) {
  try {
    let offset = Number(page - 1) * limit;

    let restaurantsQuery = `SELECT "Restaurants".*, "RestaurantContacts".email, "RestaurantContacts".phone FROM"Restaurants" JOIN "RestaurantContacts" ON "Restaurants".id = "RestaurantContacts"."restaurantID"`;

    const totalDataCount = `SELECT COUNT(*) FROM "Restaurants"`;

    if (filterBy === "id") {
      restaurantsQuery += ` WHERE "Restaurants".${filterBy} = ${search}`;
    } else if (filterBy === "ownerId") {
      restaurantsQuery += ` WHERE "Restaurants"."${filterBy}" = ${search}`;
    }

    if (filterBy && search && filterBy !== "id" && filterBy !== "ownerId") {
      restaurantsQuery += ` WHERE ${filterBy} ILIKE '${search}%'`;
    }

    if (limit && page) {
      restaurantsQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }

    const [result, totalRecords] = await Promise.all([
      pool.query(restaurantsQuery),
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
    };
  } catch (error) {
    throw error;
  }
}

async function getRestaurantByID(restaurantId) {
  try {
    const query = `
    SELECT 
        "Restaurants".*, 
        "RestaurantContacts".*, 
        "RestaurantAddress".*,
        "RestaurantSettings".*, 
        (
            SELECT array_agg("RestaurantWorkingDaysJunctions"."workingDaysID")
            FROM "RestaurantWorkingDaysJunctions"
            WHERE "RestaurantWorkingDaysJunctions"."restaurantID" = "Restaurants".id
        ) as "workingDays",
        (
            SELECT array_agg("RestaurantTypesJunctions"."typeID")
            FROM "RestaurantTypesJunctions"
            WHERE "RestaurantTypesJunctions"."restaurantID" = "Restaurants".id
        ) as "restaurantTypes"
    FROM "Restaurants"
    JOIN "RestaurantContacts" ON "Restaurants".id = "RestaurantContacts"."restaurantID"
    JOIN "RestaurantAddress" ON "Restaurants".id = "RestaurantAddress"."restaurantID"
    JOIN "RestaurantSettings" ON "Restaurants".id = "RestaurantSettings"."restaurantID"
    WHERE "Restaurants".id = $1;
`;
    const res = await pool.query(query, [restaurantId]);
    return res.rows[0];
  } catch (error) {
    console.log(error);
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
    console.log(error);
    throw error;
  }
}

async function updateRestaurantByID(restaurantId, { name, ownerId, img }) {
  try {
    const query = `UPDATE "Restaurants" SET name = $1, "ownerId" = $2, img = $3 WHERE id = $4`;
    const res = await pool.query(query, [name, ownerId, img, restaurantId]);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function createRestaurant({ name, ownerId, img }) {
  try {
    const ownerIDToInteger = parseInt(ownerId);
    const query = `INSERT INTO "Restaurants" (name, "ownerId", img) VALUES ($1, $2, $3) RETURNING *`;
    const res = await pool.query(query, [name, ownerIDToInteger, img]);
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
