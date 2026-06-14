const express = require("express");
const upload = require("../middleware/uploadResume");

const router = express.Router();

const {

    getProfile,

    updateProfile,
    uploadResume
} = require("../controllers/studentController");

const {

    protect,

} = require("../middleware/authMiddleware");

router.get(

    "/profile",

    protect,

    getProfile

);

router.put(

    "/profile",

    protect,

    updateProfile

);

router.put(

    "/resume",

    protect,

    upload.single("resume"),

    uploadResume

);

module.exports = router;