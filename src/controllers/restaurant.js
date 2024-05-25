const restaurantService = require("../services/restaurant");

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
    throw error;
  }
};

const deleteRestaurantByID = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    const deletedRestaurant =
      await restaurantService.deleteRestaurantByID(restaurantID);
    if (!deletedRestaurant) {
      res.status(404).json({ error: "Restaurant not found" });
    } else {
      res.json(deletedRestaurant);
    }
  } catch (error) {
    throw error;
  }
};

const updateRestaurantByID = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    let { name, address, city, email, phoneNumber, ownerId, img } = req.body;

    img =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/images/" +
      req.file.filename;

    const updatedRestaurant = await restaurantService.updateRestaurantByID(
      restaurantID,
      { name, address, city, email, phoneNumber, ownerId, img }
    );
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    throw error;
  }
};

const createRestaurant = async (req, res) => {
  try {
    let { name, address, city, email, phoneNumber, ownerId } = req.body;
    img =
      req.protocol +
      "://" +
      req.get("host") +
      "/static/images/" +
      req.file.filename;

    const createdRestaurant = await restaurantService.createRestaurant({
      name,
      address,
      city,
      email,
      phoneNumber,
      ownerId,
      img,
    });
    res.status(201).json(createdRestaurant);
  } catch (error) {
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

const searchRestaurantByName = async (req, res) => {
  try {
    const restaurantName = req.body.name;
    const searchedRestaurant =
      await restaurantService.searchRestaurantByName(restaurantName);
    res.status(200).json(searchedRestaurant);
  } catch (error) {
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

module.exports = {
  getAllRestaurants,
  createRestaurant,
  getRestaurantById,
  deleteRestaurantByID,
  updateRestaurantByID,
  searchRestaurantByName,
  changeRestaurantStatus,
  setWorkingDays,
};
