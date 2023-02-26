var welcomeMessage = document.querySelector(".home h1");

var logoutBtn = document.querySelector(".logout");

var loggedUser = [];

if (localStorage.getItem("loggedUser")) {
  loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (loggedUser != null) {
    welcomeMessage.innerHTML = `Welcome ${loggedUser}`;
  } else {
    history.back();
  }
}
logoutBtn.addEventListener("click", function () {
  location.href = "./index.html";
  localStorage.setItem("loggedUser", null);
});
