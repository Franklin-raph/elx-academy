document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (!localStorage.getItem("admin")) {
      location.assign("./elx-adminlogin.html");
    }
  },
  getAllCourses(),
  getAllStudents()
);
if (localStorage.getItem("admin")) {
  //   location.href = "./elx-adminpanel.html";
}

async function getAllCourses() {
  const response = await fetch("https://elx-server.onrender.com/api/v1/courses");
  const data = await response.json();
  console.log(data);
}

async function getAllStudents() {
  const response = await fetch("https://elx-server.onrender.com/api/v1/students");
  const data = await response.json();
  data.forEach((student) => {
    const students = document.createElement("tr");
    students.innerHTML = `
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.learningTrack}</td>
    `;
    document.querySelector("tbody").appendChild(students);
  });
  console.log(data);
}

document.querySelector("form").addEventListener("submit", postCourse);

async function postCourse(e) {
  e.preventDefault();
  const courseData = {
    title: e.target["title"].value,
    description: e.target["description"].value,
    duration: e.target["duration"].value,
    mode: e.target["mode"].value,
    lessonDuration: e.target["lessonDuration"].value,
    level: e.target["level"].value,
    price: e.target["price"].value,
    paystackLink: e.target["paystackLink"].value,
  };
  const response = await fetch("https://elx-server.onrender.com/api/v1/registerCourse", {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("admin");
  location.assign("./elx-adminlogin.html");
});

const studentTable = document.querySelector(".studentTable");
const registerCourseForm = document.querySelector(".registerCourseForm");
document.querySelector(".viewStudentButton").addEventListener("click", () => {
  studentTable.style.display = "block";
  registerCourseForm.style.display = "none";
});

document.querySelector(".registerStudentButton").addEventListener("click", () => {
  studentTable.style.display = "none";
  registerCourseForm.style.display = "block";
});
