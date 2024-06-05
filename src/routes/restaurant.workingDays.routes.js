const restaurantWorkingDaysController = require("../controllers/restaurant.workingDays.controller");
const express = require("express");
const router = express.Router();

router.get("/", restaurantWorkingDaysController.getWorkingDays);
router.post("/", restaurantWorkingDaysController.setWorkingDays);
router.put("/:id", restaurantWorkingDaysController.updateWorkingDays);
router.delete("/:id", restaurantWorkingDaysController.deleteWorkingDays);

module.exports = router;
