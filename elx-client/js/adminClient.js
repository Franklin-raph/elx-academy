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

const coursesContainer = document.querySelector(".coursesContainer");

async function getAllCourses() {
  const response = await fetch("https://elx-server.onrender.com/api/v1/courses");
  const data = await response.json();
  data.forEach((course) => {
    const couseDIv = document.createElement("div");
    couseDIv.innerHTML = `
      <div style="cursor:pointer" class="p-2 border rounded-2 d-flex justify-content-between align-items-center" onclick="viewCourse(${course.courseId})">
        <h6 class="mb-0 pb-0">${course.title}</h6>
          <i class="ri-pencil-fill text-warning"></i>
      </div>
    `;
    couseDIv.classList.add("col-10", "col-md-6", "col-lg-3", "mb-4");
    coursesContainer.appendChild(couseDIv);
  });
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

let imageUrl = null
function encodeImageFileAsURL(element) {
  let file = element.files[0];
  let reader = new FileReader();
  reader.onloadend = function() {
    imageUrl = reader.result
    // document.write('RESULT: ', reader.result);
  }
  reader.readAsDataURL(file);
}

// console.log(imageUrl)

async function postCourse(e) {
  e.preventDefault();
  
  // const formData = new FormData()
  // formData.append('title', e.target["title"].value)
  // formData.append('description', e.target["description"].value)
  // formData.append('duration', e.target["duration"].value)
  // formData.append('mode', e.target["mode"].value)
  // formData.append('lessonDuration', e.target["lessonDuration"].value)
  // formData.append('level', e.target["level"].value)
  // formData.append('price', e.target["price"].value)
  // formData.append('paystackLink', e.target["paystackLink"].value)

  // console.log(...formData)
  const courseData = {
    title: e.target["title"].value,
    description: e.target["description"].value,
    duration: e.target["duration"].value,
    mode: e.target["mode"].value,
    lessonDuration: e.target["lessonDuration"].value,
    level: e.target["level"].value,
    price: e.target["price"].value,
    paystackLink: e.target["paystackLink"].value,
    coursePhoto:imageUrl
  };
  const response = await fetch("https://elx-server.onrender.com/api/v1/registerCourse", {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  const data = await response.json();
}

function viewCourse(courseId) {
  location.assign(`./elx-courseDetail.html#${courseId}`);
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("admin");
  location.assign("./elx-adminlogin.html");
});

const studentTable = document.querySelector(".studentTable");
const registerCourseForm = document.querySelector(".registerCourseForm");
const allCourses = document.querySelector(".allCourses");

document.querySelector(".viewStudentButton").addEventListener("click", () => {
  studentTable.style.display = "block";
  registerCourseForm.style.display = "none";
  allCourses.style.display = "none";
});

document.querySelector(".registerStudentButton").addEventListener("click", () => {
  studentTable.style.display = "none";
  registerCourseForm.style.display = "block";
  allCourses.style.display = "none";
});

document.querySelector(".viewCoursesButton").addEventListener("click", () => {
  studentTable.style.display = "none";
  registerCourseForm.style.display = "none";
  allCourses.style.display = "block";
});
