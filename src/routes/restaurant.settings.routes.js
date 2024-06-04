const express = require("express");
const router = express.Router();
const restaurantSettingsController = require("../controllers/restaurant.settings.controller");

router.post("/setActiveHours", restaurantSettingsController.setActiveHours);
router.put("/update/activeHours", restaurantSettingsController.setActiveHours);
router.post("/setWorkingDays", restaurantSettingsController.setWorkingDays);
router.get("/", restaurantSettingsController.getWorkingDays);
router.post("/setActiveHours", restaurantSettingsController.setActiveHours);
router.delete(
  "/delete/workingDays",
  restaurantSettingsController.deleteWorkingDaysJunctions
);
router.delete(
  "/delete/activeHours",
  restaurantSettingsController.deleteActiveHours
);

module.exports = router;
