const pool = require("../db/index");

async function getAllProducts(page, limit, filterBy, search) {
  console.log("page", page);
  console.log("limit", limit);

  try {
    let offset = Number(page - 1) * limit;

    let productQuery = `SELECT * FROM "Products"`;

    const totalDataCount = `SELECT COUNT(*) FROM "Products"`;

    if (filterBy === "id") {
      productQuery += ` WHERE "Products".${filterBy} = ${search}`;
    } else if (filterBy === "restaurantID") {
      productQuery += ` WHERE "Products"."${filterBy}" = ${search}`;
    }

    if (
      filterBy &&
      search &&
      filterBy !== "restaurantID" &&
      filterBy !== "productPrice" &&
      filterBy !== "weight"
    ) {
      productQuery += ` WHERE ${filterBy} ILIKE '${search}%'`;
    }

    if (limit && page) {
      productQuery += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    console.log(productQuery);
    const [result, totalRecords] = await Promise.all([
      pool.query(productQuery),
      pool.query(totalDataCount),
    ]);

    const totalPages = Math.ceil(totalRecords.rows[0].count / limit);

    return {
      data: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        // totalRecords: parseInt(totalDataCount.rows[0].count),
        totalPages,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getProductByID(restaurnatId) {
  try {
    const query = `SELECt * FROM "Products" WHERE id = $1`;
    const res = await pool.query(query, [restaurnatId]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  restaurantID,
  productName,
  productDescription,
  productComposition,
  productPhoto,
  productPrice,
}) {
  try {
    const query = `INSERT INTO "Products" ("restaurantID", "productName", "productDescription", "productComposition", "productPhoto", "productPrice") VALUES ($1, $2, $3, $4, $5, $6)`;
    const res = await pool.query(
      query,

      [
        restaurantID,
        productName,
        productDescription,
        productComposition,
        productPhoto,
        productPrice,
      ]
    );
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function updateProductByID(
  productID,
  {
    productName,
    productDescription,
    productComposition,
    productPhoto,
    productPrice,
  }
) {
  try {
    const query = `UPDATE "Products" SET "productName" = $1, "productDescription" = $2, "productComposition" = $3, "productPhoto" = $4, "productPrice" = $5 WHERE id = $6`;
    const res = await pool.query(query, [
      productName,
      productDescription,
      productComposition,
      productPhoto,
      productPrice,
      productID,
    ]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteProductByID(productID) {
  try {
    const query = `DELETE FROM "Products" WHERE id = $1`;
    const res = await pool.query(query, [productID]);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductByID,
  createProduct,
  updateProductByID,
  deleteProductByID,
};
