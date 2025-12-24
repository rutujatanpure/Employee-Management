const express = require("express");
const router = express.Router();
const { dashboardStats } = require("../controllers/adminDashboardController");

router.get("/dashboard/stats", dashboardStats);

module.exports = router;
