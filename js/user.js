var welcomeMessage = document.querySelector(".home h1");

var logoutBtn = document.querySelector(".logout");

var loggedUser = [];

if (localStorage.getItem("loggedUser")) {
  loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
}

logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("loggedUser");
});

welcomeMessage.innerHTML = `Welcome ${loggedUser}`;