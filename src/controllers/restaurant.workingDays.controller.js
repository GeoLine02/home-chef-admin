const restaurantWorkngDaysService = require("../services/restaurant.workingDays.service");

const getWorkingDays = async (req, res) => {
  try {
    const workingDays = await restaurantWorkngDaysService.getWorkingDays();
    return res.status(200).json(workingDays);
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getWorkingDays,
};
