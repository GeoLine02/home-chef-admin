const express = require("express");
const router = express.Router();
const restaurantTypesController = require("../controllers/restaurant.types");

router.get("/", restaurantTypesController.getAllRestaurantTypes);
router.post("/choose", restaurantTypesController.ChooseRestaurantTypes);
router.delete(
  "/delete",
  restaurantTypesController.deleteRestauarntTypesJucntions
);

module.exports = router;
