const restaurantSettingsService = require("../services/restaurant.settings.service");

const setActiveHours = async (req, res) => {
  try {
    const { workingFrom, workingTill } = req.body;
    await restaurantSettingsService.setActiveHours(workingFrom, workingTill);
    res.status(200).json({ message: "active hours set successfully" });
  } catch (error) {
    throw error;
  }
};

const updateActiveHours = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const { workingFrom, workingTill } = req.body;
    if (!restaurantID) {
      res
        .status(400)
        .json({ message: `restaurant with id ${restaurantID} does not exist` });
    }

    if (!workingFrom || !workingTill) {
      res.status(400).json({ message: "working hours values are missing" });
    }

    if (workingFrom === workingTill) {
      res.status(400).json({
        message: "working hours values should not be equal to each other",
      });
    }
    const updatedActiveHours = restaurantSettingsService.updateActiveHours(
      restaurantID,
      workingFrom,
      workingTill
    );
    if (updatedActiveHours) {
      res
        .stat(201)
        .json({ message: "restaurant active hours updated successfuly" });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteActiveHours = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await restaurantSettingsService.deleteActiveHours(restaurantId);
    res.status(200).send("active hours deleted successfuly");
  } catch (error) {
    res.status(500).send("internal server error");
    throw error;
  }
};

const changeRestaurantStatus = async (req, res) => {
  try {
    const restaurantID = req.params.id;

    const { isActive } = req.body;
    await restaurantSettingsService.changeRestaurantStatus(
      isActive,
      restaurantID
    );
    res.status(201).json({ message: "restaurant status changed succesfully" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  setActiveHours,
  updateActiveHours,
  deleteActiveHours,
  changeRestaurantStatus,
};
