const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define what an admin looks like in ur database
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Hash Password
adminSchema.pre("save", async function (next) {
  // if not new or recently modified continue to saving
  if (!this.isModified("password")) return next();

  // if it's new or recently modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// to compare password or login
adminSchema.methods.comparePassword = async function (adminPassword) {
  return bcrypt.compare(adminPassword, this.password);
};

// Increment token version (for logout)
adminSchema.methods.incrementTokenVersion = async function () {
  this.tokenVersion += 1;
  await this.save();
};

// export the schma t be used inn a controller
module.exports = mongoose.model("Admin", adminSchema);
