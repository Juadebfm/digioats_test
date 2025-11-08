const ServiceInquiry = require("../models/ServiceInquiry.models");
const mongoose = require("mongoose");

//submit inquiry
const submitServiceInquiry = async (req, res) => {
  try {
    //  useing req.body directly
    const serviceInquiry = new ServiceInquiry(req.body);
    await serviceInquiry.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: serviceInquiry,
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

// get al service inquiries
const getAllServiceInquiries = async (req, res) => {
  try {
    const serviceInquiry = await ServiceInquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: serviceInquiry.length,
      data: serviceInquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { submitServiceInquiry, getAllServiceInquiries };
