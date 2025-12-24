const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const auth = require("../middleware/auth");

// ================= EMPLOYEE =================

// APPLY LEAVE
router.post("/", auth, async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const days =
      (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24) + 1;

    if (days <= 0) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    // 🔹 Total approved leaves used
    const approvedLeaves = await Leave.find({
      employee: req.user.id,
      status: "Approved",
    });

    let usedDays = 0;
    approvedLeaves.forEach((l) => {
      usedDays += l.days;
    });

    // 🔹 TOTAL LEAVE LIMIT = 15
    if (usedDays + days > 15) {
      return res.status(400).json({
        message: "Your leave quota is full",
      });
    }

    const leave = await Leave.create({
      employee: req.user.id,
      fromDate,
      toDate,
      reason,
      leaveType: "General", // ✅ fixed, no select
      days,
      status: "Pending",
    });

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// MY LEAVES
router.get("/my-leaves", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LEAVE SUMMARY (FOR FRONTEND)
router.get("/summary", auth, async (req, res) => {
  try {
    const approved = await Leave.find({
      employee: req.user.id,
      status: "Approved",
    });

    let used = 0;
    approved.forEach((l) => (used += l.days));

    res.json({
      total: 15,
      used,
      remaining: 15 - used,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= ADMIN =================

// ONLY PENDING LEAVES
router.get("/pending", auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ status: "Pending" })
      .populate("employee")
      .sort({ createdAt: -1 });

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE STATUS (Approve / Reject)
router.put("/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;
    await Leave.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Leave updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
