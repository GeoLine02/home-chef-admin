const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserByID);
router.post("/:id", userController.searchUserByID);
router.delete("/delete/:id", userController.deleteUserByID);
router.put("/update/:id", userController.updateUserByID);
router.put("/status", userController.updateUserStatus);

module.exports = router;
