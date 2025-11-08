const mongoose = require("mongoose");

const researchSchema = new mongoose.Schema(
  {
    documentTitle: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["White Papers", "Journals", "Case Studies", "Reports", "Articles"],
      default: "White Papers",
    },
    authur: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Research", researchSchema);
