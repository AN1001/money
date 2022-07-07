<?php

if(isset($_POST["submit"] && $_POST['Iusername'] !== "" && $_POST['Ipassword'] !== "" && $_POST['Iconfpassword'] !== "")) {
  echo "It works";
}
else {
  header("location: main.html");
}
