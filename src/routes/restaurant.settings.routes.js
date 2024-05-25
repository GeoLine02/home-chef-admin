const express = require("express");
const router = express.Router();
const restaurantSettingsController = require("../controllers/restaurant.settings.controller");

router.post("/setWorkingHours", restaurantSettingsController.setActiveHours);
router.post("/setWorkingDays", restaurantController.setWorkingDays);
router.post("/setActiveHours", restaurantController.setActiveHours);

module.exports = router;
