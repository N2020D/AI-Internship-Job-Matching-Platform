const User = require("../models/User");
const Job = require("../models/Job");

const getDashboard = async (req, res) => {
  try {
    const [students, recruiters, jobs] = await Promise.all([
      User.find({ role: "student" }).select("name email profileImage status resume atsScore createdAt").sort("-createdAt"),
      User.find({ role: "recruiter" }).select("name email company phone status createdAt").sort("-createdAt"),
      Job.find({}).populate("postedBy", "name email company status role").sort("-createdAt"),
    ]);

    const totalApplications = jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0);
    const activeJobs = jobs.filter((job) => job.status === "Open").length;

    const recentActivity = [
      ...students.slice(0, 2).map((student) => ({
        time: new Date(student.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        activity: "Student registered",
      })),
      ...jobs.slice(0, 2).map((job) => ({
        time: new Date(job.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        activity: `${job.postedBy?.role === "recruiter" ? "Recruiter posted job" : "Job posted"}`,
      })),
    ].slice(0, 5);

    res.status(200).json({
      metrics: {
        totalStudents: students.length,
        totalRecruiters: recruiters.length,
        totalJobs: jobs.length,
        totalApplications,
        activeJobs,
      },
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;
    const filter = { role: "student" };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      filter.status = status;
    }

    const students = await User.find(filter).select("name email phone profileImage resume status university degree atsScore createdAt").sort("-createdAt");

    const stats = {
      totalStudents: await User.countDocuments({ role: "student" }),
      studentsWithResume: await User.countDocuments({
        role: "student",
        resume: { $exists: true, $nin: ["", null] },
      }),
      studentsWithoutResume: await User.countDocuments({
        role: "student",
        $or: [{ resume: { $exists: false } }, { resume: "" }, { resume: null }],
      }),
    };

    res.status(200).json({ students, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({ _id: req.params.id, role: "student" }).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const student = await User.findOneAndUpdate(
      { _id: req.params.id, role: "student" },
      { status },
      { new: true, runValidators: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({ _id: req.params.id, role: "student" });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecruiters = async (req, res) => {
  try {
    const recruiters = await User.find({ role: "recruiter" }).select("name email company phone status createdAt").sort("-createdAt");

    const stats = {
      totalRecruiters: recruiters.length,
      activeRecruiters: recruiters.filter((recruiter) => recruiter.status === "Active").length,
      pendingCompanies: recruiters.filter((recruiter) => recruiter.status === "Pending").length,
    };

    res.status(200).json({ recruiters, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRecruiterById = async (req, res) => {
  try {
    const recruiter = await User.findOne({ _id: req.params.id, role: "recruiter" }).select("-password");

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    const jobsPosted = await Job.countDocuments({ postedBy: recruiter._id });

    res.status(200).json({ ...recruiter.toObject(), jobsPosted });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRecruiter = async (req, res) => {
  try {
    const recruiter = await User.findOneAndUpdate(
      { _id: req.params.id, role: "recruiter" },
      req.body,
      { new: true, runValidators: true }
    ).select("-password");

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRecruiterStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const recruiter = await User.findOneAndUpdate(
      { _id: req.params.id, role: "recruiter" },
      { status },
      { new: true, runValidators: true }
    ).select("-password");

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRecruiter = async (req, res) => {
  try {
    const recruiter = await User.findOneAndDelete({ _id: req.params.id, role: "recruiter" });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json({ message: "Recruiter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const { status = "", type = "" } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = type;

    const jobs = await Job.find(filter).populate("postedBy", "name email company role status").sort("-createdAt");

    const stats = {
      totalJobs: await Job.countDocuments({}),
      openJobs: await Job.countDocuments({ status: "Open" }),
      closedJobs: await Job.countDocuments({ status: "Closed" }),
      applicationsCount: jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0),
    };

    res.status(200).json({ jobs, stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("postedBy", "name email company status role").populate("applicants", "name email phone resume profileImage status atsScore");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const { status, featured } = req.body;
    const update = {};

    if (status) update.status = status;
    if (typeof featured === "boolean") update.featured = featured;

    const job = await Job.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getApplications = async (req, res) => {
  try {
    const jobs = await Job.find({}).populate("postedBy", "name company status").populate("applicants", "name email profileImage status createdAt").sort("-createdAt");

    const applications = jobs.flatMap((job) =>
      (job.applicants || []).map((student) => ({
        _id: `${job._id}-${student._id}`,
        student,
        job: {
          _id: job._id,
          title: job.title,
          company: job.company,
          status: job.status,
          createdAt: job.createdAt,
        },
        appliedDate: student.createdAt || job.createdAt,
        status: "Applied",
      }))
    );

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReports = async (req, res) => {
  try {
    const [students, recruiters, jobs] = await Promise.all([
      User.find({ role: "student" }),
      User.find({ role: "recruiter" }),
      Job.find({}),
    ]);

    const studentReport = {
      totalStudents: students.length,
      averageATS: students.length
        ? Math.round(students.reduce((sum, student) => sum + (student.atsScore || 0), 0) / students.length)
        : 0,
      topSkills: [],
      topUniversities: [],
      applications: jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0),
    };

    const recruiterReport = {
      totalRecruiters: recruiters.length,
      jobsPosted: jobs.length,
    };

    const jobReport = {
      totalJobs: jobs.length,
      openJobs: jobs.filter((job) => job.status === "Open").length,
      closedJobs: jobs.filter((job) => job.status === "Closed").length,
    };

    const applicationReport = {
      totalApplications: jobs.reduce((sum, job) => sum + (job.applicants?.length || 0), 0),
    };

    res.status(200).json({ studentReport, recruiterReport, jobReport, applicationReport });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSettings = async (req, res) => {
  res.status(200).json({
    adminProfile: {
      name: req.user?.name || "Admin",
      email: req.user?.email || "",
    },
    platformSettings: {
      emailNotifications: true,
      aiConfiguration: true,
      resumeUploadSize: "5MB",
      allowedFileTypes: ["pdf", "doc", "docx"],
      maintenanceMode: false,
    },
  });
};

module.exports = {
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
};