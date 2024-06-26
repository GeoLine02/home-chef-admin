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

    if(res.rows.length === 0){
      return `product with id ${restaurnatId} doesn't exists`;
    }
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
    // Validation checks
    if (!restaurantID) {
      return 'restaurantID is required';
    }
    if (!productName) {
      return 'productName is required';
    }
    if (!productDescription) {
      return 'productDescription is required';
    }
    if (!productComposition) {
      return 'productComposition is required';
    }
    if (productPhoto === null) {
      return `productPhoto's type should be an image`;
    }
    if (!productPhoto) {
      return 'productPhoto is required';
    }
    if (!productPrice) {
      return 'productPrice is required';
    }
    if (!Number.isInteger(productPrice)) {
      return 'productPrice should be Integer';
    }

  try {
    const query = `INSERT INTO "Products" ("restaurantID", "productName", "productDescription", "productComposition", "productPhoto", "productPrice") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
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
    return res.rows[0];
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
  // Validation checks
  if (!productName) {
    return 'productName is required';
  }
  if (!productDescription) {
    return 'productDescription is required';
  }
  if (!productComposition) {
    return 'productComposition is required';
  }
  if (productPhoto === null) {
    return `productPhoto's type should be an image`;
  }
  if (!productPhoto) {
    return 'productPhoto is required';
  }
  if (productPrice === undefined || productPrice === null) {
    return 'productPrice is required';
  }
  if (!Number.isInteger(productPrice)) {
    return 'productPrice should be Integer';
  }

  try {

    const queryToFindProd = `SELECt * FROM "Products" WHERE id = $1`;
    const resToFindProd = await pool.query(queryToFindProd, [productID]);

    if(resToFindProd.rows.length === 0){
      return `product with id ${productID} doesn't exists`;
    }

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

    if(res.rowCount === 0){
      return `Product with id ${productID} doesn't exists`;
    }

    return `Product with id ${productID} deleted`;
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
