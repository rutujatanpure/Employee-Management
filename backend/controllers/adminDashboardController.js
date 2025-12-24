const Employee = require("../models/Employee");
const Leave = require("../models/Leave");
const Attendance = require("../models/Attendance");
const Salary = require("../models/Salary");

exports.dashboardStats = async (req, res) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      salaryAgg
    ] = await Promise.all([
      Employee.countDocuments(),
      Employee.countDocuments({ status: "active" }),
      Employee.countDocuments({ status: "inactive" }),
      Leave.countDocuments(),
      Leave.countDocuments({ status: "Pending" }),
      Leave.countDocuments({ status: "Approved" }),
      Salary.aggregate([
        { $group: { _id: null, totalSalary: { $sum: "$amount" } } }
      ])
    ]);

    // ✅ Employees currently working (not on approved leave)
    const workingEmployees = totalEmployees - approvedLeaves;

    res.json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalLeaves,
      pendingLeaves,
      workingEmployees,
      totalSalary: salaryAgg[0]?.totalSalary || 0
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: "Dashboard stats error" });
  }
};
