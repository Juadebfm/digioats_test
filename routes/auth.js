const express = require("express");
const {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/auth");
const router = express.Router();

// admin
router.post("/register", register);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", auth, logout);

// protected routes for super admin
router.get("/profile", auth, getProfile);

module.exports = router;
