const pool = require("../db/index");

async function createUserAddress(city, street, neighborhood, userID) {
  try {
    const query = `INSERT INTO "UserAddresses" (city, street, neighborhood, "userID") VALUES ($1, $2, $3, $4)`;
    if (!city || !street || !neighborhood || !userID) {
      return "values city, street, neightborhood or userID are missing";
    }

    const res = await pool.query(query, [city, street, neighborhood, userID]);
    if (res) {
      console.log(1);
      return 1;
    } else {
      console.log(0);
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUserAddress,
};
