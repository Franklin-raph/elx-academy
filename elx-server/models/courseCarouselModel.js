const mongoose = require("mongoose");

const CourseCarouselSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    lessonDuration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timeStapms: true }
);

module.exports = mongoose.model("CourseCarousel", CourseCarouselSchema);

// img: "./images/download.jfif",
// title: "Cyber Security",
// mode: "Online",
// duration: "12 Weeks intensive training",
// lessonDuration: "2 Hours / Meeting",
// level: "Intermediate",
// price: "#120,000",
// id: "012",
