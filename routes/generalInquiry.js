const express = require("express");
const {
  submitGeneralInquiry,
  getAllGeneralInquiries,
} = require("../controllers/generalInquiryController");

const router = express.Router();

// public
router.post("/", submitGeneralInquiry);

// admin
router.get("/", getAllGeneralInquiries);

module.exports = router;
