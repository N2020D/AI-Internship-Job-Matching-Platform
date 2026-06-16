const express = require("express");
const {
  getProfile,
  updateProfile,
  getMyJobs,
  getJobApplicants,
  getJobStats,
  postJob,
  updateJobStatus,
} = require("../controllers/recruiterController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected routes - all require authentication
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Job management
router.get("/jobs", protect, getMyJobs);
router.post("/jobs", protect, postJob);
router.put("/jobs/:jobId/status", protect, updateJobStatus);

// Job applicants
router.get("/jobs/:jobId/applicants", protect, getJobApplicants);

// Statistics
router.get("/stats", protect, getJobStats);

module.exports = router;
