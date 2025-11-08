const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.models");
const { JWT_SECRET } = require("../config/env");

// create middleware function for auth

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access Denied. No Token Provided" });
    }

    // Verify
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get admin from database
    const admin = await Admin.findById(decoded.adminId).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Token is valid but admin not found",
      });
    }

    // Verify token version matches current admin token version
    if (decoded.tokenVersion !== admin.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Token has been invalidated. Please login again.",
      });
    }

    // Add admin to req obj (use the admin from DB, not decoded)
    req.admin = admin;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired",
      });
    }
    res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

module.exports = auth;
