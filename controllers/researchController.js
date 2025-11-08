const Research = require("../models/Research.models");
const mongoose = require("mongoose");

//Rsearch
const research = async (req, res) => {
  try {
    // useing req.body directly
    const research = new Research(req.body);
    await research.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: research,
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

// view research documents
const getAllResearchDocuments = async (req, res) => {
  try {
    const research = await Research.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: research.length,
      data: research,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { research, getAllResearchDocuments };
