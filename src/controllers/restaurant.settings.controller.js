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

module.exports = {
  setActiveHours,
};
