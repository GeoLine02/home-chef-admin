const pool = require("../db/index");

async function getAllUsers(page, limit, filterBy, search) {
  try {
    let offset = Number(page - 1) * limit;
    let query = `SELECT * FROM "Users"`;
    const totalDataCount = `SELECT COUNT(*) FROM "Users"`;
    if (filterBy === "id") {
      query += ` WHERE "Users".id = ${search}`;
    }
    if (filterBy && search && filterBy !== "id") {
      query += ` WHERE "${filterBy}" ILIKE '${search}%'`;
    }
    if (limit && page) {
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    const [result, totalRecords] = await Promise.all([
      pool.query(query),
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
    console.log(error);
    throw error;
  }
}

async function getUserByID(userID) {
  try {
    const query = `SELECT "Users".*, "UserAddresses".city, "UserAddresses".street, "UserAddresses".neighborhood FROM "Users" JOIN "UserAddresses" ON "Users".id = "UserAddresses"."userID" WHERE "Users".id = $1`;
    const userByID = await pool.query(query, [userID]);
    return userByID.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function createUser(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  role
) {
  try {
    const query = `INSERT INTO "Users" ("firstName", "lastName", email, "phoneNumber", role, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const res = await pool.query(query, [
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      password,
    ]);

    if (res) {
      return res.rows[0];
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserByID(userID, restaurantID) {
  try {
    const deleteUserQuery = `DELETE FROM "Users" WHERE id = $1`;
    const deleteRestaurantTypeJuntionsQuery = `DELETE FROM "RestaurantTypesJunctions" WHERE "restaurantID" = $1`;
    const [userResult, restaurantTypesResult] = await Promise.all([
      pool.query(deleteUserQuery, [userID]),
      pool.query(deleteRestaurantTypeJuntionsQuery, [restaurantID]),
    ]);

    const user = userResult.rows[0];
    const typesJunction = restaurantTypesResult.rows[0];
    return [user, typesJunction];
  } catch (error) {
    throw error;
  }
}

async function updateUserByID(
  { email, firstName, lastName, phoneNumber },
  userID
) {
  try {
    const query = `UPDATE "Users" SET email = $1, "firstName" = $2, "lastName" = $3, "phoneNumber" = $4  WHERE id = $5 RETURNING *`;
    const res = await pool.query(query, [
      email,
      firstName,
      lastName,
      phoneNumber,
      userID,
    ]);
    console.log(res.rows);
    return res.rows;
  } catch (error) {
    console.log(error);
  }
}

async function updateUserStatus(isUserActive, userID) {
  try {
    const query = `UPDATE "Users" SET "isAccountActive" = $1 WHERE id = $2`;
    const res = await pool.query(query, [isUserActive, userID]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function searchUserByID(userID) {
  try {
    const res = await pool.query(
      `SELECT * FROM "Users" WHERE id LIKE '${userID}%'`
    );
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUserByID,
  updateUserByID,
  updateUserStatus,
  searchUserByID,
};
