const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const deleteProfileImageFile = (filename) => {
  if (!filename || filename.startsWith("http")) return;

  const filePath = path.join(__dirname, "..", "uploads", "profile-images", filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

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
        runValidators: true,
      }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({
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

// ======================
// UPLOAD PROFILE IMAGE
// ======================

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image selected",
      });
    }

    const student = await User.findById(req.user.id);

    deleteProfileImageFile(student.profileImage);

    student.profileImage = req.file.filename;

    await student.save();

    res.status(200).json({
      message: "Profile photo uploaded successfully",
      profileImage: student.profileImage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ======================
// DELETE PROFILE IMAGE
// ======================

const deleteProfileImage = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);

    deleteProfileImageFile(student.profileImage);

    student.profileImage = "";

    await student.save();

    res.status(200).json({
      message: "Profile photo deleted successfully",
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
  uploadProfileImage,
  deleteProfileImage,
};
