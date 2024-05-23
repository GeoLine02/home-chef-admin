const restaurantTypesServices = require("../services/restaurant.types");

const getAllRestaurantTypes = async (req, res) => {
  try {
    const restaurantTypes = await restaurantTypesServices.getRestaurantTypes();
    res.status(200).json(restaurantTypes);
  } catch (error) {
    throw error;
  }
};

const ChooseRestaurantTypes = async (req, res) => {
  try {
    const choosenRestaurantTypes =
      await restaurantTypesServices.getRestaurantTypes();
    res.status(200).json(choosenRestaurantTypes);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRestaurantTypes,
  ChooseRestaurantTypes,
};
