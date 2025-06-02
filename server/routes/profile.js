const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadMiddleware,
} = require("../controllers/profileController");
const authenticateUser = require("../middleware/auth");

router.get("/", authenticateUser, getProfile);
router.put("/", authenticateUser, uploadMiddleware, updateProfile);

module.exports = router;
