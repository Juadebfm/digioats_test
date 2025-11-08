const express = require("express");
const {
  submitOtcInquiry,
  getAllOtcInquiries,
} = require("../controllers/otcInquiryController");

const router = express.Router();

// admin
router.post("/", submitOtcInquiry);
router.get("/", getAllOtcInquiries);

module.exports = router;
