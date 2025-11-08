const express = require("express");
const {
  submitPartnershipForm,
  getAllPartnershipForm,
} = require("../controllers/partnershipFormController");

const router = express.Router();

// public
router.post("/", submitPartnershipForm);

// admin
router.get("/", getAllPartnershipForm);

module.exports = router;
