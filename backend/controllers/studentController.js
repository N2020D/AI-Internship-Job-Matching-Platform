const User = require("../models/User");

// ======================
// GET PROFILE
// ======================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPDATE PROFILE
// ======================

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// UPLOAD RESUME
// ======================

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file selected",
      });
    }

    const student = await User.findById(req.user.id);

    student.resume = req.file.filename;

    await student.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: student.resume,
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
  uploadResume,
};