const express = require("express");
const router = express.Router();
const Salary = require("../models/Salary");

// ADMIN – Create salary slip
router.post("/add", async (req, res) => {
  try {
    const salary = new Salary(req.body);
    await salary.save();
    res.status(201).json({ message: "Salary slip created", salary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EMPLOYEE – Get salary slips by employee id
router.get("/employee/:id", async (req, res) => {
  try {
    const salary = await Salary.find({ employee: req.params.id });
    res.json(salary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
