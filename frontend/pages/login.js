// Gets the login form
const $loginForm = document.getElementById("form");

// Handles the form submission
$loginForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      // Stores the JWT token in the browser
      localStorage.setItem("token", data.token);

      // Redirects to the home page
      setTimeout(() => {
        location.href = "../index.html";
      }, 2000);
    });
};