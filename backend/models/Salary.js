const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  employeeName: String,
  employeeId: String,
  role: String,

  month: String,
  year: Number,

  basicSalary: Number,
  pfCut: Number,
  tdsCut: Number,
  netSalary: Number,

  status: {
    type: String,
    enum: ["Paid", "Pending"],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Salary", salarySchema);
