const restaurantService = require("../services/restaurant");
const restaurantSettingsService = require("../services/restaurant.settings.service");
const restaurantWorkingDaysService = require("../services/restaurant.workingDays.service");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const restaurantById =
      await restaurantService.getRestaurantByID(restaurantID);
    if (!restaurantById) {
      res.status(404).json({ error: "Restaurant not found" });
    } else {
      res.json(restaurantById);
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteRestaurantByID = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const deletedRestaurant =
      await restaurantService.deleteRestaurantByID(restaurantID);

    if (!restaurantID) {
      res
        .status(400)
        .json({ message: `restaurant with id ${restaurantID} does not exist` });
    }

    if (deletedRestaurant) {
      Promise.all([
        restaurantSettingsService.deleteActiveHours(restaurantID),
        restaurantWorkingDaysService.deleteWokringDays(restaurantID),
      ]);
      res.status(200).send("restaurant deleted successfuly");
    } else {
      res.status(404).send("restaurant does not exists");
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const updateRestaurantByID = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    let {
      name,
      address,
      city,
      email,
      phoneNumber,
      ownerId,
      img,
      workingDays,
      workingFrom,
      workingTill,
    } = req.body;

    if (!workingFrom || !workingTill) {
      res.status(400).json({ message: "working Hours filds are missing" });
    } else if (workingFrom >= workingTill) {
      res.status(400).json({ message: "invalide working hours values" });
    }

    if (!img) {
      img = null;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/images/" +
        req?.file?.filename;
    }

    const updatedRestaurant = await restaurantService.updateRestaurantByID(
      restaurantID,
      { name, address, city, email, phoneNumber, ownerId, img }
    );

    if (
      workingFrom &&
      workingTill &&
      workingFrom < workingTill &&
      updatedRestaurant
    ) {
      await Promise.all([
        restaurantWorkingDaysService.updateWorkingDays(
          restaurantID,
          workingDays
        ),
        restaurantSettingsService.updateActiveHours(
          restaurantID,
          workingFrom,
          workingTill
        ),
      ]);
      res.status(201).json(updatedRestaurant);
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const createRestaurant = async (req, res) => {
  try {
    let {
      name,
      address,
      city,
      email,
      img,
      phoneNumber,
      ownerId,
      workingFrom,
      workingTill,
      isRestaurantActive,
      workingDays,
    } = req.body;

    if (!workingFrom || !workingTill) {
      res.status(400).json({ message: "working Hours filds are missing" });
    } else if (workingFrom >= workingTill) {
      res.status(400).json({ message: "invalide working hours values" });
    }

    if (!img) {
      img = null;
    } else {
      img =
        req.protocol +
        "://" +
        req.get("host") +
        "/static/images/" +
        req?.file?.filename;
    }

    const createdRestaurant = await restaurantService.createRestaurant({
      name,
      address,
      city,
      email,
      phoneNumber,
      ownerId,
      img,
    });

    if (
      workingFrom &&
      workingTill &&
      workingFrom < workingTill &&
      createdRestaurant
    ) {
      await Promise.all([
        restaurantSettingsService.setActiveHours(
          createdRestaurant.id,
          workingFrom,
          workingTill
        ),
        restaurantSettingsService.changeRestaurantStatus(
          isRestaurantActive,
          createdRestaurant.id
        ),
        restaurantWorkingDaysService.setWorkingDays(
          createdRestaurant.id,
          workingDays
        ),
      ]);
      res.status(201).json(createdRestaurant);
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const searchRestaurantByName = async (req, res) => {
  try {
    const restaurantName = req.body.name;
    const searchedRestaurant =
      await restaurantService.searchRestaurantByName(restaurantName);
    res.status(200).json(searchedRestaurant);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  deleteRestaurantByID,
  updateRestaurantByID,
  searchRestaurantByName,
};
