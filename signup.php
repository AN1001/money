<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword']) && !empty($_POST['Iconfpassword']) ) {
  
  $username = $_POST["Iusername"];
  $password = $_POST["Ipassword"];
  $confpassword = $_POST["Iconfpassword"];
  
  require_once 'dbh.php';
  
  exit();
}
else {
  header("location: main.html?error=SU-emptyinput");
  exit();
}
