const express = require("express");
const router = express.Router();

const {
  myProfile,
  myAttendance,
  applyLeave,
  mySalary
} = require("../controllers/employeeSelfController");

router.get("/profile/:id", myProfile);
router.get("/attendance/:id", myAttendance);
router.post("/leave/:id", applyLeave);
router.get("/salary/:id", mySalary);

module.exports = router;
