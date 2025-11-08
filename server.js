const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/application");
const serviceInquiryRoutes = require("./routes/serviceInquiry");
const generalInquiryRoutes = require("./routes/generalInquiry");
const partnershipFormRoutes = require("./routes/partnershipForm");
const donationRoutes = require("./routes/donation");
const otcInquiryRoutees = require("./routes/otcInquiry");
const researchRoutes = require("./routes/research");
const cors = require("cors");

// enables usage of .env files
require("dotenv").config();

// create the expres app
const app = express();

// setup middlwares (code that runs for every request)
app.use(cors());
app.use(express.json());

// our port
const PORT = process.env.PORT || 5000;

// home endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello! this is the home endpont of our backend",
    data: {
      name: "Digioats-Backend-Api data",
    },
  });
});

// actual endpoints

app.use("/api/application", applicationRoutes);
app.use("/api/serviceInquiry", serviceInquiryRoutes);
app.use("/api/generalInquiry", generalInquiryRoutes);
app.use("/api/partnershipForm", partnershipFormRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/otcInquiry", otcInquiryRoutees);
app.use("/api/research", researchRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Something went wrong", details: err.message });
});

// Connect DB with serverless optimization
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("DB Connection Successful");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    throw error;
  }
};

// SERVERLESS EXPORT - THIS IS CRITICAL
const handler = async (req, res) => {
  try {
    console.log("Handler started - attempting DB connection");
    await connectDB();
    console.log("DB connected successfully - processing request");
    return app(req, res);
  } catch (error) {
    console.error("Server error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      type: error.name,
    });
  }
};

module.exports = handler;

// Allow the same file to run locally with `node server.js`
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  })();
}
