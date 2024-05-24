const express = require("express");
const router = express.Router();
const restaurantTypeJunctionsController = require("../controllers/restaurantTypesJucntions.controller");

router.post("/set", restaurantTypeJunctionsController.setRestaurantTypes);

module.exports = router;
