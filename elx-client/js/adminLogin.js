const loginAdminForm = document.querySelector("form").addEventListener("submit", loginAdmin);
async function loginAdmin(e) {
  e.preventDefault();
  const adminData = {
    password: e.target["password"].value,
  };
  const response = await fetch("http://localhost:8000/api/v1/loginAdmin", {
    method: "POST",
    body: JSON.stringify(adminData),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
}
