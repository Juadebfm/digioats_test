const Application = require("../models/Application.models");
const mongoose = require("mongoose");

//submit application
const submitApplication = async (req, res) => {
  try {
    // Just use req.body directly, no createdBy field
    const application = new Application(req.body);
    await application.save();

    // Remove the populate line since there's no reference field
    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: application,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
      });
    }
    res.status(500).json({
      success: false,
      message: "Email and/or phone already exist",
      error: error.message,
    });
  }
};

// view applications
const getAllApplication = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { submitApplication, getAllApplication };
