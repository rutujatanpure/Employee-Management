const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Salary = require("../models/Salary");

/* =====================
   MY PROFILE
===================== */
exports.myProfile = async (req, res) => {
  const emp = await Employee.findById(req.params.id).select("-password");
  res.json(emp);
};

/* =====================
   MY ATTENDANCE
===================== */
exports.myAttendance = async (req, res) => {
  const data = await Attendance.find({ employee: req.params.id });
  res.json(data);
};

/* =====================
   APPLY LEAVE
===================== */
exports.applyLeave = async (req, res) => {
  const leave = await Leave.create({
    employee: req.user.id, // use logged-in user from auth middleware
    ...req.body
  });
  res.json({ message: "Leave Applied", leave });
};


/* =====================
   MY SALARY SLIP
===================== */
exports.mySalary = async (req, res) => {
  const salary = await Salary.find({ employee: req.params.id });
  res.json(salary);
};
