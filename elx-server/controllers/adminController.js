const Course = require("../models/courseModel");

const registerCourse = (req, res) => {
  const { stack, duration, description, price, level } = req.body;
  try {
    if (!stack || !duration || !description || !price || !level) {
      res.status(400).json({ msg: "Please Fill in all fields" });
      return;
    } else {
      // creating the user
      const course = new Course({
        stack,
        duration,
        description,
        price,
        level,
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
    const course = await Course.findById(courseId);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ Err: error.message });
  }
};

module.exports = {
  registerCourse,
  getAllCourses,
  getASingleCourse,
};
