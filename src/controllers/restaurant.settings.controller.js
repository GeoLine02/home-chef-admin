const restaurantService = require("../services/restaurant.settings.service");

const setActiveHours = async (req, res) => {
  try {
    const timeStemp = req.body.timeStemp;
    timeStemp.map((data) => {
      const hours = data.getHours();
      const minutes = data.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    });
    const [workingFrom, workingTill] = timeStemp;
    await restaurantService.setActiveHours(workingFrom, workingTill);
    res.status(200).json({ message: "active hours set successfully" });
  } catch (error) {
    throw error;
  }
};

const deleteActiveHours = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await restaurantService.deleteActiveHours(restaurantId);
    res.status(200).send("active hours deleted successfuly");
  } catch (error) {
    res.status(500).send("internal server error");
    throw error;
  }
};

const setWorkingDays = async (req, res) => {
  try {
    const wokringDays = req.body;
    await restaurantService.setWorkingDays(wokringDays);
    res.status(200).json({ message: "working days set successfully" });
  } catch (error) {
    throw error;
  }
};

const getWorkingDays = async (req, res) => {
  try {
    const workingDays = await restaurantService.getWorkingDays();
    res.status(200).json(workingDays);
  } catch (error) {
    throw error;
  }
};

const deleteWorkingDaysJunctions = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await restaurantService.deleteWorkingDaysJunctions(restaurantId);
    if (restaurantId) {
      res.status(200).send("working days jucntiosn deleted successfuly");
    } else {
      res
        .status(404)
        .send(`working days with restaurantID ${restaurantId} does not exist`);
    }
  } catch (error) {
    res.status(500).send("internal server error");
    throw error;
  }
};

const changeRestaurantStatus = async (req, res) => {
  try {
    const restaurantID = req.params.id;

    const { isActive } = req.body;
    await restaurantService.changeRestaurantStatus(isActive, restaurantID);
    res.status(201).json({ message: "restaurant status changed succesfully" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  setActiveHours,
  deleteActiveHours,
  setWorkingDays,
  getWorkingDays,
  deleteWorkingDaysJunctions,
  changeRestaurantStatus,
};
