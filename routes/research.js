const express = require("express");
const {
  research,
  getAllResearchDocuments,
} = require("../controllers/researchController");

const router = express.Router();

// admin
router.post("/", research);

// public
router.get("/", getAllResearchDocuments);

module.exports = router;
