const restaurantWorkngDaysService = require("../services/restaurant.workingDays.service");

const getWorkingDays = async (req, res) => {
  try {
    const workingDays = await restaurantWorkngDaysService.getWorkingDays();
    return res.status(200).json(workingDays);
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

const setWorkingDays = async (req, res) => {
  try {
    const { restaurantId, workingDays } = req.body;
    if (!restaurantId) {
      res
        .status(400)
        .json({ message: `restaurant with id ${restaurantId} does not exist` });
    }

    await restaurantWorkngDaysService.setWorkingDays(restaurantId, workingDays);
    return res.status(201).send("working days set successfuly");
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

const updateWorkingDays = async (req, res) => {
  try {
    const { restaurantId, workingDays } = req.body;

    await restaurantWorkngDaysService.updateWorkingDays(
      restaurantId,
      workingDays
    );
    return res.status(201).send("working days updated successfuly");
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

const deleteWorkingDays = async (req, res) => {
  try {
    const restaurantID = req.params.id;

    if (!restaurantID) {
      res
        .status(404)
        .json({ message: `Restaurant with id ${restaurantID} does not exist` });
    }

    const deletedWorkingDays =
      restaurantWorkngDaysService.deleteWokringDays(restaurantID);

    if (deletedWorkingDays) {
      res
        .status(200)
        .json({ message: "restaurant working days deleted successfuly" });
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getWorkingDays,
  setWorkingDays,
  updateWorkingDays,
  deleteWorkingDays,
};
