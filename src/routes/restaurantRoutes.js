const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurant");
const uplaod = require("../middleware/multer");

router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", restaurantController.getRestaurantById);
router.delete("/delete/:id", restaurantController.deleteRestaurantByID);
router.put(
  "/update/:id",
  uplaod.single("file"),
  restaurantController.updateRestaurantByID
);
router.post(
  "/create",
  uplaod.single("file"),
  restaurantController.createRestaurant
);
router.put("/status/:id", restaurantController.changeRestaurantStatus);
router.post("/search", restaurantController.searchRestaurantByName);
router.post("/setWorkingDays", restaurantController.setWorkingDays);
router.post("/setActiveHours", restaurantController.setActiveHours);

module.exports = router;
