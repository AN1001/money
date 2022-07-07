<?php

if(isset($_POST["submit"] && $_POST['Iusername'] !== "")) {
  echo "It works";
}
else {
  header("location: main.html");
}
