const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const uplaod = require("../middleware/multer");

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProductByID);
router.put(
  "/update/:id",
  uplaod.single("file"),
  productsController.updateProductById
);
router.post(
  "/createProduct",
  uplaod.single("file"),
  productsController.createProduct
);
router.delete("/delete/:id", productsController.deleteProductByID);

module.exports = router;
