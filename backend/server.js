const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employees", require("./routes/employeeRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/employee-self", require("./routes/employeeSelfRoutes"));
app.use("/api/salary", require("./routes/salaryRoutes"));

//app.use("/api/leave", require("./routes/leaveRoutes"));

app.use("/api/admin", require("./routes/adminDashboardRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

