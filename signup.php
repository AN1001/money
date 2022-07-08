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
  
  $sql = 'SELECT * FROM "public.userinfo";';
  $db2result = pg_query($conn, $sql);
  if (!$db2result){
    echo "something went wrong";
  } 
  
  echo "123 '$username' ";
  echo $db2result;
  echo pg_last_error($conn);
  //createUser($conn, $username, $password);

  $arr = pg_fetch_all($db2result);

  print_r($arr);
  
}
else {
  header("location: main.html?error=su-emptyinput");
  exit();
}
