const productSeriveces = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const queryParams = req.query;
    const page = +queryParams?.page || 1;
    const limit = +queryParams?.limit || 10;
    const search = queryParams.search || "";
    const filterBy = queryParams.filterBy;

    const AllProducts = await productSeriveces.getAllProducts(
      page,
      limit,
      filterBy,
      search
    );
    res.status(200).json(AllProducts);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getProductByID = async (req, res) => {
  try {
    const restaurnatId = req.params.id;
    if (!restaurnatId) {
      res.status(404).json({
        message: `products for restaurant ${restaurnatId} does not exist`,
      });
    }
    const productByID = await productSeriveces.getProductByID(restaurnatId);
    res.status(200).json(productByID);
  } catch (error) {
    res.status(500).send("internal server error");
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

    if (!productPhoto) {
      productPhoto = null;
    } else {
      productPhoto =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/images/" +
        req.file.filename;
    }

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
    res.status(500).send("internal server error");
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

    if (!productID) {
      res
        .status(404)
        .json({ message: `product with id ${productID} does not exist` });
    }

    if (!productPhoto) {
      productPhoto = null;
    }
    console.log(req.body);
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
    res.status(500).send("internal server error");
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    await productSeriveces.deleteProductByID(productID);
    res.status(200).json({ message: "restaurant deleted succesfully" });
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  createProduct,
  getProductByID,
  getAllProducts,
  updateProductById,
  deleteProductByID,
};
