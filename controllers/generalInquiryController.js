const GeneralInquiry = require("../models/GeneralInquiry.models");
const mongoose = require("mongoose");

//submit Inquiry
const submitGeneralInquiry = async (req, res) => {
  try {
    // useing req.body directly
    const generalInquiry = new GeneralInquiry(req.body);
    await generalInquiry.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: generalInquiry,
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

// view general inquiries
const getAllGeneralInquiries = async (req, res) => {
  try {
    const generalInquiry = await GeneralInquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: generalInquiry.length,
      data: generalInquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { submitGeneralInquiry, getAllGeneralInquiries };
