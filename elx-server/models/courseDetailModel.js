const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema(
  {
    courseImg:{
      type: String,
    },
    // cloudinary_id: {
    //   type: String,
    // },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    lessonDuration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    paystackLink: {
      type: String,
    },
    courseId: {
      type: String,
    },
  },
  { timeStapms: true }
);

module.exports = mongoose.model("Course", CourseSchema);
