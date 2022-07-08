<?php

$conn = pg_connect(getenv("DATABASE_URL"));

if (!$conn) {
  $DATABASE_URL = getenv("DATABASE_URL");
  echo $DATABASE_URL;
  die("it seems like------error");
} else {
  echo "Connection successful";
}
