const Job = require("../models/Job");
const User = require("../models/User");

// ======================
// GET RECRUITER PROFILE
// ======================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// UPDATE RECRUITER PROFILE
// ======================
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, company, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone, company, bio },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Profile updated", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================
// GET MY POSTED JOBS
// ======================
const getMyJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;

    let filter = { postedBy: req.user.id };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      jobs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// GET JOB APPLICANTS
// ======================
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId)
      .populate("applicants", "name email phone resume profileImage")
      .populate("postedBy", "name");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if recruiter owns this job
    if (job.postedBy._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({
      job: {
        title: job.title,
        company: job.company,
        applicants: job.applicants,
        totalApplicants: job.applicants.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// GET JOB STATISTICS
// ======================
const getJobStats = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id });

    const totalJobs = jobs.length;
    const openJobs = jobs.filter((j) => j.status === "Open").length;
    const closedJobs = jobs.filter((j) => j.status === "Closed").length;
    const totalApplications = jobs.reduce((sum, job) => sum + job.applicants.length, 0);
    const avgApplicationsPerJob = totalJobs > 0 ? Math.round(totalApplications / totalJobs) : 0;

    res.status(200).json({
      totalJobs,
      openJobs,
      closedJobs,
      totalApplications,
      avgApplicationsPerJob,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================
// POST JOB (extends jobController.createJob with recruiter ownership)
// ======================
const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      responsibilities,
      skills,
      experience,
      education,
      category,
      deadline,
    } = req.body;

    if (!title || !company || !location || !description) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const job = new Job({
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      skills: skills || [],
      experience,
      education,
      category,
      deadline,
      postedBy: req.user.id,
      status: "Open",
    });

    await job.save();

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ======================
// UPDATE JOB STATUS
// ======================
const updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    if (!["Open", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    job.status = status;
    await job.save();

    res.status(200).json({ message: "Job status updated", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const saveAIAnalysis = async (req, res) => {

  try {

    const {

      atsScore,

      resumeSkills,

      matchedSkills,

      missingSkills,

      recommendedRoles,

    } = req.body;

    const student = await User.findById(req.user.id);

    student.atsScore = atsScore;
    student.resumeSkills = resumeSkills;
    student.matchedSkills = matchedSkills;
    student.missingSkills = missingSkills;
    student.recommendedRoles = recommendedRoles;

    await student.save();

    res.json({
      message: "AI Analysis Saved",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getProfile,
  updateProfile,
  getMyJobs,
  saveAIAnalysis,
  getJobApplicants,
  getJobStats,
  postJob,
  updateJobStatus,
};
