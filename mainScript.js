const loginBtn = document.getElementById("Ilogin");
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
  var value = document.getElementsByClassName("loginUsername")[0];
  setCookie('uidCorrect',value);
  loginScreen.style.display = "";
  signupScreen.style.display = "none";
};

signupScreenBtn.onclick = function(){
  displayCookieValue('uidCorrect');
  loginScreen.style.display = "none";
  signupScreen.style.display = "";
};

loginBtn.onclick = function(){
  var value = document.getElementsByClassName("loginUsername")[0];
  setCookie('uidCorrect',value);
};


var errorType = (window.location.href+"?none").split("?")[1];
if (errorType != "none"){
  displayCookieValue('uidCorrect');
  var errorReigon = '';
  errorType = errorType.slice(6);
  errorReigon = errorType.slice(0,2);
  errorType = errorType.slice(3);

  if (errorType == "emptyinput") {
    if (errorReigon == "LI") {loginError.textContent = "Error not all fields filled in";
                              loginError.style.display = "";
                              loginScreen.style.display = "";
                              signupScreen.style.display = "none";
                           } else {signupError.textContent = "Error not all fields filled in";
                                  signupError.style.display = "";}
  } else if (errorType == "nopwdmatch") {
    if (errorReigon == "LI") {loginError.textContent = "Error incorrect password";
                              loginError.style.display = "";
                              loginScreen.style.display = "";
                              signupScreen.style.display = "none";
                           } else {signupError.textContent = "Error passwords do not match";
                                  signupError.style.display = "";}
  } else if (errorType == "uidtaken") {
    if (errorReigon == "LI") {loginError.textContent = "Error username incorrect";
                              loginError.style.display = "";
                              loginScreen.style.display = "";
                              signupScreen.style.display = "none";
                           } else {signupError.textContent = "Error username already in use";
                                  signupError.style.display = "";}
  } else if (errorType == "uidinvalid") {
    signupError.textContent = "Error username cannot involve special characters, only alphanumeric characters A-Z 1-9";
    signupError.style.display = "";
  }
}

var today = new Date();
var expiry = new Date(today.getTime() + 60);

function setCookie(name, value) {
    var elementValue = value+"%";
    document.cookie = name + "=" + elementValue + "; path=/; expires=" + expiry.toGMTString();
    console.log(document.cookie);
}

function displayCookieValue(name) {
    console.log(document.cookie);
}

function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}
