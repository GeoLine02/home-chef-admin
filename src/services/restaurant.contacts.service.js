const pool = require("../db/index");

async function createRestauratContacts(restaurantID, email, phone) {
  try {
    const query = `INSERT INTO "RestaurantContacts" ("restaurantID", email, phone) VALUES ($1, $2, $3)`;

    if (!restaurantID) {
      return "restaurant id is required";
    }
    if (!email) {
      return "email is required";
    }
    if (!phone) {
      return "phone number is required";
    }

    const res = await pool.query(query, [restaurantID, email, phone]);
    if (res) {
      console.log("restauurantContacts", 1);
      return 1;
    } else {
      console.log("restaurantContacts", 0);
      return 0;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateRestaurantContacts(restaurantID, email, phone) {
  try {
    console.log(restaurantID, email, phone);
    const query = `UPDATE "RestaurantContacts" SET email=$1, phone=$2 WHERE "restaurantID"=$3`;

    if (!restaurantID) {
      return "restaurant id is required";
    }
    if (!email) {
      return "email is required";
    }
    if (!phone) {
      return "phone number is required";
    }

    const res = await pool.query(query, [email, phone, restaurantID]);
    if (res) {
      console.log("restaurantContacts", 1);
      return 1;
    } else {
      console.log("restaurantContacts", 0);
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createRestauratContacts,
  updateRestaurantContacts,
};
