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
    echo $sql;
    print_r($sql);
    $dbresult = pg_query($conn, $sql);
    
    return $result;
  }
  
  
  function createUser($conn, $username, $password) {
    echo "somehow we got here";
    $a;
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

  
  
} else {
  header("location: main.html?error=su-emptyinput");
  exit();
}
