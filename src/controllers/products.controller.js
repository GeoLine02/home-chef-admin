const productSeriveces = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const AllProducts = await productSeriveces.getAllProducts();
    res.status(200).json(AllProducts);
  } catch (error) {
    throw error;
  }
};

const getProductByID = async (req, res) => {
  try {
    const restaurnatId = req.params.id;
    const productByID = await productSeriveces.getProductByID(restaurnatId);
    res.status(200).json(productByID);
  } catch (error) {
    throw error;
  }
};

const createProduct = async (req, res) => {
  try {
    let {
      restaurantID,
      productName,
      productDescription,
      productComposition,
      productPhoto,
      productPrice,
    } = req.body;

    productPhoto =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/images/" +
      req.file.filename;

    await productSeriveces.createProduct({
      restaurantID,
      productName,
      productDescription,
      productComposition,
      productPhoto,
      productPrice,
    });
    res.status(200).json({ message: "product created succesfully" });
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (req, res) => {
  try {
    let {
      productName,
      productDescription,
      productComposition,
      productPhoto,
      productPrice,
    } = req.body;

    const productID = req.params.id;

    productPhoto =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/images/" +
      req.file.filename;

    const upadetedProduct = await productSeriveces.updateProductByID(
      productID,
      {
        productName,
        productDescription,
        productComposition,
        productPhoto,
        productPrice,
      }
    );
    res.status(200).json(upadetedProduct);
  } catch (error) {
    throw error;
  }
};

const deleteProductByID = async (req, res) => {
  const productID = req.params.id;
  await productSeriveces.deleteProductByID(productID);
  res.status(200).json({ message: "restaurant deleted succesfully" });
};

module.exports = {
  createProduct,
  getProductByID,
  getAllProducts,
  updateProductById,
  deleteProductByID,
};
