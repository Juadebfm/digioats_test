const express = require("express");
const {
  submitApplication,
  getAllApplication,
} = require("../controllers/applicationController");

const router = express.Router();

// public
router.post("/", submitApplication);

// admin
router.get("/", getAllApplication);

module.exports = router;
