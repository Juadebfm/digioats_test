const mongoose = require("mongoose");

const OtcInquirySchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      reqiured: true,
      trim: true,
    },
    company: {
      type: String,
      reqiured: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      reqiured: true,
      min: 10,
    },
    cryptoCurrency: {
      type: String,
      required: true,
      enum: ["Bitcoin", "Ethereum", "USDT"],
    },
    fiatCurrency: {
      type: String,
      required: true,
      enum: ["USD", "Naira"],
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "In progress", "Completed"],
    },
    date: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OtcInquiry", OtcInquirySchema);
