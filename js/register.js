var registeredName = document.getElementById("registeredName");
var registeredEmail = document.getElementById("registeredEmail");
var registeredPassword = document.getElementById("registeredPassword");

var nameAlert = document.querySelector(".nameValid");
var emailAlert = document.querySelector(".emailValid");
var passwordAlert = document.querySelector(".passwordValid");
var passwordMessage = document.querySelector(".message");
var emailDuplicate = document.querySelector(".emailDuplicate");
var successAlert = document.querySelector(".successAlert");

var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var specialCharacters = document.getElementById("specialCharacters");
var showPassword = document.querySelector(".showPassword");

var signupBtn = document.querySelector(".register .signup");

var savedData = [];
var user = {};

if (localStorage.getItem("savedData")) {
  savedData = JSON.parse(localStorage.getItem("savedData"));
}

showPassword.addEventListener("click", function () {
  if (registeredPassword.type === "password") {
    registeredPassword.type = "text";
    showPassword.classList.remove("fa-eye-slash");
    showPassword.classList.add("fa-eye");
  } else {
    registeredPassword.type = "password";
    showPassword.classList.remove("fa-eye");
    showPassword.classList.add("fa-eye-slash");
  }
});

registeredPassword.addEventListener("keyup", function () {
  passwordMessage.classList.remove("d-none");
  passwordMessage.classList.add("d-block");
});

registeredPassword.addEventListener("keyup", function () {
  var count = 0;
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (registeredPassword.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
    count++;
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (registeredPassword.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
    count++;
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (registeredPassword.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
    count++;
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate special Characters
  var specialChar = /[#?!@$%^&*-]/g;
  if (registeredPassword.value.match(specialChar)) {
    specialCharacters.classList.remove("invalid");
    specialCharacters.classList.add("valid");
    count++;
  } else {
    specialCharacters.classList.remove("valid");
    specialCharacters.classList.add("invalid");
  }

  // Validate length
  if (registeredPassword.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
    count++;
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
  if (count == 5) {
    passwordMessage.classList.remove("d-block");
    passwordMessage.classList.add("d-none");
  }
});

signupBtn.addEventListener("click", function () {
  submit();
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) submit();
});

function submit() {
  var nameValid = nameValidity();
  var emailValid = emailValidity();
  var passwordValid = passwordValidity();
  if (nameValid && emailValid && passwordValid) {
    registerNewUser();
    clearRegisterForm();
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 2000);
  }
}

function nameValidity() {
  var nameRegex = /^[a-z]{3,}$/i;
  if (nameRegex.test(registeredName.value)) {
    return true;
  } else {
    nameAlert.style.display = "block";
    setTimeout(function () {
      nameAlert.style.display = "none";
    }, 4000);
    return false;
  }
}

function emailValidity() {
  var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  if (emailRegex.test(registeredEmail.value)) {
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
  var passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (passwordRegex.test(registeredPassword.value)) {
    return true;
  } else {
    passwordAlert.style.display = "block";
    setTimeout(function () {
      passwordAlert.style.display = "none";
    }, 4000);
    return false;
  }
}

function registerNewUser() {
  var duplicate = 0;
  for (var i = 0; i < savedData.length; i++) {
    if (savedData[i].email == registeredEmail.value) {
      duplicate = 1;
    }
  }
  if (duplicate == 1) {
    emailDuplicate.style.display = "block";
    setTimeout(function () {
      emailDuplicate.style.display = "none";
    }, 4000);
    clearRegisterForm();
  } else {
    user = {
      name: registeredName.value,
      email: registeredEmail.value,
      password: registeredPassword.value,
    };
    savedData.push(user);
    localStorage.setItem("savedData", JSON.stringify(savedData));
    successAlert.style.display = "block";
    setTimeout(function () {
      successAlert.style.display = "none";
    }, 6000);
  }
}

function clearRegisterForm() {
  registeredName.value = "";
  registeredEmail.value = "";
  registeredPassword.value = "";
}
