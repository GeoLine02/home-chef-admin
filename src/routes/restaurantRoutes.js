const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant");
const uplaod = require("../middleware/multer");

router.get("/", restaurantController.getRestaurants);
router.get("/filter", restaurantController.filterRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.delete("/delete/:id", restaurantController.deleteRestaurantByID);
router.patch(
  "/update/:id",
  uplaod.single("file"),
  restaurantController.updateRestaurantByID
);
router.post(
  "/create",
  uplaod.single("file"),
  restaurantController.createRestaurant
);
router.post("/search", restaurantController.searchRestaurantByName);

module.exports = router;
