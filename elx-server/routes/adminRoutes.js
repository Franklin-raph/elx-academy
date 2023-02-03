const express = require("express");
const router = express.Router();
const {
  registerCourse,
  getAllCourses,
  getASingleCourse,
  registerAdminPass,
  loginAdmin,
  adminLogout,
} = require("../controllers/adminController");

router.post("/registerCourse", registerCourse);
router.get("/courses", getAllCourses);
router.get("/course/:courseId", getASingleCourse);
router.post("/registerAdminPassword", registerAdminPass);
router.post("/loginAdmin", loginAdmin);
router.get("/adminLogout", adminLogout);
module.exports = router;
