const Job = require("../models/Job");
const User = require("../models/User");

// ======================
// GET ALL JOBS
// ======================
const getAllJobs = async (req, res) => {
  try {
    const { 
      search, 
      location, 
      type, 
      category, 
      salary_min, 
      salary_max,
      sort = "-createdAt",
      page = 1,
      limit = 10 
    } = req.query;

    let filter = { status: "Open" };

    // Search by title or company
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by location
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    // Filter by job type
    if (type) {
      filter.type = type;
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by salary range
    if (salary_min) {
      filter["salary.max"] = { $gte: parseInt(salary_min) };
    }
    if (salary_max) {
      filter["salary.min"] = { $lte: parseInt(salary_max) };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .populate("postedBy", "name company")
      .sort(sort)
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
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET JOB BY ID
// ======================
const getJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate("postedBy", "name email company")
      .populate("applicants", "name email");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// CREATE JOB
// ======================
const createJob = async (req, res) => {
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
    });

    await job.save();

    res.status(201).json({
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE JOB
// ======================
const updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }

    job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE JOB
// ======================
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check if user is the one who posted the job
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this job",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// APPLY FOR JOB
// ======================
const applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check if already applied
    if (job.applicants.includes(req.user.id)) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    job.applicants.push(req.user.id);
    await job.save();

    res.status(200).json({
      message: "Applied successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// WITHDRAW APPLICATION
// ======================
const withdrawApplication = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const index = job.applicants.indexOf(req.user.id);
    if (index === -1) {
      return res.status(400).json({
        message: "You have not applied for this job",
      });
    }

    job.applicants.splice(index, 1);
    await job.save();

    res.status(200).json({
      message: "Application withdrawn",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// GET MY APPLIED JOBS
// ======================
const getMyAppliedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      applicants: req.user.id,
    })
      .populate("postedBy", "name company")
      .sort("-createdAt");

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  applyJob,
  withdrawApplication,
  getMyAppliedJobs,
};
