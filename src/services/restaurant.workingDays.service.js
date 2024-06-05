const pool = require("../db/index");

async function getWorkingDays() {
  try {
    const query = `SELECT * FROM "RestaurantWorkingDays"`;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function setWorkingDays(restaurantId, workingDays) {
  console.log("workingDaysType", Array.isArray(workingDays));
  try {
    const query = `INSERT INTO "RestaurantWorkingDaysJunctions" ("restaurantID", "workingDaysID") SELECT $1, unnest($2::int[])`;
    const res = await pool.query(query, [restaurantId, workingDays]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function updateWorkingDays(restaurantId, workingDays) {
  try {
    const query = `UPDATE "RestaurantWorkingDaysJunctions" AS r
    SET "restaurantID" = :restaurant_id
    FROM unnest(:working_days_ids::int[]) AS u("workingDaysID")
    WHERE r."workingDaysID" = u."workingDaysID"`;
    const res = await pool.query(query, [restaurantId, workingDays]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteWokringDays(restaurantId) {
  try {
    const query = `DELETE FROM "RestaurantWorkingDaysJunctions" WHERE "RestaurantID" = $1`;
    const res = await pool.query(query, [restaurantId]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

// async function setWorkingDayss(restaurantId, workingDays) {
//   try {
//     //     INSERT INTO "RestaurantWorkingDaysJunctions" ("restaurantID", "workingDaysID")
//     // VALUES (1, 101), (1, 102), (2, 103), (3, 101);

//     const sumWithInitial = workingDays.reduce(
//       (accumulator, currentValue) =>
//         accumulator + `(${restaurantId},${currentValue}),`,
//       ""
//     );

//     console.log(sumWithInitial);

//     const query = `INSERT INTO "RestaurantWorkingDaysJunctions" ("restaurantID", "workingDaysID") VALUES ${sumWithInitial.replace(/,(\s+)?$/, "")};`;
//     console.log(query);
//     // const values = workingDays.map((day) => [restaurantId, day]);
//     // console.log(values);
//     const res = await pool.query(query);
//     return res.rows;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  getWorkingDays,
  setWorkingDays,
  updateWorkingDays,
  deleteWokringDays,
};
