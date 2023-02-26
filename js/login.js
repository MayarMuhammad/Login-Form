var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");

var emailAlert = document.querySelector(".emailValid");
var passwordAlert = document.querySelector(".passwordValid");
var emailExist = document.querySelector(".emailExist");
var wrongPassword = document.querySelector(".wrongPassword");
var successAlert = document.querySelector(".successAlert");
var showPassword = document.querySelector(".showPassword");

var user = document.querySelector(".home h1");

var loginBtn = document.querySelector(".signin .login");

var savedData = [];
var loggedUser = [];

if (localStorage.getItem("savedData")) {
  savedData = JSON.parse(localStorage.getItem("savedData"));
}

showPassword.addEventListener("click", function () {
  if (signinPassword.type === "password") {
    signinPassword.type = "text";
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
  } else {
    signinPassword.type = "password";
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
  }
});

loginBtn.addEventListener("click", function () {
  submit();
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) submit();
});

function submit() {
  var emailValid = emailValidity();
  var passwordValid = passwordValidity();
  if (emailValid && passwordValid) {
    checkUserExistance();
    clearLoginForm();
  }
}

function emailValidity() {
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  if (emailRegex.test(signinEmail.value)) {
    return true;
  } else {
    emailAlert.style.display = "block";
    setTimeout(function () {
      emailAlert.style.display = "none";
    }, 4000);
    return false;
  }
}

function passwordValidity() {
  if (signinPassword.value.length != 0) {
    return true;
  } else {
    passwordAlert.style.display = "block";
    setTimeout(function () {
      passwordAlert.style.display = "none";
    }, 4000);
    return false;
  }
}

function checkUserExistance() {
  var userName;
  var exist = 0;
  for (var i = 0; i < savedData.length; i++) {
    if (savedData[i].email == signinEmail.value) {
      if (savedData[i].password == signinPassword.value) {
        userName = savedData[i].name;

        exist = 1;
      } else {
        exist = 2;
      }
      break;
    }
  }
  if (exist == 1) {
    successAlert.style.display = "block";
    setTimeout(function () {
      successAlert.style.display = "none";
    }, 6000);
    loggedUser.push(userName);
    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    window.location.href = "./user.html";
  } else if (exist == 2) {
    wrongPassword.style.display = "block";
    setTimeout(function () {
      wrongPassword.style.display = "none";
    }, 6000);
  } else {
    emailExist.style.display = "block";
    setTimeout(function () {
      emailExist.style.display = "none";
    }, 6000);
  }
}

function clearLoginForm() {
  signinEmail.value = "";
  signinPassword.value = "";
}
