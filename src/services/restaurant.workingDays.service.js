const pool = require("../db/index");

async function getWorkingDays() {
  try {
    const query = `SELECT * FROM "Days"`;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function setWorkingDays(restaurantId, workingDays) {
  try {
    const parsedWorkingDays = JSON.parse(workingDays);
    const query = `INSERT INTO "RestaurantWorkingDaysJunctions" ("restaurantID", "workingDaysID") SELECT $1, unnest($2::int[])`;
    const res = await pool.query(query, [restaurantId, parsedWorkingDays]);
    if (res) {
      console.log("RestaurantWorkingDaysJunctions", 1);
      return 1;
    } else {
      console.log("RestaurantWorkingDaysJunctions", 0);
      return 0;
    }
  } catch (error) {
    throw error;
  }
}

async function updateWorkingDays(restaurantId, workingDays) {
  try {
    const existingWorkingDaysResult = await pool.query(
      'SELECT "workingDaysID" FROM "RestaurantWorkingDaysJunctions" WHERE "restaurantID" = $1',
      [restaurantId]
    );

    const existingDayIDs = existingWorkingDaysResult.rows.map(
      (row) => row.workingDaysID
    );

    // Determine the days to add and to remove
    const daysToAdd = workingDays.filter(
      (dayID) => !existingDayIDs.includes(dayID)
    );
    const daysToRemove = existingDayIDs.filter(
      (dayID) => !workingDays.includes(dayID)
    );

    // Remove the old working days that are not in the new list
    if (daysToRemove.length > 0) {
      await pool.query(
        'DELETE FROM "RestaurantWorkingDaysJunctions" WHERE "restaurantID" = $1 AND "workingDaysID" = ANY($2::int[])',
        [restaurantId, daysToRemove]
      );
    }

    // Add the new working days that are not in the existing list
    if (daysToAdd.length > 0) {
      const values = daysToAdd
        .map((dayID) => `(${restaurantId}, ${dayID})`)
        .join(",");
      await pool.query(
        `INSERT INTO "RestaurantWorkingDaysJunctions" ("restaurantID", "workingDaysID") VALUES ${values}`
      );
    }

    console.log("workingDays updated successfully");

    return 1;
  } catch (error) {
    console.log(error);
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

module.exports = {
  getWorkingDays,
  setWorkingDays,
  updateWorkingDays,
  deleteWokringDays,
};
