const Course = require("../models/courseDetailModel");
const AdminPass = require("../models/adminPassModel");
const bcrypt = require("bcrypt");

const registerCourse = (req, res) => {
  const { title, duration, description, price, level, lessonDuration, mode, courseId, paystackLink } = req.body;
  try {
    if (!title || !duration || !description || !price || !level || !lessonDuration || !mode) {
      res.status(400).json({ msg: "Please Fill in all fields" });
      return;
    } else {
      // creating the user
      const course = new Course({
        title,
        duration,
        description,
        price,
        level,
        lessonDuration,
        mode,
        courseId: Date.now(),
        paystackLink,
      });
      course.save();
      res.status(201).json(course);
    }
  } catch (error) {
    res.status(500).json({ Err: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ Err: error.message });
  }
};

const getASingleCourse = async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  try {
    const course = await Course.findOne({ courseId });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ Err: error.message });
  }
};

const registerAdminPass = async (req, res) => {
  const { password } = req.body;
  try {
    if (!password) {
      res.status(400).json({ msg: "Field can not be empty" });
    } else {
      const adminPassword = new AdminPass({ password });
      const salt = await bcrypt.genSalt(10);
      adminPassword.password = await bcrypt.hash(password, salt);
      await adminPassword.save();

      res.status(201).json({ msg: adminPassword });
    }
  } catch (error) {
    res.status(500).json({ Err: error.message });
  }
};

const loginAdmin = async (req, res) => {
  const { password } = req.body;
  try {
    if (!password) {
      res.status(400).json({ msg: "Field can not be empty" });
      return;
    }
    const adminPass = await AdminPass.find();

    let isMatch = await bcrypt.compare(password, adminPass[0].password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid login credentials" });
    if (isMatch) {
      res.cookie("adminSecret", Date.now(), { httpOnly: true, maxAge: 60 * 60 * 1000 * 24 * 3 });
      return res.status(200).json({ msg: "Login was successfull" });
    }
  } catch (error) {
    return res.status(500).json({ Err: error.message });
  }
};

const adminLogout = (req, res) => {
  res.cookie("adminSecret", "", { maxAge: 1 });
  return res.status(200).send({ msg: "Admin is signed out" });
};

module.exports = {
  registerCourse,
  getAllCourses,
  getASingleCourse,
  registerAdminPass,
  loginAdmin,
  adminLogout,
};
