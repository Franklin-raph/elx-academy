const form = document.querySelector("form");
form.addEventListener("submit", updateCourse)

document.addEventListener("DOMContentLoaded", function () {
  const courseId = location.hash.substr(1);
  getCourseDetail(courseId);
});

async function getCourseDetail(courseId) {
  const response = await fetch(`https://elx-server.onrender.com/api/v1/course/${courseId}`);
  const data = await response.json();
  if(response.ok){
    form["title"].value = data.title,
    form["description"].value = data.description,
    form["duration"].value = data.duration,
    form["mode"].value = data.mode,
    form["lessonDuration"].value = data.lessonDuration,
    form["price"].value = data.price,
    form["level"].value = data.level,
    form["paystackLink"].value = data.paystackLink,
      console.log(data);
  }else{
    alert("Something went wrong")
    location.assign("./elx-adminpanel.html");
  }

}

async function deleteCourse(){
  const courseId = location.hash.substr(1);
  const response = await fetch(`https://elx-server.onrender.com/api/v1/courseDelete/${courseId}`, {
    method: "DELETE"
  });
  const data = await response.json();
  if(response.ok){
    location.assign('./elx-adminpanel.html')
  }
}


async function updateCourse(e){
  const courseId = location.hash.substr(1);
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
  console.log(courseData)
  const response = await fetch(`https://elx-server.onrender.com/api/v1/courseUpdate/${courseId}`,{
    method:"PUT",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(courseData)
  })
  if(response.ok){
    alert("Course successfully updated")
    location.assign('./elx-adminpanel.html')
  }
}
