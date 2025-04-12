const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../../middleware/authMiddleware");

// Get current user's profile
router.get("/me", authMiddleware, userController.getMyProfile);

// (Optional) Get all users — restricted to admin only
router.get("/all", authMiddleware, userController.getAllUsers);

module.exports = router;
