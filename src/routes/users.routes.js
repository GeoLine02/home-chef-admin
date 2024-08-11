const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserByID);
router.post("/create", userController.createUser);
router.post("/:id", userController.searchUserByID);
router.delete("/delete/:id", userController.deleteUserByID);
router.patch("/update/:id", userController.updateUserByID);
router.put("/status", userController.updateUserStatus);

module.exports = router;
