<?php

$du = getenv("DATABASE_URL");
echo $du;
$du = "abc$du"
echo $du
$conn = pg_connect($du);
echo $conn;

if (!$conn) {
  $DATABASE_URL = getenv("DATABASE_URL");
  echo $DATABASE_URL;
  die("it seems like------error");
}
