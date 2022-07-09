<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword'])) {
  
  //$username = $_POST["Iusername"];
  //$password = $_POST["Ipassword"];
  include_once 'dbh.php';
  
  $logInSqlPassword = "SELECT * FROM userinfo WHERE password = '$password';";
  $dbresultPassword = pg_query($conn, $logInSqlPassword);
  $dbPassword = pg_fetch_row($dbresultPassword)[1];
  
  $logInSqlUsername = "SELECT * FROM userinfo WHERE username = '$username';";
  $dbresultUsername = pg_query($conn, $logInSqlUsername);
  $dbUsername = pg_fetch_row($dbresultUsername)[0];
  
  function incorrectPwd($password,$dbPassword) {
    $result = false;
    if(!($dbPassword === $password)){
      echo "ks";
      $result = true;
    }
    
    return $result;
  }
  
  function incorrectUid($username, $dbUsername) {
    $result = false;
    if(!($dbUsername === $username)){
      echo "kt";
      $result = true;
    }

    return $result;
  }
  
  function logIn($conn, $username, $password) {
    echo "at least we got here";
    if($dbUsername == $username && $dbPassword == $password){
      $logInSqlGraphs = "SELECT graphdata FROM userinfo WHERE password = '$password';";
      $dbresultGraphs = pg_query($conn, $logInSqlGraphs);
      $dbGraphData = pg_fetch_row($dbresultGraphs)[2];
      echo $dbGraphData;
      echo "username match - password match";
    }
    
   }
  
  if (incorrectUid($username, $dbUsername) !== false) {
    header("location: main.html?error=LI-uidtaken");
    exit();
  }
  if (incorrectPwd($password, $dbPassword) !== false) {
    header("location: main.html?error=LI-nopwdmatch");
    exit();
  }
  
  logIn($conn, $username, $password);
  
}
else {
  header("location: main.html?error=LI-emptyinput");
  exit();
}
