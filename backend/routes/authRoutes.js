const express = require("express");
const router = express.Router();

const {
  adminRegister,
  adminLogin,
  employeeLogin
} = require("../controllers/authController");

/* =====================
   ADMIN AUTH ROUTES
===================== */

// Admin Registration
router.post("/admin/register", adminRegister);

// Admin Login
router.post("/admin/login", adminLogin);

/* =====================
   EMPLOYEE AUTH ROUTES
===================== */

// Employee Login
router.post("/employee/login", employeeLogin);

module.exports = router;
