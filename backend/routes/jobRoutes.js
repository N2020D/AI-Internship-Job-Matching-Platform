const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  withdrawApplication,
  getMyAppliedJobs,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get applied jobs - MUST come before /:id route
router.get("/applied/my-jobs", protect, getMyAppliedJobs);

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes
router.post("/", protect, createJob);
router.put("/:id", protect, updateJob);
router.delete("/:id", protect, deleteJob);

router.post("/:id/apply", protect, applyJob);
router.post("/:id/withdraw", protect, withdrawApplication);

module.exports = router;
