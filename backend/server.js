const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const jobRoutes = require("./routes/jobRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const adminRoutes = require("./routes/adminRoutes");

const aiRoutes = require("./routes/aiRoutes");

dotenv.config();

const app = express();

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
  
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);






app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });


