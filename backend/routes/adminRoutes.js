const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
  getStudents,
  getStudentById,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
  getRecruiters,
  getRecruiterById,
  updateRecruiter,
  updateRecruiterStatus,
  deleteRecruiter,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
  getApplications,
  getReports,
  getSettings,
} = require("../controllers/adminController");

const router = express.Router();

router.use(protect, authorizeRoles("admin"));

router.get("/dashboard", getDashboard);

router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.patch("/students/:id/status", updateStudentStatus);
router.delete("/students/:id", deleteStudent);

router.get("/recruiters", getRecruiters);
router.get("/recruiters/:id", getRecruiterById);
router.put("/recruiters/:id", updateRecruiter);
router.patch("/recruiters/:id/status", updateRecruiterStatus);
router.delete("/recruiters/:id", deleteRecruiter);

router.get("/jobs", getJobs);
router.get("/jobs/:id", getJobById);
router.put("/jobs/:id", updateJob);
router.patch("/jobs/:id/status", updateJobStatus);
router.delete("/jobs/:id", deleteJob);

router.get("/applications", getApplications);
router.get("/reports", getReports);
router.get("/settings", getSettings);

module.exports = router;