const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

/* =====================
   ADD EMPLOYEE
===================== */
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, password, role, department, salary, status } = req.body;

    if (!name || !email || !password || !role || !department || salary == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(salary)) return res.status(400).json({ message: "Salary must be a number" });

    const existingEmp = await Employee.findOne({ email });
    if (existingEmp) return res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const emp = await Employee.create({
      name,
      email,
      password: hashPassword,
      role,
      department,
      salary,
      status: status || "active"
    });

    res.status(201).json({
      message: "Employee added successfully",
      employeeId: emp._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   UPDATE EMPLOYEE
===================== */
exports.updateEmployee = async (req, res) => {
  try {
    const data = { ...req.body };

    if (data.password && data.password.trim() !== "") {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }

    if (data.status && !["active", "inactive"].includes(data.status)) {
      data.status = "active";
    }

    const emp = await Employee.findByIdAndUpdate(req.params.id, data, { new: true }).select("-password");
    if (!emp) return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: emp });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   GET EMPLOYEE BY ID
===================== */
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).select("-password").lean();
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   GET ALL EMPLOYEES
===================== */
exports.getAllEmployees = async (req, res) => {
  try {
    const emp = await Employee.find().select("-password").sort({ createdAt: -1 }).lean();
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   GET ACTIVE EMPLOYEES
===================== */
exports.getActiveEmployees = async (req, res) => {
  try {
    const emp = await Employee.find({ status: "active" }).select("-password").lean();
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   GET INACTIVE EMPLOYEES
===================== */
exports.getInactiveEmployees = async (req, res) => {
  try {
    const emp = await Employee.find({ status: "inactive" }).select("-password").lean();
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   DELETE EMPLOYEE
===================== */
exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   SEARCH EMPLOYEE
===================== */
exports.searchEmployee = async (req, res) => {
  try {
    const { name = "", status } = req.query;
    const filter = { name: { $regex: name, $options: "i" } };
    if (status) filter.status = status;

    const emp = await Employee.find(filter).select("-password").lean();
    res.json(emp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   DASHBOARD STATS
===================== */
exports.getDashboardStats = async (req, res) => {
  try {
    const [totalEmployees, activeEmployees, inactiveEmployees, salaryAgg] =
      await Promise.all([
        Employee.countDocuments(),
        Employee.countDocuments({ status: "active" }),
        Employee.countDocuments({ status: "inactive" }),
        Employee.aggregate([{ $group: { _id: null, totalSalary: { $sum: "$salary" } } }])
      ]);

    res.json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalSalary: salaryAgg[0]?.totalSalary || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
