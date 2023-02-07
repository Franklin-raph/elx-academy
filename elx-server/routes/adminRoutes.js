const express = require("express");
const router = express.Router();
const {
  registerCourse,
  getAllCourses,
  getASingleCourse,
  registerAdminPass,
  loginAdmin,
  adminLogout,
  courseUpdate,
  courseDelete,
} = require("../controllers/adminController");

router.post("/registerCourse", registerCourse);
router.get("/courses", getAllCourses);
router.get("/course/:courseId", getASingleCourse);
router.post("/registerAdminPassword", registerAdminPass);
router.post("/loginAdmin", loginAdmin);
router.get("/adminLogout", adminLogout);
router.put("/courseUpdate/:courseId", courseUpdate);
router.delete("/courseDelete/:courseId", courseDelete);
module.exports = router;
