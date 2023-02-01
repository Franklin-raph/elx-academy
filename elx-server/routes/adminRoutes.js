const express = require("express");
const router = express.Router();
const {
  registerCourse,
  getAllCourses,
  getASingleCourse,
  registerCourseCarousel,
  getAllCoursesCarousel,
} = require("../controllers/adminController");

router.post("/registerCourse", registerCourse);
router.get("/courses", getAllCourses);
router.get("/course/:courseId", getASingleCourse);

router.post("/registerCourseCarousel", registerCourseCarousel);
router.get("/CourseCarousel", getAllCoursesCarousel);

module.exports = router;
