const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  department: String,
  salary: Number,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  image: String
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
