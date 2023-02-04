const loginAdminForm = document.querySelector("form").addEventListener("submit", loginAdmin);
async function loginAdmin(e) {
  document.querySelector(".loaderContainer").style.display = "flex";
  e.preventDefault();
  const adminData = {
    password: e.target["password"].value,
  };
  const response = await fetch("https://elx-server.onrender.com/api/v1/loginAdmin", {
    method: "POST",
    body: JSON.stringify(adminData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    document.querySelector(".loaderContainer").style.display = "none";
    const alertText = document.createElement("p");
    alertText.textContent = data.msg;
    console.log(alertText);
    alertText.classList.add("alert");
    alertText.classList.add("alert-danger");
    document.querySelector(".loginAdminForm").prepend(alertText);

    setTimeout(() => {
      alertText.remove();
    }, 3000);
    console.log(data);
  }

  if (response.ok) {
    localStorage.setItem("admin", data.msg);
    location.assign("./elx-adminpanel.html");
  }
}

console.log(Cookies.get("adminSecret"), "iuy");
// IoaBMW,wa5782p.

document.querySelector(".ri-eye-off-fill").addEventListener("click", function () {
  document.querySelector("input[type=password]").type = "text";
  document.querySelector(".ri-eye-off-fill").style.display = "none";
  document.querySelector(".ri-eye-fill").style.display = "block";
});

document.querySelector(".ri-eye-fill").addEventListener("click", function () {
  document.querySelector("input[type=text]").type = "password";
  document.querySelector(".ri-eye-off-fill").style.display = "block";
  document.querySelector(".ri-eye-fill").style.display = "none";
});
