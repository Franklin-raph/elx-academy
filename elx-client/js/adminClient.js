document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (!localStorage.getItem("admin")) {
      location.assign("./elx-adminlogin.html");
    }
  },
  getAllCourses(),
  getAllStudents(),
  getAllfacilitators()
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
// https://elx-server.onrender.com/api/v1/students
async function getAllStudents() {
  const response = await fetch("https://elx-server.onrender.com/api/v1/students");
  const data = await response.json();
  data.forEach((student) => {
    const students = document.createElement("tr");
    students.innerHTML = `
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.learningTrack}</td>
        <td>${student.queryStudent}</td>
        <td>${student.school}</td>
    `;
    document.querySelector("tbody").appendChild(students);
  });
  console.log(data);
}
// https://elx-server.onrender.com/api/v1/students
async function getAllfacilitators() {
  const response = await fetch("https://elx-server.onrender.com/api/v1/facilitator/facilitators");
  const data = await response.json();
  console.log(data)
  data.forEach((facilitator) => {
    const facilitators = document.createElement("tr");
    facilitators.innerHTML = `
        <td>${facilitator.firstName}</td>
        <td>${facilitator.lastName}</td>
        <td>${facilitator.email}</td>
        <td>${facilitator.learningTrack}</td>
    `;
    document.querySelector(".facilitatorTableBody").appendChild(facilitators);
    // console.log(facilitators);
  });
}

document.querySelector("form").addEventListener("submit", postCourse);

// const convertBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//           resolve(fileReader.result);
//       };

//       fileReader.onerror = (error) => {
//           reject(error);
//       };
//   });
// };

// const uploadImage = async (event) => {
//   const file = event.target.files[0];
//   const base64 = await convertBase64(file);
//   return base64
// };

// let img = null;
// document.querySelector('.imgInput').addEventListener("change", async (e) => {
//   // img = await uploadImage(e)
//   // uploadImage(e);
//   console.log(document.querySelector('.imgInput').value)
// });

async function postCourse(e) {
  e.preventDefault();
  console.log("Loading...")
  // https://elx-server.onrender.com/api/v1/registerCourse
  const courseData = {
    title: e.target["title"].value,
    description: e.target["description"].value,
    duration: e.target["duration"].value,
    mode: e.target["mode"].value,
    lessonDuration: e.target["lessonDuration"].value,
    level: e.target["level"].value,
    price: e.target["price"].value,
    paystackLink: e.target["paystackLink"].value,
    courseImg: e.target["image"].value
  };
  console.log(courseData)
  const response = await fetch("https://elx-server.onrender.com/api/v1/registerCourse", {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response)
  if(response){
    console.log("Responded...")
  }
  const data = await response.json();
  console.log(data)
  if(response.ok){
    alert("Course was successfully registered")
    location.assign('./elx-adminpanel.html')
  }
}

function viewCourse(courseId) {
  location.assign(`./elx-courseDetail.html#${courseId}`);
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("admin");
  location.assign("./elx-adminlogin.html");
});

const studentTable = document.querySelector(".studentTable");
const facilitatorTable = document.querySelector(".facilitatorTable");
const registerCourseForm = document.querySelector(".registerCourseForm");
const allCourses = document.querySelector(".allCourses");

document.querySelector(".viewStudentButton").addEventListener("click", () => {
  studentTable.style.display = "block";
  facilitatorTable.style.display = "none";
  registerCourseForm.style.display = "none";
  allCourses.style.display = "none";
});

document.querySelector(".viewFacilitatorButton").addEventListener("click", () => {
  facilitatorTable.style.display = "block";
  studentTable.style.display = "none";
  registerCourseForm.style.display = "none";
  allCourses.style.display = "none";
});

document.querySelector(".registerStudentButton").addEventListener("click", () => {
  studentTable.style.display = "none";
  facilitatorTable.style.display = "none";
  registerCourseForm.style.display = "block";
  allCourses.style.display = "none";
});

document.querySelector(".viewCoursesButton").addEventListener("click", () => {
  studentTable.style.display = "none";
  facilitatorTable.style.display = "none";
  registerCourseForm.style.display = "none";
  allCourses.style.display = "block";
});
