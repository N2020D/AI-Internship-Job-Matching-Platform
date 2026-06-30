const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadAIResume");

const {
  analyzeResume,
} = require("../controllers/aiController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post(
  "/analyze-resume",
  protect,
  upload.single("resume"),
  analyzeResume
);

module.exports = router;