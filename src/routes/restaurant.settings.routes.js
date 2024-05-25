const express = require("express");
const router = express.Router();
const restaurantSettingsController = require("../controllers/restaurant.settings.controller");

router.post("/setWorkingHours", restaurantSettingsController.setActiveHours);

module.exports = router;
