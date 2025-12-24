const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

/* =====================
   ADMIN REGISTER
===================== */
exports.adminRegister = async (req, res) => {
  try {
    const { name, email, password, adminId, department } = req.body;

    console.log("Admin Register payload:", req.body);

    // Validation
    if (!name || !email || !password || !adminId || !department) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check existing admin (email or adminId)
    const exist = await Admin.findOne({
      $or: [{ email }, { adminId }]
    });

    if (exist) {
      return res.status(400).json({
        message: "Admin already exists with this email or adminId"
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create admin
    await Admin.create({
      name,
      email,
      password: hashPassword,
      adminId,
      department
    });

    res.status(201).json({
      message: "Admin Registered Successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   ADMIN LOGIN
===================== */
exports.adminLogin = async (req, res) => {
  try {
    console.log("Admin Login payload:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // Select password explicitly because schema has select: false
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Admin account disabled" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.json({
      message: "Admin Login Successful",
      role: "admin",
      adminId: admin._id,
      name: admin.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================
   EMPLOYEE LOGIN
===================== */
exports.employeeLogin = async (req, res) => {
  try {
    console.log("Employee Login payload:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // Select password explicitly if schema has select: false
    const emp = await Employee.findOne({ email }).select("+password");

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (emp.status !== "active") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    res.json({
      message: "Employee Login Successful",
      employeeId: emp._id,
      name: emp.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
