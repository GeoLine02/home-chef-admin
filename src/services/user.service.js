const pool = require("../db/index");

async function getAllUsers() {
  try {
    const query = `SELECT * FROM "Users"`;
    const usersList = await pool.query(query);
    return usersList.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByID(userID) {
  try {
    const query = `SELECT * FROM "Users" WHERE id = $1`;
    const userByID = await pool.query(query, [userID]);
    return userByID.rows[0];
  } catch (error) {
    throw error;
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
  { email, firstName, lastName, phoneNumber, isAccountActive, role },
  userID
) {
  try {
    const query = `UPDATE "Users" SET email = $1, "firstName" = $2, "lastName" = $3, "phoneNumber" = $4, "isAccountActive" = $5, role = $6 WHERE id = $7`;
    const res = await pool.query(query, [
      email,
      firstName,
      lastName,
      phoneNumber,
      isAccountActive,
      role,
      userID,
    ]);
    return res.rows;
  } catch (error) {
    throw error;
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
  deleteUserByID,
  updateUserByID,
  updateUserStatus,
  searchUserByID,
};
