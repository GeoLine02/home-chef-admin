const express = require("express");
const router = express.Router();
const restaurantTypesController = require("../controllers/restaurant.types");

router.get("/", restaurantTypesController.getAllRestaurantTypes);
router.post("/choose", restaurantTypesController.ChooseRestaurantTypes);

module.exports = router;
