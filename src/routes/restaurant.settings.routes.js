const express = require("express");
const router = express.Router();
const restaurantSettingsController = require("../controllers/restaurant.settings.controller");

router.post("/setWorkingHours", restaurantSettingsController.setActiveHours);
router.post("/setWorkingDays", restaurantSettingsController.setWorkingDays);
router.get("/", restaurantSettingsController.getWorkingDays);
router.post("/setActiveHours", restaurantSettingsController.setActiveHours);

module.exports = router;
