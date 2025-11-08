const Admin = require("../models/Admin.models");
const jwt = require("jsonwebtoken");

// Helper function to create access token with version
const createAccessToken = (adminId, tokenVersion) => {
  return jwt.sign({ adminId, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Helper function to create refresh token with version
const createRefreshToken = (adminId, tokenVersion) => {
  return jwt.sign({ adminId, tokenVersion }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Helper function to generate both tokens
const generateTokens = (adminId, tokenVersion) => {
  const accessToken = createAccessToken(adminId, tokenVersion);
  const refreshToken = createRefreshToken(adminId, tokenVersion);
  return { accessToken, refreshToken };
};

// register admin
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // create new admin
    const admin = new Admin({ email, password });
    await admin.save();

    // generate tokens with version
    const { accessToken, refreshToken } = generateTokens(
      admin._id,
      admin.tokenVersion
    );

    // send response
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token: accessToken,
      refreshToken,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Encountered errors registering admin, please try again later",
      error: error.message,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }

    // generate tokens with version
    const { accessToken, refreshToken } = generateTokens(
      admin._id,
      admin.tokenVersion
    );

    // send response
    res.status(200).json({
      success: true,
      message: "Login Successful",
      token: accessToken,
      refreshToken,
      admin: { id: admin._id, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error Logging In",
      error: error.message,
    });
  }
};

// refresh token - generates new access token using refresh token
const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // check if admin exists
    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // verify token version matches
    if (decoded.tokenVersion !== admin.tokenVersion) {
      return res.status(401).json({
        success: false,
        message: "Token has been invalidated. Please login again.",
      });
    }

    // generate new access token with current version
    const newAccessToken = createAccessToken(admin._id, admin.tokenVersion);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      token: newAccessToken,
    });
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error refreshing token",
      error: error.message,
    });
  }
};

// logout - invalidates all active tokens by incrementing version
const logout = async (req, res) => {
  try {
    // Check if req.admin exists (set by auth middleware)
    if (!req.admin || !req.admin._id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Find admin by ID
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // increment token version to invalidate all existing tokens
    await admin.incrementTokenVersion();

    res.status(200).json({
      success: true,
      message: "Logout successful. All tokens have been invalidated.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during logout",
      error: error.message,
    });
  }
};

// admin profile
const getProfile = async (req, res) => {
  try {
    // req.admin is set by auth middleware
    const admin = await Admin.findById(req.admin._id).select("-password");
    res.json({ success: true, admin });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting profile",
      error: error.message,
    });
  }
};

module.exports = { register, login, refreshToken, logout, getProfile };
