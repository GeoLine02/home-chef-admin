const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserByID);
router.delete("/delete", userController.deleteUserByID);
router.put("/update", userController.updateUserByID);
router.put("/status", userController.updateUserStatus);

module.exports = router;
