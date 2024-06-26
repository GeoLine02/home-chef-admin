const pool = require("../db/index");

async function getAllProducts() {
  try {
    const query = `SELECT * FROM "Products"`;
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
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
