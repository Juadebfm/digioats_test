const express = require("express");
const {
  submitServiceInquiry,
  getAllServiceInquiries,
} = require("../controllers/serviceInquiryController");

const router = express.Router();

// public
router.post("/", submitServiceInquiry);

// admin
router.get("/", getAllServiceInquiries);

module.exports = router;
