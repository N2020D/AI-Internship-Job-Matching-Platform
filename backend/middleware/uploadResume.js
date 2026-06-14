const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination(req, file, cb) {

    cb(null, "uploads/resumes");

  },

  filename(req, file, cb) {

    cb(

      null,

      Date.now() +

        path.extname(file.originalname)

    );

  },

});

const fileFilter = (req, file, cb) => {

  const allowed = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  ];

  if (allowed.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(new Error("Only PDF or DOC files"));

  }

};

module.exports = multer({

  storage,

  fileFilter,

  limits: {

    fileSize: 5 * 1024 * 1024,

  },

});