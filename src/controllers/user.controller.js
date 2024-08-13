const userService = require("../services/user.service");
const restaurantService = require("../services/restaurant");
const restaurantTypesService = require("../services/restaurant.types");
const userAddressService = require("../services/user.address.service");
const getAllUsers = async (req, res) => {
  try {
    const queryParams = req.query;
    const page = +queryParams?.page || 1;
    const limit = +queryParams?.limit || 10;
    const search = queryParams.search || "";
    const filterBy = queryParams.filterBy;

    const allUsers = await userService.getAllUsers(
      page,
      limit,
      filterBy,
      search
    );
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

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password, role } =
      req.body;
    const createdUser = await userService.createUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      role
    );

    if (createdUser) {
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const userId = req.params.id;

    console.log(userId);

    if (!userId) {
      res.status(404).send(`user with ${userId} does not exist`);
    }

    const deletedUser = await userService.deleteUserByID(userId);
    if (deletedUser) {
      res.status(200).json({ message: "user deleted successfuly" });
    }
  } catch (error) {
    res.status(500).send("internal server error");
    console.log(error);
  }
};

const updateUserByID = async (req, res) => {
  try {
    const userID = req.params.id;
    const { email, firstName, lastName, phoneNumber } = req.body;

    console.log(email, firstName, lastName, phoneNumber);

    if (!userID) {
      res
        .status(404)
        .json({ message: `User with id ${userID} does not exist` });
    }

    if (!email || !firstName || !lastName || !phoneNumber) {
      console.log("enterrsss");
      res.status(400).json({ message: "User credentials are missing" });
    }

    const updatedUser = await userService.updateUserByID(
      {
        email,
        firstName,
        lastName,
        phoneNumber,
      },
      userID
    );

    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
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
  createUser,
  searchUserByID,
};
