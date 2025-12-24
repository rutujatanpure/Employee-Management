const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false // 👈 password never returned by default
    },

    adminId: {
      type: String,
      required: [true, "Admin ID is required"],
      unique: true,
      uppercase: true,
      index: true
    },

    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ADMIN"],
      default: "ADMIN"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Admin", adminSchema);
