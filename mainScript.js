const loginScreen = document.getElementById("login");
const signupScreen = document.getElementById("signup");
const loginScreenBtn = document.getElementById("loginBtn");
const signupScreenBtn = document.getElementById("signupBtn");

const loginError = document.getElementById("LI-EB");
loginError.style.display = "none";
const signupError = document.getElementById("SU-EB");
signupError.style.display = "none";

loginScreen.style.display = "none";
loginScreenBtn.onclick = function(){
  loginScreen.style.display = "";
  signupScreen.style.display = "none";
};

signupScreenBtn.onclick = function(){
  loginScreen.style.display = "none";
  signupScreen.style.display = "";
};

var errorType = (window.location.href+"?none").split("?")[1];
if (errorType != "none"){
  var errorReigon = '';
  errorType = errorType.slice(6);
  errorReigon = errorType.slice(0,2);
  errorType = errorType.slice(3);

  if (errorType == "emptyinput") {
    if (errorReigon == "LI") {loginError.textContent = "Error not all fields filled in";
                              loginError.style.display = "";
                           } else {signupError.textContent = "Error not all fields filled in";
                                  signupError.style.display = "";}
  } else if (errorType == "nopwdmatch") {
    if (errorReigon == "LI") {loginError.textContent = "Error passwords do not match";
                              loginError.style.display = "";
                           } else {signupError.textContent = "Error incorrect password";
                                  signupError.style.display = "";}
  } else if (errorType == "uidtaken") {
    if (errorReigon == "LI") {loginError.textContent = "Error username already in use";
                              loginError.style.display = "";
                           } else {signupError.textContent = "Error username incorrect";
                                  signupError.style.display = "";}
  }
}
