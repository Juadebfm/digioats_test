const OtcInquiry = require("../models/OtcInquiry.models");
const mongoose = require("mongoose");

//submit Inquiry
const submitOtcInquiry = async (req, res) => {
  try {
    // useing req.body directly
    const otcInquiry = new OtcInquiry(req.body);
    await otcInquiry.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: otcInquiry,
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

// get all inquiries
const getAllOtcInquiries = async (req, res) => {
  try {
    const otcInquiries = await OtcInquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: otcInquiries.length,
      data: otcInquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving inquiries",
      error: error.message,
    });
  }
};

module.exports = { submitOtcInquiry, getAllOtcInquiries };
