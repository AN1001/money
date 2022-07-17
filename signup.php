<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword']) && !empty($_POST['Iconfpassword']) ) {
  
  $username = $_POST["Iusername"];
  $password = $_POST["Ipassword"];
  $confpassword = $_POST["Iconfpassword"];

  
  require_once 'dbh.php';
  
  
  function noPwdMatch($password,$confpassword) {
    $result = false;
    if($password != $confpassword){$result = true;}
    return $result;
  }
  
  
  function uidInvalid($username) {
    $result = false;
    if (!preg_match("/^\w*$/", $username)) {
      $result = true;
    }
    return $result;
  }
  
  
  function uidExists($conn, $username) {
    $result = false;
    $sql = "SELECT * FROM userinfo WHERE username = '$username';";
    $dbresult = pg_query($conn, $sql);
    $dbUsername = pg_fetch_row($dbresult)[0];

    if($dbUsername == $username){
      $result = true;
    }
    
    return $result;
  }
  
  
  function createUser($conn, $username, $password) {
    echo "user created!";
    $accountCreate = "INSERT INTO userinfo (username, password, graphdata) VALUES ('$username', '$password', '[["Groceries","JUN2022-JUL2022",["Morrisons",22.50],["Sainsbury",0.50],["Aldi",111.90]],["Utilities","JUL2022",["Gas",12.43],["Water",65.23],["Electricity",10],["TV",0.20]],["Food","JAN2022-MAY2022",["Pizza",20],["Mac",4.50],["Rice",2.10],["Pizza 2",20],["Pizza 3",6.40],["Burrito",0.30],["Lobster",33],["Protein",12],["Mac 2",4.50],["Pizza 4",25],["Pizza 5",20],["Mac 3",4.50],["Rice 2",2.10],["Pizza 6",20],["Pizza 7",6.40],["Burrito 2",0.30],["Lobster 2",33],["Protein 3",12],["Mac 4",4.50],["Pizza 7",25]]])';
    pg_query($conn, $accountCreate);
    setcookie("graphData", "[]", time()+10, '/');
  }   
        
  
  if (noPwdMatch($password,$confpassword) !== false) {
    header("location: main.html?error=su-nopwdmatch");
    exit();
  }
  if (uidExists($conn, $username) !== false) {
    header("location: main.html?error=su-uidtaken");
    exit();
  }
  if (uidInvalid($username) !== false) {
    header("location: main.html?error=su-uidinvalid");
    exit();
  }
  
  echo pg_last_error($conn);
  createUser($conn, $username, $password);
  header("location: financeDisplay.html");
  
  
} else {
  header("location: main.html?error=su-emptyinput");
  exit();
}
