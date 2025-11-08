const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 10,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["credit card", "paypal", "bank transfer", "crypto", "others"],
    },
    message: {
      type: String,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);
