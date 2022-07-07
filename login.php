<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword'])) {
  
  
  function incorrectPwd($password,$confpassword) {
    $result = false;
    return $result;
  }
  
  function incorrectUid($conn, $username) {
    $result = false;
    return $result;
  }
  
  function logIn($conn, $username, $password) {
    echo "login with credentials";
    $a;
  }   
            
  
  
  if (incorrectPwd($conn, $password) !== false) {
    header("location: main.html?error=LI-nopwdmatch");
    exit();
  }
  if (incorrectUid($conn, $username) !== false) {
    header("location: main.html?error=LI-uidtaken");
    exit();
  }
  
  logIn($conn, $username, $password);
  
}
else {
  header("location: main.html?error=LI-emptyinput");
  exit();
}
