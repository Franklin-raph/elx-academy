const Course = require("../models/courseDetailModel");

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

module.exports = {
  registerCourse,
  getAllCourses,
  getASingleCourse,
};
