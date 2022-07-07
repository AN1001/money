<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword']) && !empty($_POST['Iconfpassword']) ) {
  echo "It works";
}
else {
  header("location: main.html");
}
