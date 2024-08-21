const restaurantService = require("../services/restaurant");
const restaurantSettingsService = require("../services/restaurant.settings.service");
const restaurantWorkingDaysService = require("../services/restaurant.workingDays.service");
const restaurantAddressSerivce = require("../services/restaurant.address.service");
const RestaurantContactsService = require("../services/restaurant.contacts.service");
const restaurantTypesService = require("../services/restaurant.types");
const restaurantAssetsService = require("../services/restaurant.assets.service");

const getRestaurants = async (req, res) => {
  try {
    const queryParams = req.query;
    const page = +queryParams?.page || 1;
    const limit = +queryParams?.limit || 10;
    const search = queryParams.search || "";
    const filterBy = queryParams.filterBy;

    const restaurants = await restaurantService.getRestaurants(
      page,
      limit,
      filterBy,
      search
    );
    res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const filterRestaurants = async (req, res) => {
  try {
    const queryParams = req.query;
    const filteredRestaurants =
      await restaurantService.filterRestaurants(queryParams);
    res.status(200).json(filteredRestaurants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
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
      countryId,
      latitude,
      longitude,
      email,
      phone,
      ownerId,
      introImage,
      coverImage,
      workingFrom,
      workingTill,
      workingDays,
      restaurantTypes,
    } = req.body;
    console.log(name);
    let img = req.file;
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
      { name, ownerId, img }
    );
    console.log(name);
    if (updatedRestaurant) {
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
        RestaurantContactsService.updateRestaurantContacts(
          restaurantID,
          email,
          phone
        ),
        restaurantAddressSerivce.upateRestaurantAddress(
          restaurantID,
          countryId,
          address,
          latitude,
          longitude,
          city
        ),
        restaurantTypesService.updateRestaurantTypes(
          restaurantID,
          restaurantTypes
        ),
        restaurantAssetsService.updateRestaurantAssets(
          restaurantID,
          introImage,
          coverImage
        ),
      ]);
      res.status(201).json(updatedRestaurant);
    } else {
      console.log("finally", 0);
      return 0;
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const createRestaurant = async (req, res) => {
  console.log(req.body);
  try {
    let {
      name,
      address,
      city,
      countryId,
      latitude,
      longitude,
      email,
      phone,
      ownerId,
      workingFrom,
      workingTill,
      isRestaurantActive,
      imageIntro,
      imageCover,
      workingDays,
      restaurantTypes,
    } = req.body;

    let img = req.file;
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
      ownerId,
      img,
    });

    if (createdRestaurant) {
      await Promise.all([
        restaurantSettingsService.setActiveHours(
          createdRestaurant.id,
          workingFrom,
          workingTill
        ),
        RestaurantContactsService.createRestauratContacts(
          createdRestaurant.id,
          email,
          phone
        ),
        restaurantAddressSerivce.createRestaurantAddress(
          createdRestaurant.id,
          countryId, // undefined
          address,
          latitude, // undefined
          longitude, // undefined
          city
        ),
        restaurantWorkingDaysService.setWorkingDays(
          createdRestaurant.id,
          workingDays
        ),
        restaurantTypesService.setRestaurantTypes(
          createdRestaurant.id,
          restaurantTypes
        ),
        restaurantAssetsService.setRestaurantAssets(
          createdRestaurant.id,
          imageIntro,
          imageCover
        ),
      ]);

      res.status(201).json(createdRestaurant);
    } else {
      return 0;
    }
  } catch (error) {
    console.log(error);
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
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  deleteRestaurantByID,
  updateRestaurantByID,
  searchRestaurantByName,
  filterRestaurants,
};
