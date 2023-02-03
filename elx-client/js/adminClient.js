const getAllStudents = async () => {
  const response = await fetch("https://elx-server.onrender.com/api/v1/courses", {
    method: "GET",
  });
  const data = await response.json();
  console.log(data);
};

getAllStudents();

const registerCourseForm = document.querySelector("form").addEventListener("submit", postCourse);

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
  console.log(data);

  console.log(courseData);
}
