const express = require("express");
const {
  donate,
  getAllDonations,
} = require("../controllers/donationController");

const router = express.Router();

// public
router.post("/", donate);

// admin
router.get("/", getAllDonations);

module.exports = router;
