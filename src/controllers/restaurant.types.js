const restaurantTypesServices = require("../services/restaurant.types");

const getAllRestaurantTypes = async (req, res) => {
  try {
    const restaurantTypes = await restaurantTypesServices.getRestaurantTypes();
    res.status(200).json(restaurantTypes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const ChooseRestaurantTypes = async (req, res) => {
  try {
    const restaurnatID = req.body.id;
    const restaurantTypes = req.body.restaurantTypes;
    const choosenRestaurantTypes =
      await restaurantTypesServices.setRestaurantTypes(
        restaurnatID,
        restaurantTypes
      );
    res.status(200).json(choosenRestaurantTypes);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteRestauarntTypesJucntions = async (req, res) => {
  try {
    const { restaurantID } = req.body;
    await restaurantTypesServices.deleteRestaurantTypesJucntions(restaurantID);
    res.status(200).send("types junctions deleted successfuly");
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getAllRestaurantTypes,
  ChooseRestaurantTypes,
  deleteRestauarntTypesJucntions,
};
