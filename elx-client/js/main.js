const signUpModal = document.querySelector("#signupmodal");
const loaderContainer = document.querySelector(".loaderContainer");
const errorMessage = document.querySelector(".error");
const navLinks = document.querySelector(".hero ul");
const courseModal = document.querySelector("#courseModal");

const getAllCourses = async () => {
  const response = await fetch("https://elx-server.onrender.com/api/v1/courses");
  const data = await response.json();
  if (response.ok) {
    data.forEach((course) => {
      const courses = document.createElement("div");
      courses.classList.add("course");
      courses.innerHTML += `
          <img src="./images/api2.jpg" alt="" />
          <div class="courseInfo">
            <p>${course.title}</p>
            <div class="courseFormat">
              <ul>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>${course.mode}</span>
                </li>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>${course.duration}</span>
                </li>
                <li>
                  <i class="ri-checkbox-circle-line"></i>
                  <span>${course.lessonDuration}</span>
                </li>
              </ul>
              <p class="level">${course.level}</p>
            </div>
            <div class="courseFooter">
              <div>
                <button class="viewCourse" onclick="getCourseDetails(${course.courseId})">view course</button>
              </div>
              <p class="price">${course.price}</p>
            </div>
          </div>
  `;
      document.querySelector(".courseCards").appendChild(courses);
    });
  }
};

document.addEventListener("DOMContentLoaded", getAllCourses());

async function getCourseDetails(courseId) {
  const response = await fetch(`https://elx-server.onrender.com/api/v1/course/${courseId}`);
  const data = await response.json();
  if (response.ok) {
    console.log(data);
    courseModal.classList.add("showModal");
    courseModal.innerHTML = `
    <div class="courseInfomation">
            <i class="ri-close-circle-line closeModal"></i>
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="courseFormat">
                <ul>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.duration}</span>
                    </li>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.lessonDuration}</span>
                    </li>
                    <li>
                        <i class="ri-checkbox-circle-line"></i>
                        <span>${data.mode}</span>
                    </li>
                </ul>
                <p class="level">${data.level}</p>
            </div>
            <button><a href="https://paystack.com/pay/yxrq24ctfo">Pay</a></button>
        </div>
    `;
  }
}

function toggleNav() {
  navLinks.classList.toggle("showNav");
}

document.querySelector(".signupBtn").addEventListener("click", () => {
  signUpModal.classList.add("showModal");
  document.querySelector(".singUpForm").style.display = "flex";
});

document.querySelectorAll(".closeModal").forEach((closemodalIcon) => {
  closemodalIcon.addEventListener("click", () => {
    signUpModal.classList.remove("showModal");
    courseModal.classList.remove("showModal");
  });
});

document.querySelector(".closeErrorModal").addEventListener("click", () => {
  errorMessage.style.display = "none";
});

$(".courseSlider").slick({
  // normal options...
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  mobileFirst: true,

  // the magic
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
});

$(".counter").counterUp({
  delay: 10,
  time: 5000,
});

const form = document.querySelector(".singUpForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userData = {
    firstName: e.target["firstName"].value,
    lastName: e.target["lastName"].value,
    email: e.target["email"].value,
    learningTrack: e.target["learningTrack"].value,
  };

  if (!userData.email || !userData.firstName || !userData.lastName || !userData.learningTrack) {
    errorMessage.style.display = "flex";
    return;
  } else {
    loaderContainer.style.display = "flex";
    // console.log(userData)
    signUp(userData);
  }
});

async function signUp(userData) {
  const response = await fetch("https://elx-server.onrender.com/api/v1/registerStudent/", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (response.ok) {
    document.querySelector(".verifyEmailModal").style.display = "flex";
    loaderContainer.style.display = "none";
    form.reset();
    form.style.display = "none";
  } else {
    loaderContainer.style.display = "none";
    errorMessage.style.display = "flex";
    errorMessage.innerHTML = `<p>${data.email}</p>
    <i class="ri-close-circle-line"></i>
    `;
  }
  console.log(response);
  console.log(data);
}

errorMessage.addEventListener("click", (e) => {
  if (e.target.classList.contains("ri-close-circle-line")) {
    e.target.parentElement.style.display = "none";
  }
});

signUpModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeEmailVerificationModal")) {
    signUpModal.classList.remove("showModal");
    document.querySelector(".verifyEmailModal").style.display = "none";
    form.style.display = "flex";
  }
});

// const viewBtns = document.querySelectorAll(".viewCourse");
// viewBtns.forEach((course) =>
//   course.addEventListener("click", () => {
//     courseModal.classList.add("showModal");
//     courseModal.innerHTML = `
//     <div class="courseInfomation">
//             <i class="ri-close-circle-line closeModal"></i>
//             <h3>Front End Web Development</h3>
//             <p>Course Description</p>
//             <div class="courseFormat">
//                 <ul>
//                     <li>
//                         <i class="ri-checkbox-circle-line"></i>
//                         <span>HTML</span>
//                     </li>
//                     <li>
//                         <i class="ri-checkbox-circle-line"></i>
//                         <span>CSS</span>
//                     </li>
//                     <li>
//                         <i class="ri-checkbox-circle-line"></i>
//                         <span>JavaScript</span>
//                     </li>
//                 </ul>
//                 <p class="level">Newbie</p>
//             </div>
//             <button><a href="https://paystack.com/pay/yxrq24ctfo">Pay</a></button>
//         </div>
//     `;
//   })
// );

courseModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("closeModal")) {
    courseModal.classList.remove("showModal");
  }
});
