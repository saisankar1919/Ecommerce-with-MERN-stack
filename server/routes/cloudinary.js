const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers
const { upload, remove, profileImage, profileImageRemove } = require("../controllers/cloudinary");

router.post("/uploadimages", authCheck, adminCheck, upload);
router.post("/removeimage", authCheck, adminCheck, remove);

router.post("/profileimage",authCheck,profileImage);
router.post("/deleteprofileimage",authCheck,profileImageRemove);

module.exports = router;
