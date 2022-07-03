const loginScreen = document.getElementById("login")
const signupScreen = document.getElementById("signup")
const loginScreenBtn = document.getElementById("loginBtn")
const signupScreenBtn = document.getElementById("signupBtn")

loginScreenBtn.onclick = function(){
  loginScreen.style.display = "";
  signupScreen.style.display = "none";
};

signupScreenBtn.onclick = function(){
  loginScreen.style.display = "none";
  signupScreen.style.display = "";
};
