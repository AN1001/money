<?php

$host = getenv("PGHOST");
echo $host;
echo "host=$host";
$conn = pg_connect(getenv("DATABASE_URL"));
echo $conn;

if (!$conn) {
  $DATABASE_URL = getenv("DATABASE_URL");
  echo $DATABASE_URL;
  die("it seems like------error");
}
