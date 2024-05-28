const userService = require("../services/user.service");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    throw error;
  }
};

const getUserByID = async (req, res) => {
  try {
    const userID = req.params.id;
    const userByID = await userService.getUserByID(userID);
    res.status(200).json(userByID);
  } catch (error) {
    throw error;
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const { userID, restaurantID } = req.body;
    await userService.deleteUserByID(userID, restaurantID);
    res.status(200).json({ message: "user deleted successfuly" });
  } catch (error) {
    throw error;
  }
};

const updateUserByID = async (req, res) => {
  try {
    const userID = req.parmas.id;
    const { email, firstName, lastName, phoneNumber, password } = req.body;
    const updatedUser = await userService.updateUserByID(
      {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
      },
      userID
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
};
