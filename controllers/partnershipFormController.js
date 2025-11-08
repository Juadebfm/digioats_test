const PartnershipForm = require("../models/PartnershipForm.models");
const mongoose = require("mongoose");

//submit form
const submitPartnershipForm = async (req, res) => {
  try {
    //  useing req.body directly
    const partnershipForm = new PartnershipForm(req.body);
    await partnershipForm.save();

    res.status(201).json({
      success: true,
      message: "Operation Successful",
      data: partnershipForm,
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
      message: "Error submitting Form",
      error: error.message,
    });
  }
};

// get partnership form
const getAllPartnershipForm = async (req, res) => {
  try {
    const partnershipForm = await PartnershipForm.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      message: "Opperation successfully",
      count: partnershipForm.length,
      data: partnershipForm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving donations",
      error: error.message,
    });
  }
};

module.exports = { submitPartnershipForm, getAllPartnershipForm };
