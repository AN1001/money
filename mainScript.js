const loginScreen = getElementById("login")
const signupScreen = getElementById("signup")
const loginScreenBtn = getElementById("loginBtn")
const signupScreenBtn = getElementById("signupBtn")

loginScreenBtn.onclick = function(){
  loginScreen.style.display = "";
  signupScreen.style.display = "none";
};

signupScreenBtn.onclick = function(){
  loginScreen.style.display = "none";
  signupScreen.style.display = "";
};
