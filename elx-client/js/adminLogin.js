const loginAdminForm = document.querySelector("form").addEventListener("submit", loginAdmin);
async function loginAdmin(e) {
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
  if (response.ok) {
    localStorage.setItem("admin", data.msg);
    location.assign("./elx-adminpanel.html");
  }
}

console.log(Cookies.get("adminSecret"), "iuy");
// IoaBMW,wa5782p.
