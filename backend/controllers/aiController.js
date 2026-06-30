const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const User = require("../models/User");

exports.analyzeResume = async (req, res) => {

  
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "Resume is required",
      });
    }

    const formData = new FormData();

    formData.append(
      "resume",
      fs.createReadStream(req.file.path)
    );

    formData.append(
      "job_description",
      req.body.job_description || ""
    );

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );





    await User.findByIdAndUpdate(

    req.user.id,

    {

        atsScore: response.data.ats_score,

    }

);

    fs.unlinkSync(req.file.path);

    res.json(response.data);

  } catch (error) {

    console.log(error.message);

    res.status(500).json({
      message: "AI Analysis Failed",
    });

  }
};