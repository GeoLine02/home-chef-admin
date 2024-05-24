const RestaurantTypesJunctionsSerivice = require("../services/restaurantTypeJunctions.service");

const setRestaurantTypes = async (req, res) => {
  const restaurantId = req.aprams.id;
  const restaurantTypes = req.body;

  await RestaurantTypesJunctionsSerivice.setRestaurantTypes(
    restaurantId,
    restaurantTypes
  );
  res.status(200).json({ message: "restaurant types set succesfully" });
};

module.exports = {
  setRestaurantTypes,
};
