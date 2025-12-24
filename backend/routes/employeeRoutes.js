const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getAllEmployees,
  getActiveEmployees,
  getInactiveEmployees,
  updateEmployee,
  deleteEmployee,
  searchEmployee,
  getEmployeeById,
  getDashboardStats // ✅ add this
} = require("../controllers/employeeController");

// ADD
router.post("/add", addEmployee);

// GET
router.get("/all", getAllEmployees);
router.get("/active", getActiveEmployees);
router.get("/inactive", getInactiveEmployees);
router.get("/search", searchEmployee);
router.get("/:id", getEmployeeById);

// DASHBOARD STATS
router.get("/dashboard/stats", getDashboardStats);

// UPDATE
router.put("/update/:id", updateEmployee);

// DELETE
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
