<?php

if(isset($_POST["submit"]) && !empty($_POST['Iusername']) && !empty($_POST['Ipassword'])) {
  echo "It works";
}
else {
  header("location: main.html");
}
