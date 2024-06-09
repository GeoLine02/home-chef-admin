const userService = require("../services/user.service");
const restaurantService = require("../services/restaurant");
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const getUserByID = async (req, res) => {
  try {
    const userID = req.params.id;
    const userByID = await userService.getUserByID(userID);
    res.status(200).json(userByID);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const { userID, restaurantID } = req.body;
    const deletedUser = await userService.deleteUserByID(userID, restaurantID);
    if (!userID) {
      res.status(404).send(`user with ${userID} does not exist`);
    }

    if (deletedUser) {
      await restaurantService.deleteRestaurantByID(restaurantID);
      res.status(200).json({ message: "user deleted successfuly" });
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const updateUserByID = async (req, res) => {
  try {
    const userID = req.params.id;
    const { email, firstName, lastName, phoneNumber, isAccountActive, role } =
      req.body;

    if (!userID) {
      res
        .status(404)
        .json({ message: `User with id ${userID} does not exist` });
    } else if (!email || !firstName || !lastName || !phoneNumber || !role) {
      res.status(400).json({ message: "user credentials are missing" });
    }

    const updatedUser = await userService.updateUserByID(
      {
        email,
        firstName,
        lastName,
        phoneNumber,
        isAccountActive,
        role,
      },
      userID
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userID, isUSerActive } = req.body;
    await userService.updateUserStatus(isUSerActive, userID);
    res.status(200).json({ message: "user changed succesfully" });
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const searchUserByID = async (req, res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      res
        .status(404)
        .json({ message: `user with id ${userID} does not exist` });
    }
    const searchUserByID = await userService.searchUserByID(userID);
    if (searchUserByID) {
      res.status(200).json(searchUserByID);
    }
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  deleteUserByID,
  updateUserByID,
  updateUserStatus,
  searchUserByID,
};
