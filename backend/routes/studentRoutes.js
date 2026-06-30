const express = require("express");
const upload = require("../middleware/uploadAIResume");
const uploadProfileImage = require("../middleware/uploadProfileImage");

const router = express.Router();

const {

    getProfile,

    updateProfile,
    uploadResume,
    uploadProfileImage: uploadProfileImageController,
    deleteProfileImage,
    deleteResume,
    saveAIAnalysis,
    
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

router.put(

    "/profile/photo",

    protect,

    uploadProfileImage.single("profileImage"),

    uploadProfileImageController

);

router.delete(

    "/profile/photo",

    protect,

    deleteProfileImage

);

router.delete(

    "/resume",

    protect,

    deleteResume

);

router.post(

    "/ai-analysis",

    protect,

    saveAIAnalysis

);

module.exports = router;
