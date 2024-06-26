const productSeriveces = require("../services/product.service");

const getAllProducts = async (req, res) => {
  try {
    const AllProducts = await productSeriveces.getAllProducts();
    res.status(200).json(AllProducts);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getProductByID = async (req, res) => {
  try {
    const restaurnatId = req.params.id;
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

    productPrice = Number(productPrice);

    if (!req.file) {
      productPhoto = null;
    } else {
      productPhoto =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/images/" +
        req.file.filename;
    }

    const result = await productSeriveces.createProduct({
      restaurantID,
      productName,
      productDescription,
      productComposition,
      productPhoto,
      productPrice,
    });

    if (typeof result === 'string') {
      res.status(400).json({ error: result });
    } else {
      res.status(201).json({ message: 'Product created successfully', product: result });
    }

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

    productPrice = Number(productPrice);

    const productID = req.params.id;

    if (!req.file) {
      productPhoto = null;
    } else {
      productPhoto =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/images/" +
        req.file.filename;
    }

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

    if (typeof upadetedProduct === 'string') {
      res.status(400).json({ error: upadetedProduct });
    } else {
      res.status(201).json({ message: 'Product updated successfully'});
    }
  } catch (error) {
    console.log(error)
    res.status(500).send("internal server error");
  }
};

const deleteProductByID = async (req, res) => {
  try {
    const productID = req.params.id;
    const product = await productSeriveces.deleteProductByID(productID);
    res.status(200).json(product);
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
