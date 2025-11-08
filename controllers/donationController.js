const Donation = require("../models/Donation.models");
const mongoose = require("mongoose");

//Donate
const donate = async (req, res) => {
  try {
    // useing req.body directly
    const donation = new Donation(req.body);
    await donation.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: donation,
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
      message: "Error submitting Inquiry",
      error: error.message,
    });
  }
};

// view donations
const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: donations.length,
      data: donations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { donate, getAllDonations };
