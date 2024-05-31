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

const deleteRestauarntTypesJucntions = async (req, res) => {
  try {
    const { restaurantID } = req.body;
    await restaurantTypesServices.deleteRestaurantTypesJucntions(restaurantID);
    res.status(200).send("types junctions deleted successfuly");
  } catch (error) {
    res.status(500).send("internal server error");
    throw error;
  }
};

module.exports = {
  getAllRestaurantTypes,
  ChooseRestaurantTypes,
  deleteRestauarntTypesJucntions,
};
