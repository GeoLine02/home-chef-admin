const restaurantSettingsService = require("../services/restaurant.settings.service");

const setActiveHours = async (req, res) => {
  try {
<<<<<<< HEAD
    const { workingFrom, workingTill } = req.body;
=======
    const timeStemp = req.body.timeStemp;
    timeStemp.map((data) => {
      const hours = data.getHours();
      const minutes = data.getMinutes();
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    });
    const [workingFrom, workingTill] = timeStemp;
>>>>>>> main
    await restaurantSettingsService.setActiveHours(workingFrom, workingTill);
    res.status(200).json({ message: "active hours set successfully" });
  } catch (error) {
    throw error;
  }
};

const updateActiveHours = async (req, res) => {
  try {
<<<<<<< HEAD
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
=======
    const restaurantId = req.params.id;
    const { workingFrom, workingTill } = req.body;

    await restaurantSettingsService.updateWorkingHours(
      restaurantId,
      workingFrom,
      workingTill
    );

    if (!workingFrom || !workingTill) {
      res.status(400).send("fields wokringFrom and workingTill are required");
    }
    if (workingFrom === workingTill) {
      res.status(400).send("fields workingFrom and workingTill are equal");
    }

    return res.status(200).send("active hours updated successfuly");
  } catch (e) {
    return res.status(500).send("internal sever error");
>>>>>>> main
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

<<<<<<< HEAD
=======
const setWorkingDays = async (req, res) => {
  try {
    const wokringDays = req.body;
    await restaurantSettingsService.setWorkingDays(wokringDays);
    res.status(200).json({ message: "working days set successfully" });
  } catch (error) {
    throw error;
  }
};

const getWorkingDays = async (req, res) => {
  try {
    const workingDays = await restaurantSettingsService.getWorkingDays();
    res.status(200).json(workingDays);
  } catch (error) {
    throw error;
  }
};

const deleteWorkingDaysJunctions = async (req, res) => {
  try {
    const { restaurantId } = req.body;
    await restaurantSettingsService.deleteWorkingDaysJunctions(restaurantId);
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

>>>>>>> main
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
