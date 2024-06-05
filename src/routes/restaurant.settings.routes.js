const express = require("express");
const router = express.Router();
const restaurantSettingsController = require("../controllers/restaurant.settings.controller");

router.post("/setActiveHours", restaurantSettingsController.setActiveHours);
router.delete(
  "/delete/activeHours",
  restaurantSettingsController.deleteActiveHours
);

module.exports = router;
