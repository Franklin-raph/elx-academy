const express = require("express");
const router = express.Router();
const { registerCourse, getAllCourses, getASingleCourse } = require("../controllers/adminController");

router.post("/registerCourse", registerCourse);
router.get("/courses", getAllCourses);
router.get("/course/:courseId", getASingleCourse);

module.exports = router;
