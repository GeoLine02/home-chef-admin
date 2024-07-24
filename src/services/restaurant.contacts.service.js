const pool = require("../db/index");

async function createRestauratContacts(restaurantID, email, phone) {
  try {
    const query = `INSERT INTO "RestaurantContacts" ("restaurantID", email, phone) VALUES ($1, $2, $3)`;

    if (!restaurantID) {
      return "restaurnat id is required";
    }
    if (!email) {
      return "email is required";
    }
    if (!phone) {
      return "phone number is required";
    }

    const res = await pool.query(query, [restaurantID, email, phone]);
    return res.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createRestauratContacts,
};
